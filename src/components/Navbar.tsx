"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
	{ href: "/", label: "Portfolio" },
	{ href: "/cv", label: "CV" },
	{ href: "/about", label: "About" },
];

export default function Navbar() {
	const pathname = usePathname();

	return (
		<motion.nav
			layoutRoot
			className="fixed top-0 right-0 flex gap-3 md:gap-5 justify-end items-center py-4 px-4 md:px-6 z-900 uppercase tracking-wider"
		>
			{links.map(({ href, label }) => {
				const active = pathname === href;
				return (
					<Link
						key={href}
						href={href}
						className={`relative transition-colors ${
							active ? "text-foreground" : "text-foreground/80 hover:text-foreground"
						}`}
					>
						{label}
						{active && (
							<motion.span
								key={pathname}
								className="absolute left-0 -bottom-0.5 h-px w-full bg-foreground"
								initial={{ opacity: 0, scaleX: 0 }}
								animate={{ opacity: 1, scaleX: 1 }}
								transition={{ duration: 0.3, ease: "easeOut" }}
								style={{ originX: 1 }}
							/>
						)}
					</Link>
				);
			})}
		</motion.nav>
	);
}
