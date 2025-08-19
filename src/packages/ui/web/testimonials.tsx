import { Marquee } from "../marquee";

const data = [
    {
       name: "instagram",
       icon: '/branding/instagram.svg',
       href: ""
    },
    {
        name: "facebook",
        icon: '/branding/facebook.svg',
        href: ""
    },
    {
        name: "whatsApp",
        icon: '/branding/whatsapp.svg',
        href: ""
    },
    {
        name: "tiktok",
        icon: '/branding/tiktok.svg',
        href: ""
    }
]

export function Testimonials() {
    return (
      <div className="relative mt-8">
        <Marquee pauseOnHover>
          {data.map((items, id) => (
            <div
              key={id}
              className="px-2 mx-2 text-lg md:text-xl font-semibold font-sans opacity-80 w-full cursor-default"
            >
              <img
                src={items.icon}
                alt={items.name}
                className="size-36 object-contain inline-block"
              />
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background" />
      </div>
    );
}