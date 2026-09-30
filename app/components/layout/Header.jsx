"use client";

import Link from "next/link";
import {
  FiLogOut,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";

export default function Header() {
  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const {
    itemCount,
  } = useCart();

  async function handleLogout() {
    await logout();
  }

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-xl font-bold"
        >
          Store
        </Link>

        <nav className="flex items-center gap-5">
          <Link
            href="/products"
            className="hidden sm:block"
          >
            Products
          </Link>

          <Link
            href="/cart"
            className="relative"
            aria-label="Shopping cart"
          >
            <FiShoppingCart size={22} />

            {itemCount > 0 && (
              <span className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                href="/account"
                className="hidden items-center gap-2 sm:flex"
              >
                <FiUser />

                <span>
                  {user?.name ||
                    user?.email ||
                    "Account"}
                </span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-black"
                title="Logout"
              >
                <FiLogOut />

                <span className="hidden sm:block">
                  Logout
                </span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              aria-label="Login"
            >
              <FiUser size={22} />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}