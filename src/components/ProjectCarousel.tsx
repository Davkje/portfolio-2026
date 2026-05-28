"use client";

import { useEffect, useRef, useState } from "react";
import ProjectSlide, { Project } from "./ProjectSlide";
import ProjectThumbnail from "./ProjectThumbnail";
import portfolioData from "../data/portfolio.json";
import { RiListCheck } from "@remixicon/react";

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
		<>
			<h2 className="text-[clamp(36px,3vw,44px)] text-left tracking-[0.02em] leading-[0.71] md:leading-normal uppercase px-4 md:pl-24 md:pb-2 pt-16">
				Projects
			</h2>
			<div className="relative w-full flex flex-col-reverse md:gap-0 md:flex-row-reverse">
				<main className="flex-1 min-w-0 flex flex-col gap-0 md:gap-16">
					{PROJECTS.map((p, i) => (
						<ProjectSlide
							key={p.id}
							project={p}
							active={activeIndex === i}
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

				<nav className="sticky top-0 h-24 gap-4 pb-1 px-4 md:px-2 z-50 w-full md:w-24 md:h-dvh flex md:flex-col md:justify-start overflow-x-auto md:overflow-visible scrollbar-none shrink-0 bg-background">
					<RiListCheck className="my-2 mb-4 hidden md:block" />

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
			</div>
		</>
	);
}
