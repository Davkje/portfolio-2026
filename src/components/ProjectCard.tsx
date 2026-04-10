import Image from "next/image";

interface ProjectCardProps {
	title: string;
	description: string;
	previewSrc: string;
	codeHref?: string;
	demoHref?: string;
	align: "left" | "right";
	bg: "red" | "dark";
}

export default function ProjectCard({
	title,
	description,
	previewSrc,
	codeHref,
	demoHref,
	align,
	bg,
}: ProjectCardProps) {
	const bgColor = bg === "red" ? "bg-[var(--main-1)]" : "bg-[var(--main-3)]";
	const margin = align === "right" ? "ml-auto mr-6" : "mr-auto ml-6";

	return (
		<div
			className={`${bgColor} ${margin} p-16 flex items-center`}
			style={{ width: "clamp(480px, 47.6vw, 823px)" }}
		>
			<div className="flex flex-col gap-8 w-full">
				{/* Preview image */}
				<div className="w-full rounded-xl overflow-hidden" style={{ aspectRatio: "691/436" }}>
					<Image
						width={2100}
						height={1600}
						src={previewSrc}
						alt={`${title} preview`}
						className="w-full h-full object-cover"
					/>
				</div>

				{/* Info */}
				<div className="flex flex-col gap-11 items-center">
					<div className="flex flex-col gap-7 items-start w-full uppercase">
						<p className="leading-none" style={{ fontSize: "clamp(36px, 3.7vw, 64px)" }}>
							{title}
						</p>
						<p
							className="leading-[1.8] normal-case"
							style={{ fontSize: "clamp(14px, 1.2vw, 20px)" }}
						>
							{description}
						</p>
					</div>

					{codeHref && (
						<a
							href={codeHref}
							target="_blank"
							rel="noopener noreferrer"
							className="uppercase text-center hover:opacity-70 transition-opacity"
							style={{ fontSize: "clamp(16px, 1.4vw, 24px)" }}
						>
							See the code
						</a>
					)}

					{demoHref && (
						<a
							href={demoHref}
							target="_blank"
							rel="noopener noreferrer"
							className="bg-background px-3 py-3 hover:opacity-80 transition-opacity"
						>
							<span
								className="uppercase leading-none"
								style={{ fontSize: "clamp(36px, 3.7vw, 64px)" }}
							>
								TRY IT
							</span>
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
