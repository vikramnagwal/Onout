import { HeroSection } from "@/packages/ui/web/hero-section";
import { NavHeader } from "@/packages/ui/web/nav/header";
import { Testimonials } from "@/packages/ui/web/testimonials";

export default function Home() {
	return (
    <div className="p-2 relative">
      <NavHeader />
      <div className="max-w-[1280px] mx-auto mt-3 p-3 text-center">
        <HeroSection />
        <Testimonials />
      </div>
    </div>
  );
}
