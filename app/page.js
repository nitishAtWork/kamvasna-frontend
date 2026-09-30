import Benifits from "./components/home/Benifits";
import GallerySlider from "./components/home/GallerySlider";
import HeroSection from "./components/home/HeroSection";
import Products from "./components/home/Products";
import { getProducts } from "./lib/common";

export default async function HomePage() {
  const product = await getProducts();
  return (
    <>
      <HeroSection product={product} />
      <Benifits />
      <Products products={product} />
      <GallerySlider />
    </>
  );
}