import Benifits from "./components/home/Benifits";
import GallerySlider from "./components/home/GallerySlider";
import HeroSection from "./components/home/HeroSection";
import Testimonial from "./components/home/Testimonial";
import Footer from "./components/layout/Footer";
import ProductGrid from "./components/products/ProductGrid";
import { getProducts } from "./lib/common";

export default async function HomePage() {
  const product = await getProducts();
  return (
    <>
      <HeroSection product={product} />
      <Benifits />
      <div className="container py-16">
        <ProductGrid products={product} />
      </div>
      <GallerySlider />
      <Testimonial />
      <Footer />
    </>
  );
}