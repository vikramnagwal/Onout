import Link from "next/link"

const helpMenuContext = [
  {
    icon: false,
    title: 'Help',
    destcription: "We're always here t serve you",
    color: 'red',
    href: '/help',
  }
]

export function HelpMenu() {
  return (
    <div className="w-60 p-2 border border-stone-300 rounded-md">
      <ul className="">
        <Link href={"/reportabuse"}>
          <li className="text-red-500 my-2">Report Abuse</li>
        </Link>
        <Link href={"#"}>
          <li className="my-2">
            Contact Us
          </li>
        </Link>
      </ul>
    </div>
  );
}