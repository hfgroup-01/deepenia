import { LanguageSelector } from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Language, Translation } from "@/lib/i18n";
import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface InstagramTerminalScreenProps {
	t: Translation;
	onBack: () => void;
	webhookResponse?: string | null;
	currentLanguage: Language;
	onLanguageChange: (language: Language) => void;
	onComplete?: () => void;
}

export function InstagramTerminalScreen({
	t,
	onBack,
	webhookResponse,
	currentLanguage,
	onLanguageChange,
	onComplete,
}: InstagramTerminalScreenProps) {
	const [visibleLines, setVisibleLines] = useState<string[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showResponse, setShowResponse] = useState(false);

	// Terminal lines traduzidas (memoizado para evitar recriação)
	const terminalLines = useMemo(
		() => [
			`$ ${t.instagramTerminalConnecting}`,
			"> [OK] Conexão estabelecida",
			`> ${t.instagramTerminalProcessing}`,
			`[INFO] ${t.instagramTerminalValidating}`,
			"> Enviando requisição...",
			"[OK] Requisição enviada",
			`> ${t.instagramTerminalFetching}`,
			"[INFO] Processando resposta...",
		],
		[t],
	);

	useEffect(() => {
		if (currentIndex < terminalLines.length) {
			const timeout = setTimeout(
				() => {
					setVisibleLines((prev) => [...prev, terminalLines[currentIndex]]);
					setCurrentIndex((prev) => prev + 1);
				},
				Math.random() * 500 + 300,
			);

			return () => clearTimeout(timeout);
		}
	}, [currentIndex, terminalLines]);

	// Quando receber a resposta do webhook, adicionar ao terminal
	useEffect(() => {
		if (
			webhookResponse &&
			currentIndex >= terminalLines.length &&
			!showResponse
		) {
			const timeout = setTimeout(() => {
				setVisibleLines((prev) => [
					...prev,
					"",
					`[OK] ${t.instagramTerminalComplete}`,
					"",
					"=== DADOS DO PERFIL ===",
					"",
				]);
				setShowResponse(true);

				// Chamar callback de conclusão após 1 segundo
				setTimeout(() => {
					if (onComplete) {
						onComplete();
					}
				}, 1000);
			}, 500);

			return () => clearTimeout(timeout);
		}
	}, [
		webhookResponse,
		currentIndex,
		showResponse,
		t,
		onComplete,
		terminalLines.length,
	]);

	return (
		<div className="max-w-4xl mx-auto">
			<div className="mb-6 flex items-center justify-between">
				<Button
					onClick={onBack}
					variant="ghost"
					className="text-white hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/40 backdrop-blur-sm"
				>
					<ArrowLeft className="mr-2 size-4" />
					{t.backToDashboard}
				</Button>
				<LanguageSelector
					currentLanguage={currentLanguage}
					onLanguageChange={onLanguageChange}
				/>
			</div>

			<Card className="backdrop-blur-xl bg-black border-pink-500/30 overflow-hidden">
				<CardContent className="p-0">
					{/* Terminal Header */}
					<div className="bg-gray-900 border-b border-pink-500/30 px-4 py-2 flex items-center gap-2">
						<div className="flex gap-2">
							<div className="size-3 rounded-full bg-red-500" />
							<div className="size-3 rounded-full bg-yellow-500" />
							<div className="size-3 rounded-full bg-green-500" />
						</div>
						<span className="text-white/70 text-sm ml-2">
							terminal — instagram-spymate
						</span>
					</div>

					{/* Terminal Body */}
					<div className="bg-black p-6 font-mono text-sm min-h-[500px] max-h-[600px] overflow-y-auto">
						{visibleLines.map((line, index) => (
							<div
								key={`terminal-line-${index}-${line.substring(0, 10)}`}
								className="mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300"
							>
								<span
									className={
										line.startsWith("[OK]")
											? "text-green-400"
											: line.startsWith("[INFO]")
												? "text-blue-400"
												: line.startsWith("[ERROR]")
													? "text-red-400"
													: line.startsWith(">")
														? "text-pink-400"
														: "text-white"
									}
								>
									{line}
								</span>
								{index === visibleLines.length - 1 && !showResponse && (
									<span className="inline-block w-2 h-4 bg-pink-400 ml-1 animate-pulse" />
								)}
							</div>
						))}
					</div>

					{/* Status Notice */}
					{!showResponse && currentIndex >= terminalLines.length && (
						<div className="bg-blue-500/10 border-t border-blue-500/30 p-6">
							<h3 className="text-xl font-bold text-blue-400 mb-2 flex items-center gap-2">
								<svg
									className="size-6 animate-spin"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-label="Ícone de carregamento"
								>
									<title>Processando</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
									/>
								</svg>
								{t.consultationProcessing}
							</h3>
							<p className="text-white/90 text-base leading-relaxed">
								Aguardando resposta do servidor...
							</p>
						</div>
					)}
					{showResponse && (
						<div className="bg-green-500/10 border-t border-green-500/30 p-6">
							<h3 className="text-xl font-bold text-green-400 mb-2 flex items-center gap-2">
								<svg
									className="size-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-label="Ícone de sucesso"
								>
									<title>Sucesso</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								{t.consultationComplete}
							</h3>
							<p className="text-white/90 text-base leading-relaxed">
								Redirecionando para visualização do perfil...
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
