import { RiFileDownloadLine } from "@remixicon/react";
import Link from "next/link";

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
			<div className="p-6">
				<div className="flex items-end gap-2 py-10">
					<h1 className="font-jomolhari leading-none text-[clamp(50px,12vw,80px)] tracking-wide uppercase">
						CV
					</h1>
					<a
						href="/assets/CV2026.pdf"
						download
						className="flex items-end text-foreground opacity-60 hover:opacity-100 transition-opacity w-fit"
						aria-label="Download CV as CV"
					>
						<RiFileDownloadLine size={24} className="mb-0.5" />
					</a>
				</div>

				<div className="flex flex-col">
					{/* Work */}
					<section className="border-t border-foreground/10 py-10">
						<span className="text-lg tracking-widest uppercase text-foreground/80 block mb-4">
							Work
						</span>
						<div className="flex flex-col gap-10 max-w-[70vw]">
							{work.map((job) => (
								<div key={job.role}>
									<div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
										<h3 className="font-semibold text-lg">{job.role}</h3>
										<span className="font-mono text-md text-foreground/80 shrink-0">
											{job.period}
										</span>
									</div>
									<p className="text-sm tracking-widest uppercase text-foreground/80 mb-3">
										{job.company}
									</p>
									<p className="text-lg leading-relaxed mb-3">{job.description}</p>
									{job.bullets.length > 0 && (
										<ul className="list-disc list-inside flex flex-col gap-1 text-lg text-foreground">
											{job.bullets.map((b) => (
												<li key={b}>{b}</li>
											))}
										</ul>
									)}
								</div>
							))}
						</div>
					</section>

					{/* Education */}
					<section className="border-t border-foreground/10 py-10">
						<span className="text-lg tracking-widest uppercase text-foreground/80 block mb-4">
							Education
						</span>
						<div className="flex flex-col gap-8 max-w-[70vw]">
							{education.map((edu) => (
								<div key={edu.degree}>
									<div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
										<h3 className="font-semibold text-lg">{edu.degree}</h3>
										<span className="font-mono text-md text-foreground/80 shrink-0">
											{edu.period}
										</span>
									</div>
									<p className="text-md tracking-widest uppercase text-foreground/80 mb-3">
										{edu.school}
									</p>
									<p className="text-lg leading-relaxed">{edu.description}</p>
								</div>
							))}
						</div>
					</section>

					{/* Skills */}
					<section className="border-t border-foreground/10 py-10">
						<span className="text-lg tracking-widest uppercase text-foreground/80 block mb-4">
							Skills
						</span>
						<div className="flex flex-col gap-6 max-w-[70vw]">
							{skills.map(({ label, items }) => (
								<div key={label}>
									<p className="text-md tracking-widest uppercase font-mono text-foreground/80 mb-3">
										{label}
									</p>
									<div className="flex flex-wrap gap-2">
										{items.map((item) => (
											<span
												key={item}
												className="text-sm tracking-widest uppercase px-3 py-1.5 border border-foreground/40 bg-foreground/5 text-foreground"
											>
												{item}
											</span>
										))}
									</div>
								</div>
							))}
						</div>
					</section>
					<a
						href="/assets/CV2026.pdf"
						download
						className="max-w-5xl mx-auto w-full mb-6 flex justify-center gap-2 text-xl text-center tracking-widest uppercase px-3 py-4 bg-foreground/5 text-foreground border border-transparent hover:border-foreground transition-colors"
						aria-label="Download CV as CV"
					>
						Download the full CV
						<RiFileDownloadLine size={24} className="mb-0.5" />
					</a>

					<Link
						href={"/"}
						className="max-w-5xl mx-auto w-full text-xl text-center tracking-widest uppercase px-3 py-4 text-foreground border border-transparent transition-colors hover:border-foreground"
					>
						Back to the portfolio
					</Link>
				</div>
			</div>
		</main>
	);
}
