"use client";

import {
	RiAddLine,
	RiArrowDownSFill,
	RiArrowLeftSFill,
	RiArrowRightSFill,
	RiArrowUpSFill,
	RiCloseLine,
	RiSubtractLine,
} from "@remixicon/react";
import { AnimatePresence, motion, useInView, Variants } from "framer-motion";
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
	challenge?: string;
	results?: string;
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

					<p className="text-base leading-relaxed" style={{ color: p.accent }}>
						{p.description}
					</p>
				</div>
				<div
					className="flex flex-col gap-1 text-sm font-light tracking-wider opacity-70"
					style={{ color: p.accent }}
				>
					<p>{p.type}</p>
					<p>{p.role}</p>
					<p>{p.year}</p>
				</div>

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

									{p.challenge && (
										<div className="flex flex-col gap-2">
											<p
												className="text-md tracking-widest uppercase font-light"
												style={{ color: p.accent }}
											>
												Challenge
											</p>
											<p
												className="text-base leading-relaxed opacity-90"
												style={{ color: p.accent }}
											>
												{p.challenge}
											</p>
										</div>
									)}

									{p.results && (
										<div className="flex flex-col gap-2">
											<p
												className="text-md tracking-widest uppercase font-light"
												style={{ color: p.accent }}
											>
												Results
											</p>
											<p
												className="text-base leading-relaxed opacity-90"
												style={{ color: p.accent }}
											>
												{p.results}
											</p>
										</div>
									)}

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

				<div className="grid gap-2 md:pb-4 text-xl">
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
				className="hidden md:flex relative z-10 w-[35vw] h-[90vh] flex-col justify-between px-4 shrink-0 min-w-70"
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

						<p className="text-xl leading-relaxed" style={{ color: p.accent }}>
							{p.description}
						</p>
					</div>
					<div
						className="flex flex-col gap-1 text-lg font-light tracking-wider opacity-70"
						style={{ color: p.accent }}
					>
						<p>{p.type}</p>
						<p>{p.role}</p>
						<p>{p.year}</p>
					</div>
					<div className="flex flex-wrap gap-2">
						{p.tags.map((t) => (
							<span
								key={t}
								className="text-sm tracking-widest uppercase text-center grow px-4 py-2 select-none"
								style={{
									color: p.accent,
									backgroundColor: `${p.accent}20`,
								}}
							>
								{t}
							</span>
						))}
					</div>
					<button
						onClick={onToggle}
						className="flex gap-2 max-w-min text-lg justify-start items-center text-center tracking-widest hover:underline hover:opacity-80 transition-opacity"
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
						{p.liveUrl && (
							<a
								href={p.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-center tracking-widest uppercase px-4 py-4 border hover:opacity-80 transition-opacity text-xl"
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
								className="text-center tracking-widest uppercase px-4 py-4 border hover:opacity-80 transition-opacity text-xl"
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
						className="hidden md:block relative z-10 shrink-0 h-[90vh] overflow-hidden "
						style={{ background: `${p.bg}` }}
					>
						<div className="w-[calc(100dvw-35vw-8rem)] py-4 pl-2 pr-6 flex flex-col gap-6 sm:text-[clamp(14px,1.4vw,16px)] xl:text-[clamp(16px,0.95vw,18px)]">
							<div className="relative flex flex-col gap-3">
								<button
									onClick={onToggle}
									className="absolute right-0 hover:opacity-80 transition-opacity z-20"
									style={{ color: p.accent, borderColor: `${p.accent}60` }}
									aria-expanded={expanded}
								>
									<RiCloseLine />
								</button>
								<h4 className="tracking-widest uppercase opacity-70" style={{ color: p.accent }}>
									About
								</h4>
								<p className="leading-relaxed opacity-90" style={{ color: p.accent }}>
									{p.about}
								</p>
							</div>

							{p.challenge && (
								<div className="flex flex-col gap-3">
									<h4 className="tracking-widest uppercase opacity-70" style={{ color: p.accent }}>
										Challenge
									</h4>
									<p className="leading-relaxed opacity-90" style={{ color: p.accent }}>
										{p.challenge}
									</p>
								</div>
							)}

							{p.results && (
								<div className="flex flex-col gap-3">
									<h4 className="tracking-widest uppercase opacity-70" style={{ color: p.accent }}>
										Results
									</h4>
									<p className="leading-relaxed opacity-90" style={{ color: p.accent }}>
										{p.results}
									</p>
								</div>
							)}

							<div className="flex flex-col gap-3">
								<p className="tracking-widest uppercase opacity-70" style={{ color: p.accent }}>
									Highlights
								</p>
								<ul className="flex flex-col gap-4">
									{p.highlights.map((h) => (
										<li
											key={h}
											style={{ color: p.accent }}
											className="leading-relaxed opacity-90 flex gap-4"
										>
											<span
												style={{ backgroundColor: p.accent }}
												className="place-self-start mt-3 rounded-full h-2 w-2 shrink-0"
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
		const borderRef = useRef(null);
		const isInView = useInView(borderRef, { margin: "-70% 0px -30% 0px" });
		const borderVariants: Variants = {
			initial: {
				scaleY: 0,
			},
			animate: {
				scaleY: 1,
				transition: {
					duration: 3,
					ease: [0.16, 1, 0.3, 1],
				},
			},
			exit: {
				opacity: 0,
				transition: {
					duration: 0.5,
					ease: "easeOut",
				},
			},
		};

		return (
			<section
				id={p.id}
				ref={ref}
				className="relative w-full flex flex-col-reverse md:flex-row scroll-mt-[15vh] md:scroll-mt-[7vh] overflow-hidden md:pr-4"
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
								variants={borderVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								style={{ backgroundColor: "var(--color-foreground)" }}
							/>
						)}
					</AnimatePresence>
				</div>

				<MobilePanel p={p} expanded={expanded} onToggle={toggle} />
				<DesktopPanel p={p} expanded={expanded} onToggle={toggle} />

				{/* Media */}
				<button
					className={`relative w-full md:flex-1 overflow-hidden transition-all ease-[cubic-bezier(0.32,0.72,0,1)] duration-400 ${!expanded ? "h-[30vh] md:h-[90vh]" : "h-[10vh] md:h-[90vh]"}`}
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
