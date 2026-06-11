"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSparkles } from "./Sparkle";

const LINES = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const CROSSES = [
	"/assets/tictactoe/cross1.png",
	"/assets/tictactoe/cross2.png",
	"/assets/tictactoe/cross3.png",
];
const CIRCLES = [
	"/assets/tictactoe/circle1.png",
	"/assets/tictactoe/circle2.png",
	"/assets/tictactoe/circle3.png",
];

function pick<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

function getWinner(board: (string | null)[]) {
	for (const [a, b, c] of LINES) {
		if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
	}
	return null;
}

function getWinnerLine(board: (string | null)[]): number[] | null {
	for (const [a, b, c] of LINES) {
		if (board[a] && board[a] === board[b] && board[a] === board[c]) return [a, b, c];
	}
	return null;
}

function getComputerMove(board: (string | null)[]): number {
	for (const [a, b, c] of LINES) {
		const vals = [board[a], board[b], board[c]];
		if (vals.filter((v) => v === "O").length === 2 && vals.includes(null))
			return [a, b, c][vals.indexOf(null)];
	}
	for (const [a, b, c] of LINES) {
		const vals = [board[a], board[b], board[c]];
		if (vals.filter((v) => v === "X").length === 2 && vals.includes(null))
			return [a, b, c][vals.indexOf(null)];
	}
	if (!board[4]) return 4;
	const empty = board.map((v, i) => (v === null ? i : -1)).filter((i) => i !== -1);
	return empty[Math.floor(Math.random() * empty.length)];
}

export default function TicTacToe() {
	const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
	const [marks, setMarks] = useState<(string | null)[]>(Array(9).fill(null));
	const [rotations, setRotations] = useState<number[]>(Array(9).fill(0));
	const [gameKey, setGameKey] = useState(0);
	const [playerTurn, setPlayerTurn] = useState(true);
	const [bouncing, setBouncing] = useState(false);
	const [exiting, setExiting] = useState(false);

	const gridRef = useRef<HTMLDivElement>(null);
	const { burst, SparkleLayer } = useSparkles(gridRef);

	const winner = getWinner(board);
	const isDraw = !winner && board.every(Boolean);
	const done = !!(winner || isDraw);
	const winnerLine = getWinnerLine(board);

	// Computer move
	useEffect(() => {
		if (playerTurn || done) return;
		const id = setTimeout(() => {
			const move = getComputerMove(board);
			setBoard((prev) => {
				const n = [...prev];
				n[move] = "O";
				return n;
			});
			setMarks((prev) => {
				const n = [...prev];
				n[move] = pick(CIRCLES);
				return n;
			});
			setRotations((prev) => {
				const n = [...prev];
				n[move] = Math.random() * 22 - 11;
				return n;
			});
			setPlayerTurn(true);
		}, 350);
		return () => clearTimeout(id);
	}, [playerTurn, done, board]);

	// Game over — bounce winners → fade all out → reset
	useEffect(() => {
		if (!done) return;
		const bounceId = setTimeout(() => setBouncing(true), 100);
		const exitId = setTimeout(() => setExiting(true), 700);
		const resetId = setTimeout(() => {
			setBoard(Array(9).fill(null));
			setMarks(Array(9).fill(null));
			setRotations(Array(9).fill(0));
			setBouncing(false);
			setExiting(false);
			setGameKey((k) => k + 1);
			setPlayerTurn(true);
		}, 1100);
		return () => {
			clearTimeout(bounceId);
			clearTimeout(exitId);
			clearTimeout(resetId);
		};
	}, [done]);

	const handleClick = (i: number, e: React.MouseEvent) => {
		if (!playerTurn || board[i] || done) return;
		burst(e);
		setBoard((prev) => {
			const n = [...prev];
			n[i] = "X";
			return n;
		});
		setMarks((prev) => {
			const n = [...prev];
			n[i] = pick(CROSSES);
			return n;
		});
		setRotations((prev) => {
			const n = [...prev];
			n[i] = Math.random() * 22 - 11;
			return n;
		});
		setPlayerTurn(false);
	};

	return (
		<div className="flex flex-col items-center gap-1.5 select-none">
			<div
				ref={gridRef}
				className="relative"
				style={{
					width: 150,
					height: 150,
					backgroundImage: "url('/assets/tictactoe/grid.png')",
					backgroundSize: "contain",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
				}}
			>
				<div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
					{board.map((_, i) => (
						<button
							key={i}
							onClick={(e) => handleClick(i, e)}
							className="flex items-center justify-center cursor-pointer"
						>
							{marks[i] && (
								<motion.div
									key={`${gameKey}-${i}`}
									initial={{ scale: 0, rotate: rotations[i] }}
									animate={
										exiting
											? { opacity: 0, scale: 0.7 }
											: bouncing && winnerLine?.includes(i)
												? { scale: [1, 1.45, 0.8, 1.2, 1], rotate: rotations[i], opacity: 1 }
												: { scale: 1, rotate: rotations[i], opacity: 1 }
									}
									transition={
										exiting
											? { duration: 0.3, ease: "easeIn" }
											: bouncing && winnerLine?.includes(i)
												? { duration: 0.45, ease: "easeInOut" }
												: { type: "spring", stiffness: 480, damping: 18 }
									}
									className="relative w-4/5 h-4/5"
								>
									<Image src={marks[i]} fill className="object-contain p-1" alt="" />
								</motion.div>
							)}
						</button>
					))}
				</div>
				{SparkleLayer}
			</div>
		</div>
	);
}
