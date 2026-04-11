"use client";

import Image from "next/image";
import { forwardRef, useEffect, useRef, useState } from "react";

interface Project {
	id: string;
	title: string;
	img: string;
	year: string;
	tags: string[];
	bg: string;
	accent: string;
}

const PROJECTS: Project[] = [
	{
		id: "project-0",
		title: "Arkiv",
		img: "/assets/mockup_rainstorm.png",
		year: "2024",
		tags: ["Web", "Design system"],
		bg: "#b12424",
		accent: "#dcf3de",
	},
	{
		id: "project-1",
		title: "Strata",
		img: "/assets/dino.png",
		year: "2023",
		tags: ["Branding", "Type"],
		bg: "#18191c",
		accent: "#dcf3de",
	},
	{
		id: "project-2",
		title: "Meridian",
		img: "/assets/dino.png",
		year: "2024",
		tags: ["App", "Motion"],
		bg: "#dcf3de",
		accent: "#18191c",
	},
	{
		id: "project-3",
		title: "Fält",
		img: "/assets/dino.png",
		year: "2023",
		tags: ["Installation", "3D"],
		bg: "#18191c",
		accent: "#b12424",
	},
];

export default function ProjectCarousel() {
	const [activeIndex, setActiveIndex] = useState(0);
	const desktopRefs = useRef<(HTMLDivElement | null)[]>([]);
	const mobileRefs = useRef<(HTMLDivElement | null)[]>([]);
	const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const handleScroll = () => {
			const mid = window.innerHeight / 2;
			const isMobile = window.innerWidth < 768;
			const refs = isMobile ? mobileRefs.current : desktopRefs.current;

			let closest = 0;
			let closestDist = Infinity;

			refs.forEach((el, i) => {
				if (!el) return;
				const rect = el.getBoundingClientRect();
				const dist = Math.abs(rect.top + rect.height / 2 - mid);
				if (dist < closestDist) {
					closestDist = dist;
					closest = i;
				}

				// Parallax — shift image wrapper based on distance from viewport center
				const imgEl = imgRefs.current[i];
				if (imgEl) {
					const slideCenter = rect.top + rect.height / 2;
					const offset = (slideCenter - mid) * 0.12;
					imgEl.style.transform = `translateY(${offset}px)`;
				}
			});

			setActiveIndex(closest);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollTo = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="relative w-full font-sans">
			{/* ── Desktop ── */}
			<div className="hidden md:flex w-full items-start">
				<div className="flex-1 min-w-0 pt-12">
					{PROJECTS.map((p, i) => (
						<ProjectSlide
							key={p.id}
							project={p}
							index={i}
							ref={(el) => {
								desktopRefs.current[i] = el;
							}}
							imgRef={(el) => {
								imgRefs.current[i] = el;
							}}
						/>
					))}
				</div>

				<div className="w-56 shrink-0 sticky top-0 h-dvh flex flex-col justify-center gap-4 pb-4 pt-12 px-4">
					{PROJECTS.map((p, i) => (
						<Thumbnail
							key={p.id}
							project={p}
							index={i}
							active={activeIndex === i}
							onClick={() => scrollTo(p.id)}
						/>
					))}
				</div>
			</div>

			{/* ── Mobile ── */}
			<div className="md:hidden w-full">
				<div className="sticky top-0 z-50 w-full flex gap-2 px-4 pt-12 pb-4 bg-background overflow-x-auto scrollbar-none">
					{PROJECTS.map((p, i) => (
						<button
							key={p.id}
							onClick={() => scrollTo(`mobile-${p.id}`)}
							className="grow relative rounded-md overflow-hidden h-12"
							style={{
								width: activeIndex === i ? 80 : 56,
								background: p.bg,
								outline: activeIndex === i ? `2px solid #dcf3de` : "2px solid transparent",
								outlineOffset: 2,
								transition: "width 300ms ease, outline 300ms ease",
							}}
						>
							<Image src={p.img} alt={p.title} fill className="object-cover opacity-40" />
							<span
								className="absolute inset-0 flex items-end p-1.5 text-[9px] font-mono tracking-widest uppercase z-10"
								style={{ color: p.accent, opacity: 0.9 }}
							>
								{String(i + 1).padStart(2, "0")}
							</span>
						</button>
					))}
				</div>

				<div className="w-full">
					{PROJECTS.map((p, i) => (
						<ProjectSlide
							key={p.id}
							project={p}
							index={i}
							id={`mobile-${p.id}`}
							ref={(el) => {
								mobileRefs.current[i] = el;
							}}
							imgRef={(el) => {
								imgRefs.current[i] = el;
							}}
							mobile
						/>
					))}
				</div>
			</div>
		</div>
	);
}

