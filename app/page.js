import HeroSection from "./components/home/HeroSection";
import { getProducts } from "./lib/common";

export default async function HomePage() {
  const product = await getProducts();
  return (
    <>
      <HeroSection product={product} />
      {/* <img src="/img/img-dumm.jpeg" alt="Hero Image" className="w-full h-auto" /> */}
    </>
  );
}