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
    <div className="w-60 p-2 ">
      <ul>
        <Link href={report-abuse}>
          <li className="text-red">Report abuse</li>
        </Link>
      </ul>
    </div>
  );
}