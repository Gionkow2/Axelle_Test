import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import MotionController from "@/app/components/motion/MotionController";
import Hero from "@/app/components/sections/Hero";
import About from "@/app/components/sections/About";
import ApproachJourney from "@/app/components/sections/ApproachJourney";
import Services from "@/app/components/sections/Services";
import HomeMassage from "@/app/components/sections/HomeMassage";
import Testimonials from "@/app/components/sections/Testimonials";
import GiftCard from "@/app/components/sections/GiftCard";
import Vision from "@/app/components/sections/Vision";
import FinalCta from "@/app/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Header />
      {/* the page's one scroll-motion controller (see lib/motion.ts) */}
      <MotionController />
      <main className="overflow-x-clip">
        <Hero />
        <About />
        {/* the richest moment: pinned phrase + Journey River */}
        <ApproachJourney />
        <Services />
        <HomeMassage />
        <Testimonials />
        <GiftCard />
        <Vision />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
