import Benifits from "./components/home/Benifits";
import HeroSection from "./components/home/HeroSection";
import { getProducts } from "./lib/common";

export default async function HomePage() {
  const product = await getProducts();
  return (
    <>
      <HeroSection product={product} />
      <Benifits />
    </>
  );
}