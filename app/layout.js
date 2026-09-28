import "./globals.css";

import Navbar from "@/app/components/layout/Navbar";

import { AuthProvider } from "@/app/context/AuthContext";
import { CartProvider } from "@/app/context/CartContext";

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en">
            <body>
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