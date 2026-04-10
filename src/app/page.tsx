import Hero from "@/components/Hero";
import Hello from "@/components/Hello";
import Skills from "@/components/Skills";
import ProjectCard from "@/components/ProjectCard";
import ScrollBox from "@/components/ScrollBox";
import Footer from "@/components/Footer";
import ProjectCarousel from "@/components/ProjectCarousel";

const PROJECTS = [
	{
		title: "DINO GAME",
		description: "A small game you might recognize where you control a dinosaur...",
		previewSrc: "/assets/dino.png",
		codeHref: "https://github.com/...",
		demoHref: "https://github.com/...",
		tags: ["TypeScript", "Vue", "HTML", "SCSS", "Game"],
		bg: "red",
	},
	{
		title: "TIC TAC TOE",
		description: "A simple yet fleshed out game of Tic Tac Toe! Built with...",
		previewSrc: "/assets/tictactoe.png",
		codeHref: "https://github.com/...",
		demoHref: "https://github.com/...",
		tags: ["TypeScript", "HTML", "SCSS", "Game", "Audio"],
		bg: "dark",
	},
] as const;

export default function Home() {
	return (
		<main className="w-full">
			<Hero />
			<Hello />
			<Skills />
			<ProjectCarousel />
			<ScrollBox />

			<Footer />
		</main>
	);
}
