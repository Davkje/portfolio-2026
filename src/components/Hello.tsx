"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import TicTacToe from "./TicTacToe";
import Piano from "./Piano";

const profilePhoto = "/assets/davidright.png";

function AnimatedBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
	const ref = useRef(null);
	const isInView = useInView(ref, { margin: "-50px" });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 20 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.8, delay, ease: "easeInOut" }}
		>
			{children}
		</motion.div>
	);
}

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
		<section className="min-h-[60vh] md:min-h-[90vh] mt-60 md:mt-20 mb-20 md:mb-0 relative">
			<div className="relative w-full h-full place-content-center max-w-350 mx-auto place-items-center flex flex-col md:flex-row gap-6 md:justify-between p-4 md:p-12">
				<div className="white-space z-300 text-[clamp(20px,6vw,44px)] md:max-w-[50vw] relative flex flex-col gap-2 md:gap-4 items-start justify-center">
					<h3 className="uppercase text-[clamp(36px,3vw,44px)]">Get to know me</h3>
					<div className="flex flex-col gap-6 font-normal text-[clamp(18px,2.6vw,24px)] leading-[clamp(32px,5vw,36px)]">
						<p>Hi! I&apos;m David, Front End Developer and long time song-writer/producer.</p>
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
				</div>

				{/* <motion.div
					ref={imageRef}
					animate={{ y: inView && isDesktop ? 120 : 0 }}
					transition={{ type: "spring", stiffness: 80, damping: 22 }}
					className="z-100 w-full max-h-100 md:max-h-none md:w-[clamp(280px,40vw,444px)] aspect-3/4 bg-foreground relative md:absolute md:right-12 md:top-[-140] lg:top-[-200] xl:top-[-230]"
				>
					<Image
						src={profilePhoto}
						alt="David Kjellstrand"
						className="w-full h-full object-cover mix-blend-multiply"
						width={544}
						height={776}
					/>
				</motion.div> */}
				<motion.div
					ref={imageRef}
					animate={{ y: inView && isDesktop ? 170 : 0 }}
					transition={{ type: "spring", stiffness: 80, damping: 22 }}
					className="md:max-h-none md:w-[clamp(280px,40vw,550px)] absolute top-[-360] right-6 md:top-[-140] md:right-12 lg:top-[-200] lg:right-10 xl:top-[-300] xl:right-10"
				>
					<Image
						src={profilePhoto}
						alt="David Kjellstrand"
						className="w-full h-full max-h-80 md:max-h-none object-contain md:object-cover"
						priority
						width={544}
						height={776}
					/>
					{/* <span className="uppercase absolute top-35 -left-12 whitespace-nowrap rotate-15">
						this is me
					</span> */}
				</motion.div>
				<div className="max-w-min z-90 absolute rotate-0 left-10 -bottom-30 md:left-20 md:-bottom-40 md:p-6 scale-100 hover:scale-110 transition-all duration-300 ease-out">
					<TicTacToe />
				</div>
				<div className="z-90 absolute rotate-6 right-4 -bottom-20 md:left-100 md:right-auto md:-bottom-62 md:p-6 scale-100 hover:scale-105 transition-all duration-300 ease-out">
					<Piano />
				</div>
			</div>
		</section>
	);
}
