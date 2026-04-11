"use client";

import { forwardRef } from "react";

export interface Project {
	id: string;
	title: string;
	img: string;
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
}

const ProjectSlide = forwardRef<HTMLDivElement, ProjectSlideProps>(
	({ project: p, index: i, imgRef }, ref) => {
		return (
			<section
				id={p.id}
				ref={ref}
				className={`relative w-full h-[85svh] md:h-[93dvh] flex items-end overflow-hidden`}
				style={{ background: p.bg }}
			>
				{/* Parallax Image */}
				{/* <div ref={imgRef} className="absolute inset-0 scale-125 will-change-transform">
					<Image
						src={p.img}
						alt={p.title}
						fill
						className="object-cover opacity-40"
						priority={i === 0}
					/>
				</div> */}

				{/* Gradient Overlay */}
				{/* <div
					className="absolute inset-0 pointer-events-none"
					style={{
						background: `linear-gradient(to top, ${p.bg} 0%, ${p.bg}66 50%, transparent 100%)`,
					}}
				/> */}

				{/* Number Watermark Index */}
				<span
					className="absolute top-8 right-8 text-[12vw] font-black opacity-10 pointer-events-none select-none leading-30"
					style={{ color: p.accent }}
				>
					{String(i + 1).padStart(2, "0")}
				</span>

				{/* Content */}
				<div className="relative z-10 p-8 md:p-16 w-full ">
					<div className="flex flex-wrap gap-2 mb-2">
						{p.tags.map((t) => (
							<span
								key={t}
								className="text-[12px] tracking-widest uppercase px-3 py-2 border transition-all ease-in-out duration-100 hover:scale-[1.05]  select-none"
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
					<h2
						className="text-[clamp(2.5rem,7vw,5rem)] font-black leading-none tracking-tight mb-2"
						style={{ color: p.accent }}
					>
						{p.title}
					</h2>
					<p className="text-sm font-mono opacity-60" style={{ color: p.accent }}>
						{p.year}
					</p>
				</div>
			</section>
		);
	},
);

ProjectSlide.displayName = "ProjectSlide";

export default ProjectSlide;
