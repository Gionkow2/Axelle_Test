import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import MotionController from "@/app/components/motion/MotionController";
import Hero from "@/app/components/sections/Hero";
import About from "@/app/components/sections/About";
import ApproachJourney from "@/app/components/sections/ApproachJourney";
import Services from "@/app/components/sections/Services";
import Testimonials from "@/app/components/sections/Testimonials";
import GiftCard from "@/app/components/sections/GiftCard";
import FinalCta from "@/app/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Header />
      {/* the page's one scroll-motion controller (see lib/motion.ts) */}
      <MotionController />
      <main className="overflow-x-clip">
        <Hero />
        {/* packages sit directly under the hero (with the aan-huis banner inside) */}
        <Services />
        <About />
        {/* the richest moment: pinned phrase + Journey River */}
        <ApproachJourney />
        <Testimonials />
        <GiftCard />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
