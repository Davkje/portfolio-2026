"use client";

import Image from "next/image";
import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine } from "@remixicon/react";

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
}

const ProjectSlide = forwardRef<HTMLDivElement, ProjectSlideProps>(
	({ project: p, index: i, imgRef }, ref) => {
		const [open, setOpen] = useState(false);

		return (
			<section
				id={p.id}
				ref={ref}
				onClick={() => setOpen((v) => !v)}
				className="relative w-full h-[85svh] md:h-[93dvh] flex items-end overflow-hidden scroll-mt-[15dvh] md:scroll-mt-[7dvh] cursor-pointer group"
			>
				{/* Parallax Image or Video */}
				<div ref={imgRef} className="absolute inset-0 scale-112 will-change-transform">
					{p.videoUrl ? (
						<video
							src={p.videoUrl}
							autoPlay
							muted
							loop
							playsInline
							className={`w-full h-full object-cover ${open ? "opacity-40" : "opacity-60"} transition-opacity duration-300`}
						/>
					) : (
						<Image
							src={p.img}
							alt={p.title}
							fill
							className={`object-cover ${open ? "opacity-40" : "opacity-60"} transition-opacity duration-300`}
							priority={i === 0}
						/>
					)}
				</div>

				{/* Info Panel */}
				<AnimatePresence>
					{open && (
						<motion.div
							key="panel"
							initial={{ opacity: 0, x: 12 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 12 }}
							transition={{ duration: 0.25, ease: "easeOut" }}
							onClick={(e) => e.stopPropagation()}
							className="shadow-2xl shadow-black/50 absolute top-0 right-0 h-full w-[min(520px,80%)] z-20 py-4 flex flex-col gap-4"
							style={{
								background: `${p.bg}`,
								backdropFilter: "blur(12px)",
							}}
						>
							<div className="w-full flex justify-between px-4">
								<h3 className="text-2xl font-bold leading-none tracking-normal">{p.title}</h3>
								<button
									onClick={(e) => {
										e.stopPropagation();
										setOpen(false);
									}}
									className="place-self-end opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
									style={{ color: p.accent }}
								>
									<RiCloseLine />
								</button>
							</div>
							{p.altImg && (
								<div className="shrinnk-0 relative w-full aspect-video overflow-hidden">
									<Image src={p.altImg} alt={p.title} fill className="object-cover" />
								</div>
							)}
							<div className="flex flex-col gap-4 px-4">
								<p className="text-sm md:text-base leading-relaxed" style={{ color: p.accent }}>
									{p.description}
								</p>
								<div className="flex flex-wrap gap-2">
									{p.tags.map((t) => (
										<span
											key={t}
											className="text-center text-sm tracking-widest uppercase px-3 py-2 border transition-all ease-in-out duration-100 hover:scale-[1.05] select-none"
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
							</div>
							<div className="grid grid-cols-2 gap-2 flex-wrap px-4">
								{p.liveUrl && (
									<a
										href={p.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-center tracking-widest uppercase px-4 py-2 border transition-opacity duration-200 hover:opacity-60"
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
										className="text-center tracking-widest uppercase px-4 py-2 border transition-opacity duration-200 hover:opacity-60"
										style={{ color: p.accent, borderColor: `${p.accent}60` }}
									>
										GitHub
									</a>
								)}
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Content */}
				<div className="relative z-10 p-8 md:p-16 w-full">
					<div className="flex flex-wrap gap-2 mb-2">
						{p.tags.map((t) => (
							<span
								key={t}
								className="text-[12px] tracking-widest uppercase px-3 py-2 border transition-all ease-in-out duration-100 hover:scale-[1.05] select-none"
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
						className="text-[clamp(2.5rem,7vw,5rem)] font-black leading-none tracking-normal mb-2"
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
