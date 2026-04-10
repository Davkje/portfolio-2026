import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="fixed top-0 left-0 flex gap-5 justify-end items-center py-2 px-6 w-full z-200 uppercase tracking-wider font-bold">
			<Link href="/" className="hover:opacity-50 transition">
				Portfolio
			</Link>
			<Link href="/cv" className="hover:opacity-50 transition">
				CV
			</Link>
			<Link href="/about" className="hover:opacity-50 transition">
				About
			</Link>
		</nav>
	);
}
