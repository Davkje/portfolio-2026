"use client";

import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { useSparkles } from "./Sparkle";
import Image from "next/image";

// Low C → chromatic scale → High C (13 notes, full octave)
const NOTES = [
	{ note: "Clow", file: "LOW_C.wav", black: false },
	{ note: "C#", file: "C#.wav", black: true },
	{ note: "D", file: "D.wav", black: false },
	{ note: "D#", file: "D#.wav", black: true },
	{ note: "E", file: "E.wav", black: false },
	{ note: "F", file: "F.wav", black: false },
	{ note: "F#", file: "F#.wav", black: true },
	{ note: "G", file: "G.wav", black: false },
	{ note: "G#", file: "G#.wav", black: true },
	{ note: "A", file: "A.wav", black: false },
	{ note: "A#", file: "A#.wav", black: true },
	{ note: "B", file: "B.wav", black: false },
	{ note: "Chigh", file: "C.wav", black: false },
] as const;

const WHITE_KEY_IMAGES = [
	"/assets/piano/whitekey1.png",
	"/assets/piano/whitekey2.png",
	"/assets/piano/whitekey3.png",
];
const BLACK_KEY_IMAGES = ["/assets/piano/blackkey1.png", "/assets/piano/blackkey2.png"];

// Deterministic image per key (cycled by index) — avoids randomness during render,
// which would cause a server/client hydration mismatch.
const KEY_IMAGES: Record<string, string> = (() => {
	let whiteIdx = 0;
	let blackIdx = 0;
	const map: Record<string, string> = {};
	NOTES.forEach(({ note, black }) => {
		if (black) {
			map[note] = BLACK_KEY_IMAGES[blackIdx % BLACK_KEY_IMAGES.length];
			blackIdx++;
		} else {
			map[note] = WHITE_KEY_IMAGES[whiteIdx % WHITE_KEY_IMAGES.length];
			whiteIdx++;
		}
	});
	return map;
})();

const KEY_MAP: Record<string, string> = {
	a: "Clow",
	w: "C#",
	s: "D",
	e: "D#",
	d: "E",
	f: "F",
	t: "F#",
	g: "G",
	y: "G#",
	h: "A",
	u: "A#",
	j: "B",
	k: "Chigh",
};

export default function Piano() {
	const sounds = useRef<Record<string, Howl>>({});
	const pressed = useRef<Set<string>>(new Set());
	const isPointerDown = useRef(false);
	const lastNote = useRef<string | null>(null);
	const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
	const containerRef = useRef<HTMLDivElement>(null);
	const { burst, SparkleLayer } = useSparkles(containerRef);

	const activate = (note: string) => {
		setActiveNotes((prev) => new Set(prev).add(note));
	};

	const deactivate = (note: string) => {
		setActiveNotes((prev) => {
			const next = new Set(prev);
			next.delete(note);
			return next;
		});
	};

	useEffect(() => {
		NOTES.forEach(({ note, file }) => {
			sounds.current[note] = new Howl({
				src: [`/assets/sounds/${file.replace(/#/g, "%23")}`],
				preload: true,
				volume: 0.7,
			});
		});

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.repeat) return;
			const note = KEY_MAP[e.key.toLowerCase()];
			if (note && !pressed.current.has(note)) {
				pressed.current.add(note);
				sounds.current[note]?.play();
				activate(note);
			}
		};
		const onKeyUp = (e: KeyboardEvent) => {
			const note = KEY_MAP[e.key.toLowerCase()];
			if (note) {
				pressed.current.delete(note);
				deactivate(note);
			}
		};

		const onPointerUp = () => {
			isPointerDown.current = false;
			if (lastNote.current) deactivate(lastNote.current);
			lastNote.current = null;
		};

		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("keyup", onKeyUp);
		window.addEventListener("pointerup", onPointerUp);
		window.addEventListener("pointercancel", onPointerUp);
		return () => {
			window.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("keyup", onKeyUp);
			window.removeEventListener("pointerup", onPointerUp);
			window.removeEventListener("pointercancel", onPointerUp);
		};
	}, []);

	const play = (note: string) => {
		if (note === lastNote.current) return;
		if (lastNote.current) deactivate(lastNote.current);
		lastNote.current = note;
		activate(note);
		sounds.current[note]?.play();
	};

	const handlePointerDown = (note: string, e: React.PointerEvent) => {
		isPointerDown.current = true;
		play(note);
		burst(e);
	};

	const handlePointerMove = (e: React.PointerEvent) => {
		if (!isPointerDown.current) return;
		const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
		const note = target?.dataset.note;
		if (note && note !== lastNote.current) {
			play(note);
			burst(e);
		}
	};

	const WHITE_KEYS = NOTES.filter((n) => !n.black);
	const keyWidth = 100 / WHITE_KEYS.length;

	return (
		<div className="inline-flex flex-col items-center select-none">
			<div
				ref={containerRef}
				className="relative touch-none"
				style={{ width: 240, height: 110 }}
				onPointerMove={handlePointerMove}
			>
				{/* White keys */}
				<div className="absolute gap-0.5 inset-0 flex">
					{WHITE_KEYS.map(({ note }) => (
						<button
							key={note}
							data-note={note}
							onPointerDown={(e) => handlePointerDown(note, e)}
							className={`flex-1 transition-transform duration-75 cursor-pointer ${activeNotes.has(note) ? "scale-98" : "scale-100"}`}
							style={{
								backgroundImage: `url('${KEY_IMAGES[note]}')`,
								backgroundSize: "100% 100%",
								backgroundRepeat: "no-repeat",
							}}
						/>
					))}
				</div>

				{/* Black keys */}
				<div className="absolute inset-0 pointer-events-none">
					{NOTES.map(({ note, black }, i) => {
						if (!black) return null;

						// count white keys before this index to get x position
						const whitesBefore = NOTES.slice(0, i).filter((n) => !n.black).length;
						const left = whitesBefore * keyWidth - keyWidth * 0.3;

						return (
							<button
								key={note}
								data-note={note}
								onPointerDown={(e) => handlePointerDown(note, e)}
								className={`absolute bg-blend-darken top-0 pointer-events-auto transition-transform duration-75 cursor-pointer z-10 ${activeNotes.has(note) ? "scale-98" : "scale-100"}`}
								style={{
									left: `${left}%`,
									width: `${keyWidth * 0.6}%`,
									height: "62%",
									backgroundImage: `url('${KEY_IMAGES[note]}')`,
									backgroundSize: "100% 100%",
									backgroundRepeat: "no-repeat",
								}}
							/>
						);
					})}
				</div>
				{SparkleLayer}
			</div>
		</div>
	);
}
