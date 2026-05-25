"use client";

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
			className={`
        cursor-pointer place-self-end relative flex-none overflow-hidden transition-all duration-500 ease-in-out group
        h-13 min-w-20 
        ${active ? "grow opacity-100" : " opacity-60"}  
        md:w-full md:min-h-30 md:min-w-2
        ${active ? "md:h-[100px]" : "md:h-[60px]"}
      `}
			style={{
				background: p.bg,
				// outline: active ? `2px solid ${p.accent}` : "2px solid transparent",
				outlineOffset: 2,
			}}
		>
			{/* <Image
        src={p.img}
        alt={p.title}
        fill
        className="object-cover opacity-20 group-hover:opacity-40 transition-opacity"
      /> */}

			<div className="relative z-10 h-full flex flex-col justify-between p-2 text-left">
				<span className="text-[9px] font-mono uppercase" style={{ color: p.accent }}>
					{String(i + 1).padStart(2, "0")}
				</span>
				<span
					className="text-[10px] font-bold truncate hidden md:block"
					style={{ color: p.accent }}
				>
					{p.title}
				</span>
			</div>
		</button>
	);
}
