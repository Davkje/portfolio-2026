export default function CVPage() {
	const work = [
		{
			role: "Front End Developer",
			company: "Afonso, Stockholm",
			period: "2026 — Present",
			description:
				"Part time work at Stockholm based web agency Afonso where I design and develop sites for companies like Papercut, DemokratiUppropet & Elsvea.",
			bullets: [],
		},
		{
			role: "Producer, Songwriter & Sound Designer",
			company: "Self Employed",
			period: "2016 — Present",
			description:
				"Since 2016 I've worked as a freelancing music producer, songwriter, sound-designer and audio-engineer. Achieved number 1 songs on radio, sold platinum records, and was signed to Warner Chappell Scandinavia as a contracted producer and writer.",
			bullets: [
				"Produced hundreds of songs for artists and labels",
				"Custom compositions for IBM commercial",
				'Written music for TV like "Melodifestivalen" & "Så Mycket Bättre"',
				"Record and implement audio for Jumpyard across all locations",
				"Record and sound design podcast",
			],
		},
	];

	const education = [
		{
			degree: "Front End Developer YH-Program",
			school: "Medieinstitutet",
			period: "2024 — 2026",
			description:
				"Two year Front End Development program including a 6 month internship at Stockholm based web-agency Afonso.",
		},
		{
			degree: "Writing and Production",
			school: "Musikmakarna University",
			period: "2015 — 2017",
			description:
				"Attended the acclaimed music university Musikmakarna. Gave me a tremendous start to my career as writer and producer.",
		},
	];

	const skills = [
		{
			label: "Languages",
			items: ["HTML", "CSS", "TypeScript", "React", "Next.js", "PHP", "GraphQL", "SQL"],
		},
		{
			label: "Frameworks & Libraries",
			items: ["Vue", "Vite", "Tailwind", "Algolia", "Framer Motion"],
		},
		{
			label: "Web & UX",
			items: [
				"Responsive Design",
				"Mobile-First",
				"SEO",
				"Accessibility",
				"Design Systems",
				"Figma",
				"Adobe Suite",
			],
		},
		{
			label: "Tools",
			items: ["VS Code", "Git", "GitHub", "Vercel", "Supabase", "Wordpress", "Browserstack"],
		},
		{
			label: "Other",
			items: ["Agile/Scrum", "Cross-Browser Compatibility", "Debugging", "Multiple DAWs"],
		},
	];

	return (
		<main className="bg-background min-h-screen text-foreground">
			<div className="max-w-3xl mx-auto px-6 py-24">
				<div className="flex items-end justify-between mb-16">
					<h1 className="font-jomolhari text-[clamp(60px,12vw,120px)] leading-none uppercase">
						CV
					</h1>
					<a
						href="/assets/CV2026.pdf"
						download
						className="text-md tracking-widest uppercase px-4 py-2 border border-foreground/40 text-foreground hover:opacity-60 transition-opacity mb-3"
					>
						Download PDF
					</a>
				</div>

				<div className="flex flex-col">
					{/* Work */}
					<section className="border-t border-foreground/20 py-10">
						<span className="text-lg tracking-widest uppercase text-foreground/50 block mb-8">
							Work
						</span>
						<div className="flex flex-col gap-10">
							{work.map((job) => (
								<div key={job.role}>
									<div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
										<h3 className="font-semibold text-lg">{job.role}</h3>
										<span className="font-mono text-sm text-foreground/50 shrink-0">
											{job.period}
										</span>
									</div>
									<p className="text-[11px] tracking-widest uppercase text-foreground/50 mb-3">
										{job.company}
									</p>
									<p className="leading-relaxed mb-3">{job.description}</p>
									{job.bullets.length > 0 && (
										<ul className="flex flex-col gap-1 text-sm text-foreground/70">
											{job.bullets.map((b) => (
												<li key={b}>— {b}</li>
											))}
										</ul>
									)}
								</div>
							))}
						</div>
					</section>

					{/* Education */}
					<section className="border-t border-foreground/20 py-10">
						<span className="text-lg tracking-widest uppercase text-foreground/50 block mb-8">
							Education
						</span>
						<div className="flex flex-col gap-8">
							{education.map((edu) => (
								<div key={edu.degree}>
									<div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
										<h3 className="font-semibold text-lg">{edu.degree}</h3>
										<span className="font-mono text-sm text-foreground/50 shrink-0">
											{edu.period}
										</span>
									</div>
									<p className="text-[11px] tracking-widest uppercase text-foreground/50 mb-3">
										{edu.school}
									</p>
									<p className="text-sm leading-relaxed">{edu.description}</p>
								</div>
							))}
						</div>
					</section>

					{/* Skills */}
					<section className="border-t border-foreground/20 py-10">
						<span className="text-lg tracking-widest uppercase text-foreground/50 block mb-8">
							Skills
						</span>
						<div className="flex flex-col gap-6">
							{skills.map(({ label, items }) => (
								<div key={label}>
									<p className="text-[11px] tracking-widest uppercase font-mono text-foreground/40 mb-3">
										{label}
									</p>
									<div className="flex flex-wrap gap-2">
										{items.map((item) => (
											<span
												key={item}
												className="text-[11px] tracking-widest uppercase px-3 py-1.5 border border-foreground/25 bg-foreground/5 text-foreground"
											>
												{item}
											</span>
										))}
									</div>
								</div>
							))}
						</div>
					</section>
				</div>
			</div>
		</main>
	);
}
