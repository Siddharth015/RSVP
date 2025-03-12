import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import PopularGifts from "../components/PopularGifts";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="w-full">
      <Navbar />
      <main className="w-full space-y-16">
        <HeroSection />
        <HowItWorks />
        <PopularGifts />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
