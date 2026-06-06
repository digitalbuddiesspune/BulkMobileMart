import Hero from "../components/home/Hero";
import HeroFeatures from "../components/home/HeroFeatures";
import ShopByCategory from "../components/home/ShopByCategory";
import ShopByBrand from "../components/home/ShopByBrand";
import MostLikedProducts from "../components/home/MostLikedProducts";
import PreFooterSection from "../components/home/PreFooterSection";

function Home() {
  return (
    <div className="bg-black">
      <Hero />
      <HeroFeatures />
      <ShopByCategory />
      <ShopByBrand />
      <MostLikedProducts />
      <PreFooterSection />
    </div>
  );
}

export default Home;
