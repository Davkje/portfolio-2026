"use client";

import { useEffect, useRef, useState } from "react";
import ProjectSlide, { Project } from "./ProjectSlide";
import ProjectThumbnail from "./ProjectThumbnail";
import portfolioData from "../data/portfolio.json";

const PROJECTS: Project[] = [...portfolioData.projects];

export default function ProjectCarousel() {
	const [activeIndex, setActiveIndex] = useState(0);
	const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
	const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

	const programmaticRef = useRef(false);

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
					const offset = (slideCenter - mid) * 0.06;
					imgEl.style.transform = `translateY(${offset}px)`;
				}
			});

			if (!programmaticRef.current) {
				setActiveIndex(closest);
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollTo = (id: string, index: number) => {
		programmaticRef.current = true;
		setActiveIndex(index);
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

		// Släpp låset efter att scrollen bör vara klar
		setTimeout(() => {
			programmaticRef.current = false;
		}, 800);
	};

	return (
		<div className="font-sans mt-[7dvh] relative w-full flex flex-col md:flex-row-reverse">
			<nav className="sticky top-0 md:top-[7dvh] h-31 gap-1 px-1 md:pr-0 pb-4 md:py-0 z-50 w-full md:w-32 md:h-[93dvh] flex md:flex-col md:justify-center bg-background overflow-x-auto md:overflow-visible scrollbar-none shrink-0">
				<div className="absolute hidden md:block top-[-7dvh] right-0 w-screen h-[7dvh] z-700 bg-background" />
				{PROJECTS.map((p, i) => (
					<ProjectThumbnail
						key={p.id}
						project={p}
						index={i}
						active={activeIndex === i}
						onClick={() => scrollTo(p.id, i)}
					/>
				))}
			</nav>

			<main className="flex-1 min-w-0 flex flex-col gap-1">
				{PROJECTS.map((p, i) => (
					<ProjectSlide
						key={p.id}
						project={p}
						index={i}
						ref={(el) => {
							sectionRefs.current[i] = el;
						}}
						imgRef={(el) => {
							imgRefs.current[i] = el;
						}}
						onScrollTo={() => scrollTo(p.id, i)}
					/>
				))}
			</main>
		</div>
	);
}
