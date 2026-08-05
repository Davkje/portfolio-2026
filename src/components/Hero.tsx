import Image from "next/image";

export default function Hero() {
	return (
		<section className="relative bg-red-texture">
			<Image
				src="/assets/texture1.jpg"
				alt=""
				fill
				priority
				sizes="100vw"
				className="object-cover relative"
				style={{ mixBlendMode: "multiply" }}
			/>

			<div className="relative z-2 flex flex-col justify-between items-center w-full min-h-screen">
				<div className="absolute right-6 top-20 flex items-center gap-4 text-foreground z-100">
					<a
						href="https://www.linkedin.com/in/david-kjellstrand-b6760113a/"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:opacity-50 transition-opacity"
						aria-label="LinkedIn"
					>
						<svg
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
							<rect x="2" y="9" width="4" height="12" />
							<circle cx="4" cy="4" r="2" />
						</svg>
					</a>
					<a
						href="https://github.com/davkje"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:opacity-50 transition-opacity"
						aria-label="GitHub"
					>
						<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
							<path
								fillRule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
							/>
						</svg>
					</a>
					<div className="w-px h-16 bg-foreground" />
				</div>

				<div className="px-6 py-2 place-self-start mt-16 md:mt-0">
					<div className="font-jomolhari uppercase leading-[clamp(80px,17vw,160px)] text-[clamp(80px,18vw,180px)] tracking-wide">
						<p>ITS</p>
						<p>DOWN</p>
						<p>THERE</p>
					</div>
				</div>

				<div className="relative flex flex-col items-center uppercase whitespace-nowrap text-center pb-40 md:pb-24">
					<h1 className="text-[clamp(36px,4vw,64px)]">The Portfolio</h1>
					<div className="flex flex-col items-center gap-1 mt-3 text-[clamp(14px,1.2vw,20px)]">
						<p>By David Kjellstrand</p>
						<p>Front End Developer</p>
						<p>IN STHLM</p>
					</div>
				</div>
			</div>
		</section>
	);
}
