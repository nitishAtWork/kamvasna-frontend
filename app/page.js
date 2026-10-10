import Benifits from "./components/home/Benifits";
import Category from "./components/home/Category";
import GallerySlider from "./components/home/GallerySlider";
import HeroSection from "./components/home/HeroSection";
import Products from "./components/home/Products";
import Testimonial from "./components/home/Testimonial";
import { getProducts } from "./lib/common";

export default async function HomePage() {
  const product = await getProducts();
  return (
    <>
      <Category />
      <HeroSection product={product} />
      <Benifits />
      <Products products={product} />
      <GallerySlider />
      <Testimonial />
    </>
  );
}