// ── Project slide ─────────────────────────────────────────────────────────────

const ProjectSlide = forwardRef<
	HTMLDivElement,
	{
		project: Project;
		index: number;
		mobile?: boolean;
		id?: string;
		imgRef?: (el: HTMLDivElement | null) => void;
	}
>(({ project: p, index: i, mobile, id, imgRef }, ref) => {
	return (
		<div
			id={id ?? p.id}
			ref={ref}
			className="relative w-full flex items-end overflow-hidden"
			style={{ height: mobile ? "90svh" : "90vh", background: p.bg }}
		>
			{/* Parallax image container — scale-110 gives ~10% bleed room so edges never show */}
			<div ref={imgRef} className="absolute inset-0 scale-110" style={{ willChange: "transform" }}>
				<Image
					src={p.img}
					alt={p.title}
					fill
					className="object-cover"
					style={{ opacity: 0.35 }}
					priority={i === 0}
				/>
			</div>

			{/* Gradient so text is always legible */}
			<div
				className="absolute inset-0"
				style={{
					background: `linear-gradient(to top, ${p.bg}f2 0%, ${p.bg}88 45%, ${p.bg}15 100%)`,
				}}
			/>

			{/* Index watermark */}
			<span
				className="absolute top-8 right-8 text-[clamp(4rem,10vw,8rem)] font-black leading-none select-none pointer-events-none"
				style={{ color: p.accent, opacity: 0.07, fontVariantNumeric: "tabular-nums" }}
			>
				{String(i + 1).padStart(2, "0")}
			</span>

			{/* Content */}
			<div className="relative z-10 p-8 md:p-12 w-full">
				<div className="flex flex-wrap gap-2 mb-4">
					{p.tags.map((t) => (
						<span
							key={t}
							className="text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border"
							style={{ color: p.accent, borderColor: `${p.accent}40` }}
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
				<p className="text-sm font-mono" style={{ color: `${p.accent}60` }}>
					{p.year}
				</p>
			</div>
		</div>
	);
});
ProjectSlide.displayName = "ProjectSlide";

// ── Sidebar thumbnail ─────────────────────────────────────────────────────────

function Thumbnail({
	project: p,
	index: i,
	active,
	onClick,
}: {
	project: Project;
	index: number;
	active: boolean;
	onClick: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className="group relative w-full grow overflow-hidden text-left"
			style={{
				height: active ? 100 : 60,
				background: p.bg,
				outline: active ? `1.5px solid #dcf3de` : "1.5px solid transparent",
				outlineOffset: active ? 2 : 0,
				opacity: active ? 1 : 0.45,
				transition:
					"height 400ms cubic-bezier(0.4,0,0.2,1), opacity 400ms ease, outline-color 400ms ease",
			}}
		>
			{/* Project image in thumbnail */}
			<Image
				src={p.img}
				alt={p.title}
				fill
				className="object-cover transition-transform duration-500 group-hover:scale-105"
				style={{ opacity: 0.45 }}
			/>

			{/* Hover tint */}
			<div
				className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
				style={{ background: `#dcf3de15` }}
			/>

			<div className="relative z-10 h-full flex flex-col justify-between p-2.5">
				<span className="text-[9px] font-mono tracking-widest" style={{ color: p.accent }}>
					{String(i + 1).padStart(2, "0")}
				</span>
				<span className="text-xs font-bold tracking-tight leading-none" style={{ color: p.accent }}>
					{p.title}
				</span>
			</div>
		</button>
	);
}
