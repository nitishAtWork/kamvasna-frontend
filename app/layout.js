import "./globals.css";

import Navbar from "@/app/components/layout/Navbar";

import { AuthProvider } from "@/app/context/AuthContext";
import { CartProvider } from "@/app/context/CartContext";
import { Toaster } from "sonner";

export default async function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-center"
          richColors
          closeButton
        />
        <AuthProvider>
          <CartProvider>
            <Navbar />

            <main>
              {children}
            </main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}