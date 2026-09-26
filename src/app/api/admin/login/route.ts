import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TTL_SECONDS,
  createAdminSessionToken,
  verifyAdminPassword,
} from "@/lib/admin-auth";

function errorResponse(status: number, code: string, message: string) {
  return NextResponse.json({ error: { code, message } }, { status });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).origin !== new URL(request.url).origin) {
    return errorResponse(403, "FORBIDDEN_ORIGIN", "This sign-in request is not allowed.");
  }

  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return errorResponse(503, "AUTH_NOT_CONFIGURED", "Admin sign-in is not configured on this deployment.");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse(400, "INVALID_JSON", "A valid JSON request body is required.");
  }

  if (
    typeof body !== "object" || body === null ||
    !("password" in body) || typeof body.password !== "string" || body.password.length > 1024
  ) {
    return errorResponse(400, "INVALID_CREDENTIALS", "Enter a valid admin password.");
  }

  if (!(await verifyAdminPassword(body.password))) {
    return errorResponse(401, "INVALID_CREDENTIALS", "That password did not match.");
  }

  const token = await createAdminSessionToken();
  if (!token) return errorResponse(503, "AUTH_NOT_CONFIGURED", "Admin sign-in is not configured on this deployment.");

  const response = NextResponse.json({ data: { authenticated: true } });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    maxAge: ADMIN_SESSION_TTL_SECONDS,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}