import { NavHeader } from "@/packages/ui/nav/header";
import { Hero } from "@/packages/ui/web/hero-section";


export default function Home() {
	return (
    <div className="p-2 relative">
      <NavHeader />
      <div
        className="max-w-[1280px] mx-auto mt-3 p-3 text-center"
      >
        <Hero />
      </div>
    </div>
  );
}
