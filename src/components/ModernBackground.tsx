export function ModernBackground() {
	return (
		<div className="fixed inset-0 -z-10 overflow-hidden">
			{/* Black base background */}
			<div className="absolute inset-0 bg-black" />

			{/* Animated particle field effect */}
			<div className="absolute inset-0">
				{/* Floating gradient orbs */}
				<div className="absolute top-20 left-10 size-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
				<div className="absolute top-40 right-20 size-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
				<div className="absolute bottom-20 left-40 size-96 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
				<div className="absolute bottom-40 right-10 size-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-3000" />

				{/* Additional smaller orbs for depth */}
				<div className="absolute top-1/2 left-1/4 size-64 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-1000" />
				<div className="absolute top-1/3 right-1/3 size-72 bg-violet-500/10 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-5000" />
			</div>

			{/* Grid overlay */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

			{/* Scanline effect */}
			<div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[size:100%_4px] pointer-events-none" />
		</div>
	);
}
