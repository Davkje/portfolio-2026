import type { Metadata } from "next";
import { Geist, Geist_Mono, Jomolhari } from "next/font/google";
import { Lora } from "next/font/google";
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
	weight: ["400", "500", "600", "700"], // Här kommer det fungera!
	subsets: ["latin"],
	variable: "--font-lora",
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
			className={`${geistSans.variable} ${geistMono.variable} ${jomolhari.variable} ${lora.variable} h-full antialiased bg-(--main-1) overflow-x-hidden`}
		>
			<body className="min-h-full flex w-full flex-col font-jomolhari scroll-x-hidden">
				<Navbar />
				{children}
			</body>
		</html>
	);
}
