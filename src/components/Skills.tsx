import portfolioData from "../data/portfolio.json";

const skills = [...portfolioData.skills.code, ...portfolioData.skills.toolbox];

export default function Skills() {
	// Duplicate list for seamless loop
	const doubled = [...skills, ...skills];

	return (
		<section className="bg-background w-full overflow-hidden py-6 bg-gravel">
			<h2 className="text-[clamp(36px,3vw,44px)] text-center tracking-wide uppercase">Skills</h2>
			<div
				className="flex gap-4 md:gap-11 whitespace-nowrap"
				style={{ animation: "marquee 24s linear infinite" }}
			>
				{doubled.map((skill, i) => (
					<span
						key={i}
						className="uppercase leading-none shrink-0"
						style={{ fontSize: "clamp(18px, 2.8vw, 48px)" }}
					>
						{skill}
					</span>
				))}
			</div>
		</section>
	);
}
