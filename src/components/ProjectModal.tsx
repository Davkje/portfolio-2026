// "use client";

// import Image from "next/image";
// import { useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Project } from "./ProjectSlide";

// interface ProjectModalProps {
// 	project: Project | null;
// 	onClose: () => void;
// }

// export default function ProjectModal({ project: p, onClose }: ProjectModalProps) {
// 	// Stäng med ESC
// 	useEffect(() => {
// 		const handleKey = (e: KeyboardEvent) => {
// 			if (e.key === "Escape") onClose();
// 		};
// 		window.addEventListener("keydown", handleKey);
// 		return () => window.removeEventListener("keydown", handleKey);
// 	}, [onClose]);

// 	// Lås scroll när modal är öppen
// 	useEffect(() => {
// 		if (p) document.body.style.overflow = "hidden";
// 		else document.body.style.overflow = "";
// 		return () => {
// 			document.body.style.overflow = "";
// 		};
// 	}, [p]);

// 	return (
// 		<AnimatePresence>
// 			{p && (
// 				<motion.div
// 					className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12"
// 					initial={{ opacity: 0 }}
// 					animate={{ opacity: 1 }}
// 					exit={{ opacity: 0 }}
// 					transition={{ duration: 0.25 }}
// 				>
// 					{/* Backdrop */}
// 					<div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

// 					{/* Modal */}
// 					<motion.div
// 						className="relative z-10 w-full max-w-3xl max-h-[90dvh] overflow-y-auto"
// 						style={{ background: p.bg }}
// 						initial={{ opacity: 0, y: 32 }}
// 						animate={{ opacity: 1, y: 0 }}
// 						exit={{ opacity: 0, y: 32 }}
// 						transition={{ duration: 0.3, ease: "easeOut" }}
// 					>
// 						{/* Alt image */}
// 						{p.altImg && (
// 							<div className="relative w-full aspect-video">
// 								<Image src={p.altImg} alt={p.title} fill className="object-cover opacity-80" />
// 							</div>
// 						)}

// 						{/* Text content */}
// 						<div className="p-8 md:p-12 flex flex-col gap-6">
// 							{/* Header */}
// 							<div>
// 								<div className="flex flex-wrap gap-2 mb-3">
// 									{p.tags.map((t) => (
// 										<span
// 											key={t}
// 											className="text-[11px] tracking-widest uppercase px-3 py-1 border select-none"
// 											style={{
// 												color: p.accent,
// 												borderColor: `${p.accent}50`,
// 												backgroundColor: `${p.accent}10`,
// 											}}
// 										>
// 											{t}
// 										</span>
// 									))}
// 								</div>
// 								<h2
// 									className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-none tracking-tight"
// 									style={{ color: p.accent }}
// 								>
// 									{p.title}
// 								</h2>
// 								<p className="text-sm font-mono opacity-50 mt-1" style={{ color: p.accent }}>
// 									{p.year}
// 								</p>
// 							</div>

// 							{/* Description */}
// 							<p
// 								className="text-base md:text-lg leading-relaxed opacity-80"
// 								style={{ color: p.accent }}
// 							>
// 								{p.description}
// 							</p>

// 							{/* Links */}
// 							<div className="flex gap-4">
// 								{p.liveUrl && (
// 									<a
// 										href={p.liveUrl}
// 										target="_blank"
// 										rel="noopener noreferrer"
// 										className="text-sm tracking-widest uppercase px-6 py-3 border transition-all duration-200 hover:opacity-70"
// 										style={{
// 											color: p.accent,
// 											borderColor: p.accent,
// 										}}
// 									>
// 										Live site →
// 									</a>
// 								)}
// 								{p.githubUrl && (
// 									<a
// 										href={p.githubUrl}
// 										target="_blank"
// 										rel="noopener noreferrer"
// 										className="text-sm tracking-widest uppercase px-6 py-3 border transition-all duration-200 hover:opacity-70"
// 										style={{
// 											color: p.accent,
// 											borderColor: `${p.accent}50`,
// 										}}
// 									>
// 										GitHub
// 									</a>
// 								)}
// 							</div>
// 						</div>

// 						<button
// 							onClick={onClose}
// 							className="absolute top-4 right-4 text-sm tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
// 							style={{ color: p.accent }}
// 						>
// 							✕ Close
// 						</button>
// 					</motion.div>
// 				</motion.div>
// 			)}
// 		</AnimatePresence>
// 	);
// }
