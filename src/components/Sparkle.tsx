"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

const SPARKLES = [
	"/assets/sparkle1.png",
	"/assets/sparkle2.png",
	"/assets/sparkle3.png",
	"/assets/sparkle4.png",
];

const SIZE = 28;
const DURATION = 0.6;
const POP_END = 0.25; // fraction of DURATION spent popping in

function pick<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

interface SparklePoint {
	id: number;
	x: number;
	y: number;
	src: string;
	rotate: number;
	dx: number;
	arc: number;
}

let nextId = 0;

// Walk up the tree summing rotation and multiplying scale from any ancestor
// `transform`s (rotation and uniform scale commute, so this composes fine).
function getAncestorTransform(el: HTMLElement): { angle: number; scale: number } {
	let angle = 0;
	let scale = 1;
	let node = el.parentElement;
	while (node) {
		const t = getComputedStyle(node).transform;
		if (t && t !== "none") {
			const m = new DOMMatrix(t);
			angle += Math.atan2(m.b, m.a);
			scale *= Math.sqrt(m.a * m.a + m.b * m.b);
		}
		node = node.parentElement;
	}
	return { angle, scale };
}

function SparkleParticle({ s }: { s: SparklePoint }) {
	const progress = useMotionValue(0);
	// Parabolic arc: x moves linearly while y rises and falls — a smooth curve, not straight segments.
	const x = useTransform(progress, (p) => s.dx * p);
	const y = useTransform(progress, (p) => -4 * s.arc * p * (1 - p));

	useEffect(() => {
		const controls = animate(progress, 1, { duration: DURATION, ease: "easeOut" });
		return () => controls.stop();
	}, [progress, s.dx, s.arc]);

	return (
		<motion.div
			initial={{ opacity: 1, scale: 0, rotate: s.rotate }}
			animate={{ opacity: [1, 1, 0], scale: [0, 1.4, 1] }}
			transition={{
				duration: DURATION,
				times: [0, POP_END, 1],
				scale: { duration: DURATION, times: [0, POP_END, 1], ease: ["circOut", "easeOut"] },
				opacity: { duration: DURATION, times: [0, POP_END, 1], ease: ["linear", "easeIn"] },
			}}
			className="absolute"
			style={{
				x,
				y,
				left: s.x,
				top: s.y,
				width: SIZE,
				height: SIZE,
				marginLeft: -SIZE / 2,
				marginTop: -SIZE / 2,
			}}
		>
			<Image src={s.src} fill className="object-contain" alt="" />
		</motion.div>
	);
}

/**
 * Drop into any `relative` container to get a `burst(e)` you can call on press,
 * which pops a small hand-drawn sparkle at the pointer position.
 */
export function useSparkles(containerRef: RefObject<HTMLElement | null>) {
	const [sparkles, setSparkles] = useState<SparklePoint[]>([]);

	const burst = useCallback(
		(e: { clientX: number; clientY: number }) => {
			const el = containerRef.current;
			const rect = el?.getBoundingClientRect();
			if (!el || !rect) return;

			// Container may sit inside a rotated and/or hover-scaled ancestor
			// (e.g. `rotate-340 hover:scale-110`), so its on-screen box differs
			// from its local layout box. Sparkles are positioned in local
			// coordinates, so map the click point back into that space by
			// undoing the ancestor rotation/scale around the box's center.
			const { angle, scale } = getAncestorTransform(el);
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;
			const dx = e.clientX - cx;
			const dy = e.clientY - cy;
			const cos = Math.cos(-angle);
			const sin = Math.sin(-angle);
			const localDx = (dx * cos - dy * sin) / scale;
			const localDy = (dx * sin + dy * cos) / scale;

			const id = nextId++;
			const direction = Math.random() < 0.5 ? -1 : 1;
			const spawnOffsetX = direction * 6;
			const spawnOffsetY = -(Math.random() * 6);
			setSparkles((prev) => [
				...prev,
				{
					id,
					x: el.offsetWidth / 2 + localDx + spawnOffsetX,
					y: el.offsetHeight / 2 + localDy + spawnOffsetY,
					src: pick(SPARKLES),
					rotate: Math.random() * 60 - 30,
					dx: direction * (20 + Math.random() * 25),
					arc: 12 + Math.random() * 14,
				},
			]);
			setTimeout(() => {
				setSparkles((prev) => prev.filter((s) => s.id !== id));
			}, DURATION * 1000);
		},
		[containerRef],
	);

	const SparkleLayer = (
		<div className="pointer-events-none absolute inset-0 z-20 overflow-visible">
			<AnimatePresence>
				{sparkles.map((s) => (
					<SparkleParticle key={s.id} s={s} />
				))}
			</AnimatePresence>
		</div>
	);

	return { burst, SparkleLayer };
}
