import Header from "@/app/components/layout/Header";

export default function HomePage() {
  return (
    <>

      <main>
        <section className="mx-auto max-w-7xl px-4 py-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold tracking-tight">
              Welcome to our store
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Discover our latest products.
            </p>

            <a
              href="/products"
              className="mt-8 inline-flex rounded-lg bg-black px-6 py-3 text-white"
            >
              Shop Now
            </a>
          </div>
        </section>
        <img src="/img/img-dumm.jpeg" alt="Hero Image" className="w-full h-auto" />
      </main>
    </>
  );
}