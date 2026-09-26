import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { validateNewProduct } from "@/lib/product-validation";
import { getSupabaseAdminClient, getSupabaseClient } from "@/lib/supabase";

function errorResponse(status: number, code: string, message: string) {
  return NextResponse.json({ error: { code, message } }, { status });
}

function databaseError(error: { code?: string }) {
  if (error.code === "23505") return errorResponse(409, "CONFLICT", "A product with this slug already exists.");
  if (error.code === "23514" || error.code === "22P02") return errorResponse(400, "INVALID_PRODUCT", "The product data is not valid.");
  if (error.code === "42501") return errorResponse(403, "DATABASE_FORBIDDEN", "The database rejected this operation.");
  if (error.code === "42P01" || error.code === "PGRST205") return errorResponse(503, "DATABASE_SCHEMA_NOT_READY", "Apply supabase/schema.sql before using the product API.");
  return errorResponse(502, "DATABASE_ERROR", "The product service is temporarily unavailable.");
}

async function isAdmin(request: NextRequest) {
  return verifyAdminSessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function GET() {
  const supabase = getSupabaseClient();
  if (!supabase) return errorResponse(503, "DATABASE_NOT_CONFIGURED", "The product database is not configured.");

  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
  if (error) return databaseError(error);
  return NextResponse.json({ data }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin(request))) return errorResponse(401, "UNAUTHORIZED", "Admin authentication is required.");

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse(400, "INVALID_JSON", "A valid JSON request body is required.");
  }

  const product = validateNewProduct(body);
  if (!product) return errorResponse(400, "INVALID_PRODUCT", "The product fields are invalid or incomplete.");

  const supabase = getSupabaseAdminClient();
  if (!supabase) return errorResponse(503, "DATABASE_NOT_CONFIGURED", "Product mutations require server Supabase credentials.");

  const { data, error } = await supabase
    .from("products")
    .insert({ id: crypto.randomUUID(), ...product })
    .select("*")
    .single();

  if (error) return databaseError(error);
  return NextResponse.json({ data }, { status: 201 });
}