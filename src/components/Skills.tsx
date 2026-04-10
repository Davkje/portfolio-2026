const skills = [
	"Html",
	"CSS",
	"JavaScript",
	"TypeScript",
	"React",
	"Next",
	"Algolia",
	"PHP",
	"Wordpress",
	"Vite",
	"Vue",
	"Node",
	"Claude",
	"Express",
	"Git",
	"Github",
	"Bitbucket",
	"Figma",
	"Adobe Suite",
	"Procreate",
	"Logic Pro",
	"Wwise",
];

export default function Skills() {
	// Duplicate list for seamless loop
	const doubled = [...skills, ...skills];

	return (
		<section className="bg-background w-full overflow-hidden py-6">
			<div
				className="flex gap-11 whitespace-nowrap"
				style={{ animation: "marquee 24s linear infinite" }}
			>
				{doubled.map((skill, i) => (
					<span
						key={i}
						className="uppercase leading-none shrink-0"
						style={{ fontSize: "clamp(28px, 2.8vw, 48px)" }}
					>
						{skill}
					</span>
				))}
			</div>
		</section>
	);
}
