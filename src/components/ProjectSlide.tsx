"use client";

import Image from "next/image";
import { forwardRef } from "react";

export interface Project {
	id: string;
	title: string;
	img: string;
	altImg?: string;
	videoUrl?: string;
	year: string;
	tags: string[];
	bg: string;
	accent: string;
	description: string;
	liveUrl?: string;
	githubUrl?: string;
	featured?: boolean;
}

interface ProjectSlideProps {
	project: Project;
	index: number;
	imgRef?: React.RefCallback<HTMLDivElement>;
	onScrollTo?: () => void;
}

const ProjectSlide = forwardRef<HTMLDivElement, ProjectSlideProps>(
	({ project: p, index: i, imgRef }, ref) => {
		return (
			<section
				id={p.id}
				ref={ref}
				className="relative w-full flex gap-1 flex-col md:flex-row scroll-mt-[15dvh] md:scroll-mt-[7dvh] overflow-hidden"
			>
				{/* Bild — full bredd på mobil, flex-1 på desktop */}
				{/* Bild — full bredd på mobil, flex-1 på desktop */}
				<div className="relative w-full h-[50svh] md:h-[93dvh] md:flex-1 overflow-hidden">
					{p.videoUrl ? (
						<video
							src={p.videoUrl}
							autoPlay
							muted
							loop
							playsInline
							className="w-full h-full object-cover opacity-80"
						/>
					) : (
						<Image
							src={p.img}
							alt={p.title}
							fill
							className="object-cover opacity-80"
							priority={i === 0}
						/>
					)}
				</div>

				{/* Aside — full bredd på mobil, 30dvw på desktop */}
				<div
					className="relative z-10 w-full md:w-[30dvw] md:h-[93dvh] flex flex-col justify-between p-6 md:p-8 shrink-0"
					style={{ background: p.bg }}
				>
					<div className="flex flex-col gap-4 md:gap-6 h-full">
						<div>
							<h2
								className="text-[clamp(1.8rem,6vw,3.5rem)] font-black leading-none mb-1"
								style={{ color: p.accent }}
							>
								{p.title}
							</h2>
							<p className="text-sm font-mono opacity-60" style={{ color: p.accent }}>
								{p.year}
							</p>
						</div>

						<div className="flex flex-wrap gap-2">
							{p.tags.map((t) => (
								<span
									key={t}
									className="text-[11px] tracking-widest uppercase px-3 py-1.5 border select-none"
									style={{
										color: p.accent,
										borderColor: `${p.accent}50`,
										backgroundColor: `${p.accent}10`,
									}}
								>
									{t}
								</span>
							))}
						</div>

						<p className="text-sm leading-relaxed opacity-80" style={{ color: p.accent }}>
							{p.description}
						</p>

						{(p.liveUrl || p.githubUrl) && (
							<div className="grid grid-cols-2 gap-2 mt-auto">
								{p.liveUrl && (
									<a
										href={p.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-center tracking-widest uppercase px-4 py-2 border hover:opacity-60 transition-opacity text-sm"
										style={{ color: p.accent, borderColor: `${p.accent}60` }}
									>
										Live
									</a>
								)}
								{p.githubUrl && (
									<a
										href={p.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-center tracking-widest uppercase px-4 py-2 border hover:opacity-60 transition-opacity text-sm"
										style={{ color: p.accent, borderColor: `${p.accent}60` }}
									>
										GitHub
									</a>
								)}
							</div>
						)}
					</div>
				</div>
			</section>
		);
	},
);

ProjectSlide.displayName = "ProjectSlide";

export default ProjectSlide;
