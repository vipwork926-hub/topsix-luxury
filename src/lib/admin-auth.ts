export const ADMIN_SESSION_COOKIE = "topsix_admin_session";
export const ADMIN_SESSION_TTL_SECONDS = 8 * 60 * 60;

const encoder = new TextEncoder();

function getAuthSecrets() {
  const password = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !sessionSecret) return null;
  return { password, signingSecret: `${sessionSecret}:${password}` };
}

function encodeBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function getSigningKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function verifyAdminPassword(candidate: string) {
  const secrets = getAuthSecrets();
  if (!secrets || candidate.length > 1024) return false;

  const [candidateDigest, expectedDigest] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(candidate)),
    crypto.subtle.digest("SHA-256", encoder.encode(secrets.password)),
  ]);
  const candidateBytes = new Uint8Array(candidateDigest);
  const expectedBytes = new Uint8Array(expectedDigest);
  let difference = candidateBytes.length ^ expectedBytes.length;
  for (let index = 0; index < expectedBytes.length; index += 1) {
    difference |= candidateBytes[index] ^ expectedBytes[index];
  }
  return difference === 0;
}

export async function createAdminSessionToken() {
  const secrets = getAuthSecrets();
  if (!secrets) return null;

  const expiresAt = Math.floor(Date.now() / 1000) + ADMIN_SESSION_TTL_SECONDS;
  const nonce = new Uint8Array(16);
  crypto.getRandomValues(nonce);
  const payload = encodeBase64Url(encoder.encode(JSON.stringify({ expiresAt, nonce: encodeBase64Url(nonce) })));
  const key = await getSigningKey(secrets.signingSecret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${payload}.${encodeBase64Url(new Uint8Array(signature))}`;
}

export async function verifyAdminSessionToken(token: string | undefined) {
  const secrets = getAuthSecrets();
  if (!secrets || !token || token.length > 1024) return false;

  try {
    const [payload, signature, extra] = token.split(".");
    if (!payload || !signature || extra) return false;
    const decodedPayload = JSON.parse(new TextDecoder().decode(decodeBase64Url(payload))) as {
      expiresAt?: unknown;
      nonce?: unknown;
    };
    const now = Math.floor(Date.now() / 1000);
    if (
      typeof decodedPayload.expiresAt !== "number" ||
      decodedPayload.expiresAt <= now ||
      decodedPayload.expiresAt > now + ADMIN_SESSION_TTL_SECONDS + 60 ||
      typeof decodedPayload.nonce !== "string"
    ) {
      return false;
    }

    const key = await getSigningKey(secrets.signingSecret);
    return crypto.subtle.verify("HMAC", key, decodeBase64Url(signature), encoder.encode(payload));
  } catch {
    return false;
  }
}