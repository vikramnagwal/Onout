import localfont from 'next/font/local';
import { Poppins } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";

export const switzer = localfont({
    src: './Switzer-Variable.woff2',
    variable: '--font-switzer',
    display: 'swap',
})

export const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["400", "600", "700"],
	display: "swap",
});

export const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});