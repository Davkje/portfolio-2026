export default function AboutPage() {
	return (
		<main className="max-w-4xl mx-auto px-6 py-20">
			<h1 className="text-4xl font-bold mb-8">Om mig</h1>
			<div className="prose prose-invert lg:prose-xl text-gray-300 space-y-6">
				<p>
					Jag är en utvecklare som älskar att kombinera design med teknik. Efter att ha jobbat
					mycket i Vue har jag nu tagit klivet över till Next.js för att utforska kraften i
					React-ekosystemet.
				</p>
				<p>
					Min filosofi är enkel: Bygg saker som är snabba, tillgängliga och ser fantastiska ut på
					alla skärmar.
				</p>
				<div className="pt-10">
					<h2 className="text-2xl font-semibold text-white mb-4">Erfarenhet i korthet</h2>
					<ul className="list-disc list-inside space-y-2">
						<li>Frontend-utveckling (Vue, React, Next.js)</li>
						<li>UI/UX Design</li>
						<li>TypeScript & Modern JavaScript</li>
					</ul>
				</div>
			</div>
		</main>
	);
}
