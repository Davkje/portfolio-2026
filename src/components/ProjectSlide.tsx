"use client";

import { RiAddLine, RiArrowLeftSFill, RiArrowRightSFill, RiSubtractLine } from "@remixicon/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { forwardRef, useState } from "react";

export interface Project {
	id: string;
	title: string;
	img: string;
	altImg?: string;
	videoUrl?: string;
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
			{/* Always-visible header */}
			<div className="flex flex-col gap-4 p-4">
				<div>
					<h2
						className="text-[clamp(1.8rem,10vw,3rem)] font-black leading-none mb-1"
						style={{ color: p.accent }}
					>
						{p.title}
					</h2>
					<p className="text-sm font-mono opacity-60" style={{ color: p.accent }}>
						{p.year} · {p.role} · {p.type}
					</p>
				</div>

				<h4 className="text-sm leading-relaxed opacity-80" style={{ color: p.accent }}>
					{p.description}
				</h4>

				<div className="flex flex-wrap gap-2">
					{p.tags.map((t) => (
						<span
							key={t}
							className="text-[10px] tracking-widest uppercase px-2.5 py-1 border select-none"
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

				{/* Toggle */}
				<button
					onClick={onToggle}
					className="flex items-center gap-2 text-[11px] tracking-widest uppercase font-mono px-4 py-2 border w-full justify-center hover:opacity-60 transition-opacity"
					style={{ color: p.accent, borderColor: `${p.accent}50` }}
					aria-expanded={expanded}
				>
					<motion.span
						animate={{ rotate: expanded ? 45 : 0 }}
						transition={{ duration: 0.25 }}
						className="inline-block"
					>
						+
					</motion.span>
					{expanded ? "Less" : "More"}
				</button>
			</div>

			{/* Expandable section */}
			<AnimatePresence initial={false}>
				{expanded && (
					<motion.div
						key="mobile-detail"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
						className="overflow-hidden"
						style={{ background: `${p.bg}f0` }}
					>
						<div className="flex flex-col gap-6 px-4 pb-4 pt-2">
							<div className="flex flex-col gap-2">
								<p
									className="text-[10px] tracking-widest uppercase opacity-40 font-mono"
									style={{ color: p.accent }}
								>
									About
								</p>
								<p className="text-sm leading-relaxed opacity-80" style={{ color: p.accent }}>
									{p.about}
								</p>
							</div>

							<div className="flex flex-col gap-2">
								<p
									className="text-[10px] tracking-widest uppercase opacity-40 font-mono"
									style={{ color: p.accent }}
								>
									Highlights
								</p>
								<ul className="flex flex-col gap-2">
									{p.highlights.map((h) => (
										<li
											key={h}
											className="text-sm leading-relaxed opacity-80 flex gap-2"
											style={{ color: p.accent }}
										>
											<span className="opacity-40 shrink-0">—</span>
											{h}
										</li>
									))}
								</ul>
							</div>

							{(p.liveUrl || p.githubUrl) && (
								<div className="grid gap-2">
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
											REPO
										</a>
									)}
								</div>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
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
				className="hidden md:flex relative z-10 w-[30dvw] h-[93dvh] flex-col justify-between p-6 shrink-0 min-w-[360px]"
				style={{ background: p.bg }}
			>
				<div className="flex flex-col gap-6 h-full">
					<div>
						<div className="flex gap-1 justify-between items-center">
							<h2
								className="text-[clamp(1.8rem,5vw,3.5rem)] font-black leading-none tracking-wide mb-2"
								style={{ color: p.accent }}
							>
								{p.title}
							</h2>
							<button
								onClick={onToggle}
								className={`p-3 transition-opacity duration-300 ${expanded ? "opacity-0 hover:opacity-0 cursor-default!" : "opacity-100"}`}
								style={{ color: p.accent }}
								aria-expanded={expanded}
								disabled={expanded}
							>
								<RiArrowRightSFill size={32} />
							</button>
						</div>

						<div
							className="flex flex-col gap-0.5 text-sm font-mono tracking-wide"
							style={{ color: p.accent }}
						>
							<p>{p.year}</p>
							<p>{p.type}</p>
							<p>{p.role}</p>
						</div>
					</div>

					<p className="text-md leading-relaxed" style={{ color: p.accent }}>
						{p.description}
					</p>

					<div className="flex flex-wrap gap-2">
						{p.tags.map((t) => (
							<span
								key={t}
								className="text-sm tracking-widest uppercase text-center grow px-4 py-2 border select-none"
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
					<button
						onClick={onToggle}
						className="flex gap-2 max-w-min text-md justify-start items-center text-center tracking-widest hover:underline hover:opacity-80 transition-opacity"
						style={{ color: p.accent, borderColor: `${p.accent}60` }}
						aria-expanded={expanded}
					>
						{expanded ? (
							<>
								<span>Less</span>
								<RiSubtractLine size={12} />
							</>
						) : (
							<>
								<span>More</span>
								<RiAddLine size={12} />
							</>
						)}
					</button>

					<div className="grid gap-2 mt-auto">
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
						className="hidden md:block relative z-10 shrink-0 h-[93dvh] overflow-hidden "
						style={{ background: `${p.bg}` }}
					>
						<div className="w-[calc(40dvw-3rem)] px-6 pl-2 py-6 flex flex-col gap-6">
							<div className="flex flex-col gap-3">
								<button
									className="p-3 mb-2 hover:opacity-60 transition-opacity place-self-end"
									style={{ color: p.accent, borderColor: `${p.accent}60` }}
									onClick={onToggle}
									aria-expanded={expanded}
								>
									{expanded ? (
										<>
											<RiArrowLeftSFill size={32} />
										</>
									) : (
										<></>
									)}
								</button>
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
								<ul className="flex flex-col gap-2">
									{p.highlights.map((h) => (
										<li
											key={h}
											style={{ color: p.accent }}
											className="text-md leading-relaxed opacity-90 flex gap-2"
										>
											<span
												style={{ backgroundColor: p.accent }}
												className="place-self-center rounded-full h-2 w-2 shrink-0"
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
}

const ProjectSlide = forwardRef<HTMLDivElement, ProjectSlideProps>(
	({ project: p, index: i }, ref) => {
		const [expanded, setExpanded] = useState(false);
		const toggle = () => setExpanded((v) => !v);

		return (
			<section
				id={p.id}
				ref={ref}
				className="relative w-full flex flex-col-reverse md:flex-row scroll-mt-[15dvh] md:scroll-mt-[7dvh] overflow-hidden"
				style={{
					backgroundColor: `${p.bg}`,
				}}
			>
				<MobilePanel p={p} expanded={expanded} onToggle={toggle} />
				<DesktopPanel p={p} expanded={expanded} onToggle={toggle} />

				{/* Media */}
				<button
					className="relative w-full h-[50svh] md:h-[93dvh] md:flex-1 overflow-hidden"
					onClick={toggle}
					aria-expanded={expanded}
				>
					{/* <video
						src={p.videoUrl}
						autoPlay
						muted
						loop
						playsInline
						className="w-full h-full object-cover opacity-100"
					/> */}
					{p.img && p.altImg && (
						<Image
							src={!expanded ? p.img : p.altImg}
							alt={p.title}
							fill
							className="object-cover opacity-100"
							priority={i === 0}
						/>
					)}
				</button>
			</section>
		);
	},
);

ProjectSlide.displayName = "ProjectSlide";

export default ProjectSlide;
