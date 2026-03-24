import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="flex justify-end items-center p-6 max-full">
			<div className="space-x-8">
				<Link href="/" className="hover:text-blue-400 transition">
					Portfolio
				</Link>
				<Link href="/cv" className="hover:text-blue-400 transition">
					CV
				</Link>
				<Link href="/about" className="hover:text-blue-400 transition">
					About
				</Link>
			</div>
		</nav>
	);
}
