export default function CVPage() {
	const experiences = [
		{
			year: "2024 - Nu",
			title: "Frontend Developer",
			company: "Företag X",
			description: "Jobbar med moderna webbupplevelser i React och Vue.",
		},
		{
			year: "2022 - 2024",
			title: "Junior Webbutvecklare",
			company: "Byrå Y",
			description: "Fokus på responsiv design och kundprojekt.",
		},
	];

	return (
		<main className="max-w-4xl mx-auto px-6 py-20">
			<div className="flex justify-between items-center mb-12">
				<h1 className="text-4xl font-bold">Curriculum Vitae</h1>
				<a
					href="/mitt-cv.pdf"
					download
					className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded transition"
				>
					Ladda ner PDF
				</a>
			</div>

			<div className="space-y-12">
				{experiences.map((exp, index) => (
					<div key={index} className="relative pl-8 border-l-2 border-gray-800">
						<div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1"></div>
						<span className="text-blue-400 font-mono text-sm">{exp.year}</span>
						<h2 className="text-2xl font-bold mt-1">{exp.title}</h2>
						<p className="text-gray-400 font-medium">{exp.company}</p>
						<p className="text-gray-500 mt-2">{exp.description}</p>
					</div>
				))}
			</div>
		</main>
	);
}
