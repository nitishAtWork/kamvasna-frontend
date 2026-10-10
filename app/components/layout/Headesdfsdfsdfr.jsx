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
    
    </header>
  );
}