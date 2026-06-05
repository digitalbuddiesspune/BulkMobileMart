import Hero from "../components/home/Hero";
import HeroFeatures from "../components/home/HeroFeatures";
import FeaturedBrands from "../components/home/FeaturedBrands";
import BulkDeals from "../components/home/BulkDeals";
import WhyChooseUs from "../components/home/WhyChooseUs";
import PreFooterSection from "../components/home/PreFooterSection";

function Home() {
  return (
    <>
      <Hero />
      <HeroFeatures />
      <FeaturedBrands />
      <BulkDeals />
      <WhyChooseUs />
      <PreFooterSection />
    </>
  );
}

export default Home;
