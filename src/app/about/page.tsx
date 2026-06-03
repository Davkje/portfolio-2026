import Link from "next/link";
import portfolioData from "@/data/portfolio.json";

const { about } = portfolioData.personal;

export default function AboutPage() {
	return (
		<main className="bg-background min-h-screen text-foreground">
			<div className="max-w-3xl mx-auto px-6 py-24">
				<h1 className="font-jomolhari text-[clamp(60px,12vw,120px)] leading-none mb-16 uppercase">
					About me
				</h1>

				<div className="flex flex-col">
					<section className="border-t border-foreground/20 py-10">
						<span className="text-lg tracking-widest uppercase text-foreground/50 block mb-4">
							Who?
						</span>
						<p className="text-lg leading-relaxed">{about.who}</p>
					</section>

					<section className="border-t border-foreground/20 py-10">
						<span className="text-lg tracking-widest uppercase text-foreground/50 block mb-4">
							What?
						</span>
						<p className="text-lg leading-relaxed">{about.what}</p>
					</section>

					<section className="border-t border-foreground/20 py-10">
						<span className="text-lg tracking-widest uppercase text-foreground/50 block mb-4">
							Where?
						</span>
						<p className="text-lg leading-relaxed">{about.where}</p>
					</section>

					<section className="border-t border-foreground/20 py-10">
						<span className="text-lg tracking-widest uppercase text-foreground/50 block mb-4">
							Why...
						</span>
						<p className="text-lg leading-relaxed">
							... don&apos;t you check out some of my work in my{" "}
							<Link
								href="/"
								className="underline underline-offset-4 hover:opacity-60 transition-opacity"
							>
								portfolio
							</Link>{" "}
							or if you already have, listen to some music I&apos;ve released over the years? Have a
							good one!
						</p>
					</section>

					<section className="border-t border-foreground/20 py-10">
						<span className="text-lg tracking-widest uppercase text-foreground/50 block mb-6">
							Music
						</span>
						<iframe
							src="https://open.spotify.com/embed/playlist/36iVvde48wbmv5WinHK1Y6?utm_source=generator&theme=0"
							width="100%"
							height="152"
							allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
							loading="lazy"
							style={{ borderRadius: "12px", border: "none" }}
						/>
					</section>
				</div>
			</div>
		</main>
	);
}
