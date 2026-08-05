export default function Footer() {
	return (
		<div className="text-center flex flex-col justify-center items-center w-full bg-red min-h-[40vh] p-4 gap-4">
			<h3 className="text-6xl uppercase">Lets Talk!</h3>
			<div className="flex flex-col justify-center items-center gap-6">
				<div className="flex gap-6">
					<a
						href="https://www.linkedin.com/in/david-kjellstrand-b6760113a/"
						target="_blank"
						rel="noopener noreferrer"
					>
						LinkedIn
					</a>
					<a href="https://github.com/Davkje" target="_blank" rel="noopener noreferrer">
						Github
					</a>
					<a href="assets/david-kjellstrand-cv.pdf">Download CV</a>
				</div>
				<div className="grid gap-2">
					<p>+46 (0) 73 529 2002</p>
					<a href="mailto:david.kjellstrand@gmail.com">david.kjellstrand@gmail.com</a>
				</div>
				<p className="opacity-30">
					This website was created fully by me, David. I used Next.js as my framwork but other than
					that its basic html and css.
				</p>
			</div>
		</div>
	);
}
