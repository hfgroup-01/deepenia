import { useEffect, useRef } from "react";

export function MatrixRain() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Set canvas size
		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		// Matrix characters - katakana, Latin letters, and numbers
		const chars =
			"アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		const charArray = chars.split("");

		const fontSize = 14;
		const columns = Math.floor(canvas.width / fontSize);
		const drops: number[] = [];

		// Initialize drops
		for (let i = 0; i < columns; i++) {
			drops[i] = Math.floor(Math.random() * -100);
		}

		// Draw function
		const draw = () => {
			// Semi-transparent black background for trail effect
			ctx.fillStyle = "rgba(10, 14, 39, 0.05)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = "#00ff41";
			ctx.font = `${fontSize}px monospace`;

			for (let i = 0; i < drops.length; i++) {
				// Random character
				const text = charArray[Math.floor(Math.random() * charArray.length)];
				const x = i * fontSize;
				const y = drops[i] * fontSize;

				ctx.fillText(text, x, y);

				// Reset drop to top randomly
				if (y > canvas.height && Math.random() > 0.975) {
					drops[i] = 0;
				}

				drops[i]++;
			}
		};

		const interval = setInterval(draw, 33);

		return () => {
			clearInterval(interval);
			window.removeEventListener("resize", resizeCanvas);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 pointer-events-none z-0"
			style={{ opacity: 0.15 }}
		/>
	);
}
