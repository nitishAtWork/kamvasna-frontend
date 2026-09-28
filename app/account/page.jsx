"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Header from "@/app/components/layout/Header";
import { useAuth } from "@/app/context/AuthContext";

export default function AccountPage() {
  const router = useRouter();

  const {
    user,
    loading,
    isAuthenticated,
  } = useAuth();

  if (loading) {
    return (
      <>
        <Header />

        <main className="mx-auto max-w-7xl px-4 py-10">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
        </main>
      </>
    );
  }

  if (!isAuthenticated) {
    router.replace("/login");

    return null;
  }

  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold">
          My Account
        </h1>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border p-6">
            <h2 className="text-lg font-semibold">
              Account Information
            </h2>

            <div className="mt-5 space-y-3 text-sm">
              <div>
                <span className="text-gray-500">
                  Name
                </span>

                <p className="font-medium">
                  {user?.name || "-"}
                </p>
              </div>

              <div>
                <span className="text-gray-500">
                  Email
                </span>

                <p className="font-medium">
                  {user?.email || "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border p-6">
            <h2 className="text-lg font-semibold">
              Orders
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              View your previous orders.
            </p>

            <Link
              href="/orders"
              className="mt-5 inline-flex rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
            >
              View Orders
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}