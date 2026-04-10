"use client";

import Image from "next/image";
import { Project } from "./ProjectSlide";

interface ThumbnailProps {
	project: Project;
	index: number;
	active: boolean;
	onClick: () => void;
}

export default function ProjectThumbnail({
	project: p,
	index: i,
	active,
	onClick,
}: ThumbnailProps) {
	return (
		<button
			onClick={onClick}
			className="relative flex-none md:w-full overflow-hidden transition-all duration-500 ease-in-out group"
			style={{
				// Mobil-baserade storlekar som standard
				width: active ? "120px" : "60px",
				height: "48px",
				background: p.bg,
				outline: active ? `2px solid ${p.accent}` : "2px solid transparent",
				outlineOffset: 2,
				opacity: active ? 1 : 0.6,
			}}
		>
			{/* Vi använder en CSS-variabel eller Tailwind för att styra höjden på desktop */}
			<style jsx>{`
				@media (min-width: 768px) {
					button {
						width: 100% !important;
						height: ${active ? "100px" : "60px"} !important;
					}
				}
			`}</style>

			<Image
				src={p.img}
				alt={p.title}
				fill
				className="object-cover opacity-20 group-hover:opacity-40 transition-opacity"
			/>

			<div className="relative z-10 h-full flex flex-col justify-between p-2 text-left">
				<span className="text-[9px] font-mono uppercase" style={{ color: p.accent }}>
					{String(i + 1).padStart(2, "0")}
				</span>
				<span className="text-[10px] font-bold truncate" style={{ color: p.accent }}>
					{p.title}
				</span>
			</div>
		</button>
	);
}
