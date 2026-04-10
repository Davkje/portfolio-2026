"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ProjectSlide, { Project } from "./ProjectSlide"; // Justera sökvägen om det behövs
import ProjectThumbnail from "./ProjectThumbnail";

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
	const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
	const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const handleScroll = () => {
			const mid = window.innerHeight / 2;
			let closest = 0;
			let closestDist = Infinity;

			sectionRefs.current.forEach((el, i) => {
				if (!el) return;
				const rect = el.getBoundingClientRect();
				const dist = Math.abs(rect.top + rect.height / 2 - mid);

				if (dist < closestDist) {
					closestDist = dist;
					closest = i;
				}

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
		<div className="relative w-full flex flex-col md:flex-row-reverse">
			<nav className="sticky top-0 z-50 w-full md:w-32 md:h-dvh flex md:flex-col gap-2 md:gap-4 px-4 md:justify-center bg-background/80 backdrop-blur-md md:bg-transparent overflow-x-auto md:overflow-visible scrollbar-none shrink-0">
				{PROJECTS.map((p, i) => (
					<ProjectThumbnail
						key={p.id}
						project={p}
						index={i}
						active={activeIndex === i}
						onClick={() => scrollTo(p.id)}
					/>
				))}
			</nav>

			<main className="flex-1 min-w-0 flex flex-col gap-4">
				{PROJECTS.map((p, i) => (
					<ProjectSlide
						key={p.id}
						project={p}
						index={i}
						ref={(el) => (sectionRefs.current[i] = el)}
						imgRef={(el) => (imgRefs.current[i] = el)}
					/>
				))}
			</main>
		</div>
	);
}
