import { Marquee } from "@/packages/ui/marquee";
import { Hero } from "@/packages/ui/web/hero-section";
import { NavHeader } from "@/packages/ui/web/nav/header";

const data = [
  {
    id: 1,
    title: "https://assets.dub.co/companies/framer.svg",
  },
  {
    id: 2,
    title: "https://ucarecdn.com/750310a9-d200-46f1-b867-f77f42fb43f7/",
  },
  {
    id: 3,
    title: "https://ucarecdn.com/7f048beb-efcf-4b27-ab2e-58f322bea285/",
  },
];

export default function Home() {
	return (
    <div className="p-2 relative">
      <NavHeader />
      <div className="max-w-[1280px] mx-auto mt-3 p-3 text-center">
        <Hero />
        <div className="relative mt-8">
          <Marquee>
            {data.map((items, id) => (
              <div key={id} className="px-2 mx-2 w-full">
                <img
                  src={items.title}
                  alt={items.title}
                  className="w-full h-10"
                />
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </div>
  );
}
