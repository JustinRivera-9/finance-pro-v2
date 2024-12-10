import Benefits from "@/components/pages/landing/Benefits";
import CallToAction from "@/components/pages/landing/CallToAction";
import FeaturesList from "@/components/pages/landing/FeaturesList";
import Footer from "@/components/pages/landing/Footer";
import Header from "@/components/pages/landing/Header";
import HeroSection from "@/components/pages/landing/HeroSection";
import Pricing from "@/components/pages/landing/Pricing";

const LandingPage = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-8 w-full px-6 items-center py-2">
        <HeroSection />
        <FeaturesList />
        <Benefits />
        <CallToAction />
        <Pricing />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
