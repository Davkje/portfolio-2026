"use client";

import {
	RiAddLine,
	RiArrowDownSFill,
	RiArrowLeftSFill,
	RiArrowRightSFill,
	RiArrowUpSFill,
	RiSubtractLine,
} from "@remixicon/react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { forwardRef, useRef, useState } from "react";

export interface Project {
	id: string;
	title: string;
	img: string;
	altImg?: string;
	videoUrl?: string;
	altVideoUrl?: string;
	year: string;
	tags: string[];
	highlights: string[];
	bg: string;
	accent: string;
	description: string;
	role: string;
	type: string;
	about: string;
	liveUrl?: string;
	githubUrl?: string;
	featured?: boolean;
}

// ─────────────────────────────────────────────
// Shared types
// ─────────────────────────────────────────────
interface PanelProps {
	p: Project;
	expanded: boolean;
	onToggle: () => void;
}

// ─────────────────────────────────────────────
// MobilePanel — slides down in height
// ─────────────────────────────────────────────
function MobilePanel({ p, expanded, onToggle }: PanelProps) {
	return (
		<div className="md:hidden w-full" style={{ background: p.bg }}>
			<div className="flex flex-col gap-4 px-4 py-4">
				<div className="flex flex-col gap-3">
					<button
						onClick={onToggle}
						aria-expanded={expanded}
						className="flex justify-between items-center gap-2 "
					>
						<h2
							className="text-[clamp(1.8rem,10vw,3rem)] font-black leading-[0.85] text-left"
							style={{ color: p.accent }}
						>
							{p.title}
						</h2>

						<span
							className="p-3 pr-0 transition-opacity duration-300 shrink-0"
							style={{ color: p.accent }}
						>
							{!expanded ? <RiArrowDownSFill size={28} /> : <RiArrowUpSFill size={28} />}
						</span>
					</button>

					{/* Meta */}
					<div
						className="flex flex-col gap-1 text-sm font-light tracking-wider opacity-70"
						style={{ color: p.accent }}
					>
						<p>{p.type}</p>
						<p>{p.role}</p>
						<p>{p.year}</p>
					</div>
				</div>

				{/* Description */}
				<p className="text-base leading-relaxed" style={{ color: p.accent }}>
					{p.description}
				</p>

				{/* Show more */}
				<div className="flex flex-col">
					<button
						onClick={onToggle}
						className="flex gap-2 uppercase max-w-min items-center tracking-widest hover:underline decoration-foreground/70 underline-offset-4 hover:opacity-70 transition-all"
						style={{ color: p.accent }}
						aria-expanded={expanded}
					>
						{expanded ? (
							<>
								<span className="min-w-max text-md">Show less</span>
								<RiSubtractLine size={12} />
							</>
						) : (
							<>
								<span className="min-w-max text-md">Show more</span>
								<RiAddLine size={12} />
							</>
						)}
					</button>
					{/* Expandable section — slides down */}
					<AnimatePresence initial={false}>
						{expanded && (
							<motion.div
								key="mobile-detail"
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
								style={{ background: p.bg }}
							>
								<div className="flex flex-col gap-6 py-4">
									<div className="flex flex-col gap-2">
										<p
											className="text-md tracking-widest uppercase font-light"
											style={{ color: p.accent }}
										>
											About
										</p>
										<p className="text-base leading-relaxed opacity-90" style={{ color: p.accent }}>
											{p.about}
										</p>
									</div>

									<div className="flex flex-col gap-2">
										<p
											className="text-md tracking-widest uppercase font-light"
											style={{ color: p.accent }}
										>
											Highlights
										</p>
										<ul className="flex flex-col gap-4">
											{p.highlights.map((h) => (
												<li
													key={h}
													className="text-base leading-relaxed opacity-90 flex gap-4"
													style={{ color: p.accent }}
												>
													<span className=" bg-foreground mt-2.5 place-self-start rounded-full h-2 w-2 shrink-0" />
													{h}
												</li>
											))}
										</ul>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* Tags */}
				<div className="grid gap-2 md:pb-4">
					<div className="flex flex-wrap gap-2">
						{p.tags.map((t) => (
							<span
								key={t}
								className="text-xs tracking-widest uppercase text-center grow px-4 py-2 select-none"
								style={{ color: p.accent, backgroundColor: `${p.accent}10` }}
							>
								{t}
							</span>
						))}
					</div>

					{p.liveUrl && (
						<a
							href={p.liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-center tracking-widest uppercase px-4 py-3 hover:opacity-80 transition-opacity"
							style={{ color: p.bg, backgroundColor: p.accent }}
						>
							Live
						</a>
					)}
					{p.githubUrl && (
						<a
							href={p.githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-center tracking-widest uppercase px-4 py-3 hover:opacity-80 transition-opacity"
							style={{ color: p.bg, backgroundColor: p.accent }}
						>
							Repo
						</a>
					)}

					<div className="bg-foreground/50 w-full h-0.5 mt-2"></div>
				</div>
			</div>
		</div>
	);
}

// ─────────────────────────────────────────────
// DesktopPanel — slides in from the left as a second column
// ─────────────────────────────────────────────
function DesktopPanel({ p, expanded, onToggle }: PanelProps) {
	return (
		<>
			{/* Main column */}
			<div
				className="hidden md:flex relative z-10 w-[35dvw] h-[90dvh] flex-col justify-between px-4 shrink-0 min-w-90"
				style={{ background: p.bg }}
			>
				<div className="flex flex-col gap-6 h-full">
					<div className="flex flex-col gap-1">
						<button
							className="flex w-full gap-1 justify-between items-center mb-4"
							onClick={onToggle}
							aria-expanded={expanded}
						>
							<h2
								className="text-left text-[clamp(1.8rem,5vw,5rem)] font-black leading-[0.9] tracking-normal"
								style={{ color: p.accent }}
							>
								{p.title}
							</h2>
							<span
								className={`p-3 pr-0  transition-opacity duration-300 `}
								style={{ color: p.accent }}
							>
								{!expanded ? <RiArrowRightSFill size={32} /> : <RiArrowLeftSFill size={32} />}
							</span>
						</button>

						<div
							className="flex flex-col gap-1 text-md font-light tracking-wider opacity-70"
							style={{ color: p.accent }}
						>
							<p>{p.type}</p>
							<p>{p.role}</p>
							<p>{p.year}</p>
						</div>
					</div>
					<p className="text-lg leading-relaxed" style={{ color: p.accent }}>
						{p.description}
					</p>
					<button
						onClick={onToggle}
						className="flex gap-2 max-w-min text-md justify-start items-center text-center tracking-widest hover:underline hover:opacity-80 transition-opacity"
						style={{ color: p.accent, borderColor: `${p.accent}60` }}
						aria-expanded={expanded}
					>
						{expanded ? (
							<>
								<span className="min-w-max">Show less</span>
								<RiSubtractLine size={12} />
							</>
						) : (
							<>
								<span className="min-w-max">Show more</span>
								<RiAddLine size={12} />
							</>
						)}
					</button>

					<div className="grid gap-2 mt-auto">
						<div className="flex flex-wrap gap-2">
							{p.tags.map((t) => (
								<span
									key={t}
									className="text-sm tracking-widest uppercase text-center grow px-4 py-2 select-none"
									style={{
										color: p.accent,
										// borderColor: `${p.accent}50`,
										backgroundColor: `${p.accent}20`,
									}}
								>
									{t}
								</span>
							))}
						</div>

						{p.liveUrl && (
							<a
								href={p.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-center tracking-widest uppercase px-4 py-4 border hover:opacity-80 transition-opacity text-lg"
								style={{ color: p.bg, backgroundColor: `${p.accent}` }}
							>
								Live
							</a>
						)}
						{p.githubUrl && (
							<a
								href={p.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-center tracking-widest uppercase px-4 py-4 border hover:opacity-80 transition-opacity text-lg"
								style={{ color: p.bg, backgroundColor: `${p.accent}` }}
							>
								Repo
							</a>
						)}
					</div>
				</div>
			</div>

			{/* Expandable second column */}
			<AnimatePresence initial={false}>
				{expanded && (
					<motion.div
						key="desktop-detail"
						initial={{ width: 0, opacity: 0 }}
						animate={{ width: "auto", opacity: 1 }}
						exit={{ width: 0, opacity: 0 }}
						transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
						className="hidden md:block relative z-10 shrink-0 h-[90dvh] overflow-hidden "
						style={{ background: `${p.bg}` }}
					>
						<div className="w-[calc(45dvw-3rem)] p-4 pl-0 flex flex-col gap-6">
							<div className="flex flex-col gap-3">
								<h4
									className="text-md tracking-widest uppercase opacity-70"
									style={{ color: p.accent }}
								>
									About
								</h4>
								<p className="text-md leading-relaxed opacity-90" style={{ color: p.accent }}>
									{p.about}
								</p>
							</div>

							<div className="flex flex-col gap-3">
								<p
									className="text-md tracking-widest uppercase opacity-70"
									style={{ color: p.accent }}
								>
									Highlights
								</p>
								<ul className="flex flex-col gap-4">
									{p.highlights.map((h) => (
										<li
											key={h}
											style={{ color: p.accent }}
											className="text-md leading-relaxed opacity-90 flex gap-4"
										>
											<span
												style={{ backgroundColor: p.accent }}
												className="place-self-start mt-2.5 rounded-full h-2 w-2 shrink-0"
											></span>
											{h}
										</li>
									))}
								</ul>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

// ─────────────────────────────────────────────
// ProjectSlide
// ─────────────────────────────────────────────
interface ProjectSlideProps {
	project: Project;
	index: number;
	imgRef?: React.RefCallback<HTMLDivElement>;
	onScrollTo?: () => void;
	active: boolean;
}

const ProjectSlide = forwardRef<HTMLDivElement, ProjectSlideProps>(
	({ project: p, index: i, active }, ref) => {
		const [expanded, setExpanded] = useState(false);
		const toggle = () => setExpanded((v) => !v);
		const borderRef = useRef(null);
		const isInView = useInView(borderRef, { margin: "-70% 0px -30% 0px" });

		return (
			<section
				id={p.id}
				ref={ref}
				className="relative w-full flex flex-col-reverse md:flex-row scroll-mt-[15dvh] md:scroll-mt-[7dvh] overflow-hidden md:pr-4"
				style={{
					backgroundColor: `${p.bg}`,
				}}
			>
				{/* ACTIVE BORDER */}
				<div ref={borderRef} className="relative h-full w-0.5 shrink-0 overflow-hidden">
					<AnimatePresence>
						{isInView && (
							<motion.div
								key="border"
								className="absolute inset-0 origin-top"
								initial={{ scaleY: 0 }}
								animate={{ scaleY: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
								style={{ backgroundColor: "var(--color-foreground)" }}
							/>
						)}
					</AnimatePresence>
				</div>

				<MobilePanel p={p} expanded={expanded} onToggle={toggle} />
				<DesktopPanel p={p} expanded={expanded} onToggle={toggle} />

				{/* Media */}
				<button
					className={`relative w-full md:flex-1 overflow-hidden transition-all  ${!expanded ? "h-[30dvh] md:h-[90dvh]" : "h-[10dvh] md:h-[90dvh]"}`}
					onClick={toggle}
					aria-expanded={expanded}
				>
					{p.videoUrl ? (
						<video
							src={p.videoUrl}
							autoPlay
							muted
							loop
							playsInline
							className="absolute inset-0 w-full h-full object-cover object-top"
						/>
					) : (
						<Image
							src={p.img}
							alt={p.title}
							fill
							className="object-cover object-top"
							priority={i === 0}
						/>
					)}
					{/* 
					{expanded && (p.altVideoUrl || p.altImg) && (
						<div className="absolute inset-0">
							{p.altVideoUrl ? (
								<video
									src={p.altVideoUrl}
									autoPlay
									muted
									loop
									playsInline
									className="w-full h-full object-cover object-top"
								/>
							) : (
								<Image src={p.altImg!} alt={p.title} fill className="object-cover object-top" />
							)}
						</div>
					)} */}
					{/* OVERLAY */}
					<div
						className={`absolute inset-0 bg-black/60 z-10 transition-opacity duration-400 ease-in-out ${!expanded && "opacity-0"}`}
					></div>
				</button>
			</section>
		);
	},
);

ProjectSlide.displayName = "ProjectSlide";

export default ProjectSlide;
