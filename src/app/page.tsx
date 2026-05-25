import Hero from "@/components/Hero";
import Hello from "@/components/Hello";
import Skills from "@/components/Skills";
import ScrollBox from "@/components/ScrollBox";
import Footer from "@/components/Footer";
import ProjectCarousel from "@/components/ProjectCarousel";

export default function Home() {
	return (
		<main className="w-full">
			<Hero />
			<Hello />
			<Skills />
			<h3 className="p-4 pt-44 text-center text-4xl font-bold uppdercase">PROJECTS</h3>
			<ProjectCarousel />
			<ScrollBox />
			<Footer />
		</main>
	);
}
