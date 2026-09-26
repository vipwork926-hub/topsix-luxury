import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { validateProductPatch } from "@/lib/product-validation";
import { getSupabaseAdminClient, getSupabaseClient } from "@/lib/supabase";

type RouteContext = { params: Promise<{ id: string }> };

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

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const supabase = getSupabaseClient();
  if (!supabase) return errorResponse(503, "DATABASE_NOT_CONFIGURED", "The product database is not configured.");

  const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
  if (error) return databaseError(error);
  if (!data) return errorResponse(404, "NOT_FOUND", "Product not found.");
  return NextResponse.json({ data }, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  if (!(await isAdmin(request))) return errorResponse(401, "UNAUTHORIZED", "Admin authentication is required.");
  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse(400, "INVALID_JSON", "A valid JSON request body is required.");
  }

  const patch = validateProductPatch(body);
  if (!patch) return errorResponse(400, "INVALID_PRODUCT", "The product update is invalid or empty.");

  const supabase = getSupabaseAdminClient();
  if (!supabase) return errorResponse(503, "DATABASE_NOT_CONFIGURED", "Product mutations require server Supabase credentials.");

  const { data, error } = await supabase.from("products").update(patch).eq("id", id).select("*").maybeSingle();
  if (error) return databaseError(error);
  if (!data) return errorResponse(404, "NOT_FOUND", "Product not found.");
  return NextResponse.json({ data });
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  if (!(await isAdmin(request))) return errorResponse(401, "UNAUTHORIZED", "Admin authentication is required.");
  const { id } = await params;
  const supabase = getSupabaseAdminClient();
  if (!supabase) return errorResponse(503, "DATABASE_NOT_CONFIGURED", "Product mutations require server Supabase credentials.");

  const { data, error } = await supabase.from("products").delete().eq("id", id).select("id").maybeSingle();
  if (error) return databaseError(error);
  if (!data) return errorResponse(404, "NOT_FOUND", "Product not found.");
  return NextResponse.json({ data: { id: data.id } });
}