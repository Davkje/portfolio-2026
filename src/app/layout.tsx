import type { Metadata } from "next";
import {
	Geist,
	Geist_Mono,
	Jomolhari,
	Lato,
	Poppins,
	Open_Sans,
	Lora,
	Outfit,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const jomolhari = Jomolhari({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-jomolhari",
});

const lora = Lora({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-lora",
});

const lato = Lato({
	weight: ["400", "700"],
	subsets: ["latin"],
	variable: "--font-lato",
});

const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-poppins",
});

const outfit = Outfit({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-outfit",
});

const openSans = Open_Sans({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-open-sans",
});

export const metadata: Metadata = {
	title: "Portfolio - David Kjellstrand",
	description: "David Kjellstrands Portfolio 2026",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} ${jomolhari.variable} ${lora.variable} ${lato.variable} ${poppins.variable} ${openSans.variable} ${outfit.variable} h-full antialiased bg-red overflow-x-hidden`}
		>
			<body className="min-h-full flex w-full flex-col font-poppins scroll-x-hidden">
				<Navbar />
				{children}
			</body>
		</html>
	);
}
