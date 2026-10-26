import Capabilities from "@/components/landing/Capabilities";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Navbar from "@/components/landing/Navbar";
import SocialProof from "@/components/landing/SocialProof";
import TrustedBy from "@/components/landing/TrustedBy";
import UseCases from "@/components/landing/UseCases";
import WorkspacePreview from "@/components/landing/WorkspacePreview";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Capabilities />
        <HowItWorks />
        <WorkspacePreview />
        <UseCases />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
