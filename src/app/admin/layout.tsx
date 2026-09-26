import Link from "next/link";
import {
  ArrowLeft,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Sparkles,
  Users,
  Image as ImageIcon,
  LogOut,
  Settings,
} from "lucide-react";

const navigation = [
  { label: "Overview", href: "/admin#overview", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders & requests", href: "/admin/orders", icon: ShoppingCart },
  { label: "Departments", href: "/admin/departments", icon: Sparkles },
  { label: "Assets & identity", href: "/admin/assets", icon: ImageIcon },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "TOPSIX Club", href: "/admin#club", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-[#090909] text-[#f3f0e9] md:flex-row">
      <aside className="shrink-0 border-b border-white/10 bg-[#0d0d0d] md:flex md:w-64 md:flex-col md:border-b-0 md:border-r">
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5 md:h-20 md:px-7">
          <Link href="/admin" className="font-serif text-xl tracking-[0.24em]">TOPSIX</Link>
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/35">Studio</span>
        </div>
        <nav aria-label="Administration" className="flex gap-1 overflow-x-auto p-3 md:flex-col md:gap-1 md:p-4">
          {navigation.map(({ label, href, icon: Icon }, index) => (
            <Link
              key={label}
              href={href}
              className={`flex shrink-0 items-center gap-3 px-3 py-3 text-xs transition-colors hover:bg-white/[0.06] hover:text-white ${index === 0 ? "bg-white/[0.06] text-white" : "text-white/55"}`}
            >
              <Icon size={16} strokeWidth={1.5} />
              <span className="whitespace-nowrap">{label}</span>
            </Link>
          ))}
        </nav>
        <Link href="/" className="mt-auto hidden items-center gap-2 border-t border-white/10 px-7 py-5 text-xs text-white/45 transition-colors hover:text-white md:flex">
          <ArrowLeft size={15} strokeWidth={1.5} />
          Return to storefront
        </Link>
        <form action="/api/admin/logout" method="post" className="hidden border-t border-white/10 md:block">
          <button type="submit" className="flex w-full items-center gap-2 px-7 py-5 text-xs text-white/45 transition-colors hover:text-white">
            <LogOut size={15} strokeWidth={1.5} />
            Sign out
          </button>
        </form>
      </aside>
      <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}