const aboutMenu = [
  {
    icon: false,
    title: 'About',
    destcription: "Onout is your secret diary",
    color: 'black',
    href: '/about',
  }
]

export function AboutMenu() {
  return (
    <div className="flex">
      {aboutMenu.map((item, index) => (
        <div className="flex">
          {item.icon && <a
            key={index}
            href={item.href}
            className="p-1"
            style={{ color: item.color }}
          >
            {item.icon}
          </a>}
          <p className="p-2 shadow-md w-24 h-24">{item.title}</p>
          <span>{item.destcription}</span>
        </div>
      ))}
    </div>
  );
}