import Hero from "@/components/Hero";

export default function Home() {
	return (
		<main className="w-full mx-auto px-6">
			{/* HERO SECTION */}
			<Hero />

			{/* TECH & SKILLS */}
			<section className="py-16 border-t border-gray-800">
				<h2 className="text-3xl font-semibold mb-8">Tech & Skills</h2>
				<div className="flex flex-wrap gap-4 text-sm">
					{["React", "Next.js", "Vue", "TypeScript", "Tailwind", "Node.js"].map((skill) => (
						<span key={skill} className="px-4 py-2 bg-gray-800 rounded-full border border-gray-700">
							{skill}
						</span>
					))}
				</div>
			</section>

			{/* FEATURED PROJECTS */}
			<section className="py-16 border-t border-gray-800">
				<h2 className="text-3xl font-semibold mb-8">Featured Projects</h2>
				<div className="grid md:grid-cols-2 gap-8">
					{/* Här kommer dina projekt-kort sen */}
					<div className="aspect-video bg-gray-900 rounded-xl border border-gray-700 p-6">
						<h3 className="text-xl font-bold">Projekt 1</h3>
						<p className="text-gray-400">Beskrivning av ditt grymma projekt...</p>
					</div>
				</div>
			</section>

			{/* GET IN TOUCH */}
			<section className="py-20 text-center border-t border-gray-800">
				<h2 className="text-4xl font-bold mb-6"> build something together</h2>
				<a
					href="mailto:din@mail.se"
					className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition"
				>
					Get in Touch
				</a>
			</section>
		</main>
	);
}
