import "./globals.css";

import Navbar from "@/app/components/layout/Navbar";

import { AuthProvider } from "@/app/context/AuthContext";
import { CartProvider } from "@/app/context/CartContext";
import { Toaster } from "sonner";
import Footer from "./components/layout/Footer";
import { getSiteInfo } from "./lib/common";
import { Parser } from "html-to-react";

export async function generateMetadata() {
  const siteInfo = await getSiteInfo();

  return {
    title: siteInfo?.name || "",
    icons: {
      icon: siteInfo?.favicon,
    },
    authors: [{ name: siteInfo?.name || "" }],
    verification: {
      google: siteInfo?.webmaster,
    },
  };
}

async function checkExpiry() {
  const siteInfo = await getSiteInfo();
  try {
    const res = await fetch(
      `https://api-lead.instavyapar.co.in/api/user/check-expiry/${siteInfo?.apiId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error checking expiry:", error);
  }
}

export default async function RootLayout({
  children,
}) {
  const expiry = await checkExpiry();
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-center"
          richColors
          closeButton
        />
        {
          expiry?.data?.isExpired === true || expiry?.data?.closed === true ? (
            <div>
              {Parser().parse(expiry?.data?.message || "")}
            </div>
          ) : (
            <AuthProvider>
              <CartProvider>
                <Navbar />
                <main>
                  {children}
                </main>
                <Footer />
              </CartProvider>
            </AuthProvider>
          )
        }
      </body>
    </html>
  );
}