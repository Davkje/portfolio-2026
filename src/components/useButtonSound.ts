"use client";

import { useEffect, useRef } from "react";
import { Howl } from "howler";

const BUTTON_SOUNDS = [
	"/assets/sounds/pencil_1.wav",
	"/assets/sounds/pencil_2.wav",
	"/assets/sounds/pencil_3.wav",
	"/assets/sounds/pencil_4.wav",
	"/assets/sounds/pencil_5.wav",
	"/assets/sounds/pencil_6.wav",
];

const BASE_VOLUME = 0.5;

function pick<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Drop into any button to get a `playClick()` that plays a random
 * button-press sound. Reusable anywhere a UI click sound is wanted.
 * Pass a `volumeScale` (0-1) to play it quieter, e.g. for an opponent's move.
 */
export function useButtonSound() {
	const sounds = useRef<Howl[]>([]);

	useEffect(() => {
		sounds.current = BUTTON_SOUNDS.map(
			(src) => new Howl({ src: [src], preload: true, volume: BASE_VOLUME }),
		);
	}, []);

	const playClick = (volumeScale = 1) => {
		if (sounds.current.length === 0) return;
		const howl = pick(sounds.current);
		const id = howl.play();
		howl.volume(BASE_VOLUME * volumeScale, id);
	};

	return playClick;
}
