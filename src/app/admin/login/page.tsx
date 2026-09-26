import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const nextPath = next?.startsWith("/admin") && !next.startsWith("//") ? next : "/admin";

  return <AdminLoginForm nextPath={nextPath} />;
}