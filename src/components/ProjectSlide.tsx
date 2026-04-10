"use client";

import Image from "next/image";
import { forwardRef } from "react";

// Vi exporterar även interfacet så att det kan användas i huvudfilen
export interface Project {
	id: string;
	title: string;
	img: string;
	year: string;
	tags: string[];
	bg: string;
	accent: string;
}

interface ProjectSlideProps {
	project: Project;
	index: number;
	imgRef?: (el: HTMLDivElement | null) => void;
}

const ProjectSlide = forwardRef<HTMLDivElement, ProjectSlideProps>(
	({ project: p, index: i, imgRef }, ref) => {
		return (
			<section
				id={p.id}
				ref={ref}
				className="relative w-full h-[85svh] md:h-dvh flex items-end overflow-hidden border-b border-white/5"
				style={{ background: p.bg }}
			>
				{/* Parallax Image */}
				<div ref={imgRef} className="absolute inset-0 scale-125 will-change-transform">
					<Image
						src={p.img}
						alt={p.title}
						fill
						className="object-cover opacity-40"
						priority={i === 0}
					/>
				</div>

				{/* Gradient Overlay */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						background: `linear-gradient(to top, ${p.bg} 0%, ${p.bg}66 50%, transparent 100%)`,
					}}
				/>

				{/* Content */}
				<div className="relative z-10 p-8 md:p-16 w-full max-w-4xl">
					<div className="flex gap-2 mb-6">
						{p.tags.map((t) => (
							<span
								key={t}
								className="text-[9px] tracking-widest uppercase px-3 py-1 rounded-full border border-current"
								style={{ color: p.accent }}
							>
								{t}
							</span>
						))}
					</div>
					<h2
						className="text-5xl md:text-8xl font-black leading-[0.85] tracking-tighter mb-4"
						style={{ color: p.accent }}
					>
						{p.title}
					</h2>
					<p className="text-sm font-mono opacity-60" style={{ color: p.accent }}>
						{p.year}
					</p>
				</div>

				{/* Watermark Index */}
				<span
					className="absolute top-4 right-8 text-[12vw] font-black opacity-10 pointer-events-none select-none"
					style={{ color: p.accent }}
				>
					{String(i + 1).padStart(2, "0")}
				</span>
			</section>
		);
	},
);

ProjectSlide.displayName = "ProjectSlide";

export default ProjectSlide;
