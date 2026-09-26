import type { Metadata } from "next";
import { Cairo, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import GlobalFooter from "@/components/layout/GlobalFooter";
import WhatsAppConcierge from "@/components/ui/WhatsAppConcierge";
import CartDrawer from "@/components/layout/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { SiteContentProvider } from "@/context/SiteContentContext";
import { ProductCatalogProvider } from "@/context/ProductCatalogContext";

// Load luxury editorial font
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant"
});

// Load clean commerce font
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "TOPSIX | Wear the mood. Own the moment.",
  description: "Egyptian luxury intimate-lifestyle brand.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" data-scroll-behavior="smooth" className="bg-obsidian text-ivory antialiased">
      <body className={`${cormorant.variable} ${inter.variable} ${cairo.variable} font-sans min-h-screen flex flex-col`}>
        <LanguageProvider>
          <SiteContentProvider>
            <ProductCatalogProvider>
              <CartProvider>
                <Header />
                <main className="flex-grow pt-20">{children}</main>
                <GlobalFooter />
                <WhatsAppConcierge />
                <CartDrawer />
              </CartProvider>
            </ProductCatalogProvider>
          </SiteContentProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}