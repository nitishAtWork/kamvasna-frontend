import Link from "next/link";

export default function AuthLayout({
  title,
  description,
  children,
  footer,
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          <Link
            href="/"
            className="block text-center text-2xl font-bold"
          >
            Store
          </Link>

          <div className="mt-8 text-center">
            <h1 className="text-2xl font-bold">
              {title}
            </h1>

            {description && (
              <p className="mt-2 text-sm text-gray-500">
                {description}
              </p>
            )}
          </div>

          <div className="mt-8">
            {children}
          </div>

          {footer && (
            <div className="mt-6 border-t pt-6 text-center text-sm text-gray-500">
              {footer}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}