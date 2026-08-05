"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Piano from "./Piano";
import TicTacToe from "./TicTacToe";

const profilePhoto = "/assets/davidright.png";

export default function Hello() {
	const imageRef = useRef<HTMLDivElement>(null);

	const [isDesktop, setIsDesktop] = useState(
		() => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches,
	);

	useEffect(() => {
		const mq = window.matchMedia("(min-width: 768px)");
		const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	const inView = useInView(imageRef, { amount: 0.6, once: true });

	return (
		<section className="min-h-[60vh] my-60 mb-10 md:my-30 md:mb-0 xl:my-20 relative">
			<div className="relative w-full h-full place-content-center max-w-350 mx-auto place-items-center flex flex-col md:flex-row gap-6 md:justify-between p-4 md:p-12">
				<div className="white-space z-300 text-[clamp(20px,6vw,44px)] md:max-w-[50vw] relative flex flex-col gap-2 md:gap-4 items-start justify-center">
					<h3 className="uppercase text-[clamp(36px,3vw,44px)] font-medium">Get to know me</h3>
					<div className="flex flex-col gap-6 font-normal max-w-175 text-[clamp(18px,2.6vw,24px)] leading-[clamp(32px,5vw,36px)]">
						<p>
							Hi! I&apos;m David,{" "}
							<span className="font-bold tracking-wide">Front End Developer</span> and long time
							song-writer/producer.
						</p>
						<p>
							Educated at Medieinstitutet. Currently working for{" "}
							<a
								href="https://afonso.se/"
								className="underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								Afonso
							</a>
						</p>
						<p>
							9+ years in the music business working on multiple projects for artists, labels,
							commercials and tv.
						</p>
						<p>Love games, art, music, sauerkraut and everything nerdy!</p>
					</div>
					<div className="w-[calc(100vw-32px)] md:w-full flex justify-center md:justify-between sm:mt-10">
						<div className="w-min mt-4 md:mt-8 -rotate-10 scale-80 md:scale-100">
							<Piano />
						</div>
						<div className="max-w-min max-h-min z-90 rotate-10 scale-75 md:scale-100 md:hover:scale-110 transition-all duration-300 ease-out">
							<TicTacToe />
						</div>
					</div>
				</div>
				<motion.div
					ref={imageRef}
					animate={{ y: inView && isDesktop ? 170 : 0 }}
					transition={{ type: "spring", stiffness: 80, damping: 22 }}
					className="md:max-h-none md:w-[clamp(280px,40vw,550px)] absolute top-[-360] right-6 md:top-[-140] md:right-12 lg:top-[-200] lg:right-10 xl:top-[-300] xl:-right-4"
				>
					<Image
						src={profilePhoto}
						alt="David Kjellstrand"
						className="w-full h-full max-h-80 md:max-h-200 object-contain md:object-cover"
						priority
						width={544}
						height={776}
					/>
				</motion.div>
			</div>
		</section>
	);
}
