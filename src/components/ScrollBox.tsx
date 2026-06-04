"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent, useTransform } from "framer-motion";

export default function ScrollBox() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [label, setLabel] = useState("0%");

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 600,
		damping: 40,
		restDelta: 0.001,
	});

	const barWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

	// useMotionValueEvent läser värdet utanför render-cykeln
	// och sätter label-state bara när det avrundade värdet faktiskt ändras (max 100 renders totalt)
	useMotionValueEvent(smoothProgress, "change", (v) => {
		const rounded = Math.round(v * 100);
		setLabel(`${rounded}%`);
	});

	return (
		<div
			ref={containerRef}
			className="relative flex place-content-center p-6 w-full bg-background h-[300vh]"
		>
			<div className="w-full relative">
				<div className="h-vh flex justify-center items-center sticky top-0 overflow-hidden">
					<div className="absolute left-0 right-0 flex items-center gap-3">
						<div className="flex-1 h-2 rounded-full overflow-hidden">
							<motion.div
								className="h-full bg-foreground rounded-full"
								style={{ width: barWidth }}
							/>
						</div>
						<span className="text-sm font-mono text-foreground w-12 tabular-nums text-right leading-none">
							{label === "100%" ? "DONE!" : `${label}`}
						</span>
					</div>
					<h3 className="text-5xl font-bold uppercase tracking-widest">ScrollBox</h3>
				</div>
			</div>
		</div>
	);
}
