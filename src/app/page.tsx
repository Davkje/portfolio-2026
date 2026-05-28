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
			<ProjectCarousel />
			<ScrollBox />
			<Footer />
		</main>
	);
}
