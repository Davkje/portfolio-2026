"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent, useTransform } from "framer-motion";
import portfolioData from "../data/portfolio.json";

const SKILLS = [
	...portfolioData.skills.code,
	...portfolioData.skills.toolbox,
	...portfolioData.skills.practices,
];

export default function SkillsScroll() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [visibleCount, setVisibleCount] = useState(0);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 400,
		damping: 40,
		restDelta: 0.001,
	});

	const scrollTextOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

	useMotionValueEvent(smoothProgress, "change", (v) => {
		setVisibleCount(Math.round(v * SKILLS.length));
	});

	return (
		<div ref={containerRef} className="relative w-full h-[300dvh] bg-background mt-0 md:mt-12">
			<div className="sticky top-0 h-dvh md:h-dvh overflow-hidden flex flex-col justify-center">
				<motion.div
					style={{ opacity: scrollTextOpacity }}
					className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none"
				>
					<span className="text-[clamp(44px,15vw,160px)] uppercase tracking-wider text-foreground">
						Scroll...
					</span>
				</motion.div>
				<h2 className="relative tracking-wider leading-normal top-0 left-0 p-4 md:px-6 text-md uppercase text-foreground">
					Skills
					<span className="ml-4 font-mono text-sm text-foreground/60 tabular-nums">
						{visibleCount} / {SKILLS.length}
					</span>
				</h2>
				<div className="flex flex-wrap gap-1 bg-red p-4 md:pt-20 md:p-6 grow">
					{SKILLS.map((skill, i) => (
						<motion.span
							key={skill}
							initial={false}
							animate={
								i < visibleCount ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 8 }
							}
							transition={{
								type: "spring",
								stiffness: 600,
								damping: 25,
								mass: 0.8,
							}}
							className="text-foreground leading-tight text-sm md:text-xl tracking-widest flex place-content-center grow uppercase px-2 md:px-10 py-0 select-none place-items-center"
						>
							{skill}
						</motion.span>
					))}
				</div>
			</div>
		</div>
	);
}

// export default function SkillsScroll() {
// 	const containerRef = useRef<HTMLDivElement>(null);
// 	const [visibleCount, setVisibleCount] = useState(0);

// 	const { scrollYProgress } = useScroll({
// 		target: containerRef,
// 		offset: ["start start", "end end"],
// 	});

// 	const smoothProgress = useSpring(scrollYProgress, {
// 		stiffness: 400,
// 		damping: 40,
// 		restDelta: 0.001,
// 	});

// 	const scrollTextOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

// 	useMotionValueEvent(smoothProgress, "change", (v) => {
// 		setVisibleCount(Math.round(v * SKILLS.length));
// 	});

// 	return (
// 		<div ref={containerRef} className="relative w-full h-[300dvh] bg-background mt-12">
// 			<div className="sticky top-0 h-dvh overflow-hidden flex flex-col justify-center">
// 				{/* Header — z-10, alltid synlig ovanpå */}
// 				<h2 className="absolute top-0 left-0 z-10 p-4 md:px-6 tracking-wider leading-normal uppercase text-foreground">
// 					Skills
// 					<span className="ml-4 font-mono text-sm text-foreground/60 tabular-nums">
// 						{visibleCount} / {SKILLS.length}
// 					</span>
// 				</h2>

// 				{/* "Scroll..." — z-5, tonar bort bakom headern */}
// 				<motion.div
// 					style={{ opacity: scrollTextOpacity }}
// 					className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none"
// 				>
// 					<span className="text-2xl uppercase tracking-wider text-foreground">Scroll...</span>
// 				</motion.div>
