"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const profilePhoto = "/assets/david.jpeg";

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
	return (
		<section className="relative bg-background w-full min-h-[70vh] place-content-center place-items-center flex flex-col md:flex-row gap-6 md:justify-between p-6 md:p-12">
			<div className="white-space z-300 text-[clamp(20px,6vw,44px)] md:max-w-[50vw] relative flex flex-col gap-2 md:gap-6 items-start justify-center">
				<AnimatedBlock delay={0}>
					<p className="uppercase text-[clamp(24px,4vw,32px)]">Get to know me</p>
				</AnimatedBlock>

				<AnimatedBlock delay={0.1}>
					<p className="font-normal text-[clamp(18px,2.6vw,24px)] leading-[clamp(28px,5vw,36px)]">
						Hi! I&apos;m David, Front End Developer and long time writer/producer. Been coding for
						about 3 years. Educated at Medieinstitutet.
						<br />
						In my music career I&apos;ve honed my creative and technical skills through working on
						multiple projects for artists, labels, commercials and tv.
					</p>
				</AnimatedBlock>
			</div>

			<div
				className="z-100 w-full max-h-100 md:max-h-none md:w-[clamp(280px,40vw,444px)] aspect-3/4 bg-foreground relative md:absolute md:top-[-64] md:right-8"
				// style={{
				// 	width: "clamp(280px, 31.5vw, 544px)",
				// 	height: "clamp(440px, 44.9vw, 776px)",
				// }}
			>
				<Image
					src={profilePhoto}
					alt="David Kjellstrand"
					className="w-full h-full object-cover mix-blend-multiply"
					width={544}
					height={776}
				/>
			</div>
		</section>
	);
}
