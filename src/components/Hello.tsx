import Image from "next/image";

const profilePhoto = "/assets/david.jpeg";
const blob1 = "/assets/blob1.svg";
const blob2 = "/assets/blob1.svg";
const blob3 = "/assets/blob1.svg";

const items = [
	{ icon: blob1, text: "HELLO, I'm David!", rotate: false },
	{ icon: blob2, text: "Front End Developer.", rotate: true },
	{ icon: blob3, text: "long time Writer/Producer.", rotate: true },
	{ icon: blob1, text: "looking for NEW CHALLENGES.", rotate: true },
];

export default function Hello() {
	return (
		<section className="relative bg-background w-full min-h-[70vh] place-content-center place-items-center flex flex-col sm:flex-row gap-12 justify-between p-[clamp(16px,10vw,32px)]">
			{/* Text content */}
			<div className="relative flex flex-col gap-11 items-start justify-center">
				{items.map(({ icon, text, rotate }) => (
					<div key={text} className="flex items-center gap-4">
						<Image
							src={icon}
							alt=""
							width={20}
							height={20}
							aria-hidden
							className="shrink-0"
							style={{
								width: "clamp(20px, 1.65vw, 28px)",
								height: "clamp(20px, 1.65vw, 28px)",
								transform: rotate ? "rotate(48.4deg)" : undefined,
							}}
						/>
						<p
							className="uppercase whitespace-nowrap leading-none"
							style={{ fontSize: "clamp(16px, 2.1vw, 36px)" }}
						>
							{text}
						</p>
					</div>
				))}
			</div>

			{/* Profile photo */}

			<div
				// className="absolute -top-20 right-[3vw] z-100 bg-foreground"
				className="z-100 bg-foreground"
				style={{
					width: "clamp(280px, 31.5vw, 544px)",
					height: "clamp(440px, 44.9vw, 776px)",
				}}
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
