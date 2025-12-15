import { LanguageSelector } from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Language, Translation } from "@/lib/i18n";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface ConsultationTerminalScreenProps {
	t: Translation;
	onBack: () => void;
	webhookResponse?: string | null;
	currentLanguage: Language;
	onLanguageChange: (language: Language) => void;
}

const getTerminalLines = (t: Translation): string[] => [
	t.terminal_starting,
	t.terminal_connecting,
	t.terminal_connection_established,
	t.terminal_processing_data,
	t.terminal_validating_info,
	t.terminal_sending_analysis,
	t.terminal_data_received,
	t.terminal_creating_request,
	t.terminal_consultation_registered,
	t.terminal_processing_started,
	t.terminal_process_duration,
	t.terminal_notification_message,
	t.terminal_awaiting_response,
];

export function ConsultationTerminalScreen({
	t,
	onBack,
	webhookResponse,
	currentLanguage,
	onLanguageChange,
}: ConsultationTerminalScreenProps) {
	const [visibleLines, setVisibleLines] = useState<string[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showResponse, setShowResponse] = useState(false);
	const terminalLines = getTerminalLines(t);

	useEffect(() => {
		if (currentIndex < terminalLines.length) {
			const timeout = setTimeout(
				() => {
					setVisibleLines((prev) => [...prev, terminalLines[currentIndex]]);
					setCurrentIndex((prev) => prev + 1);
				},
				Math.random() * 500 + 300,
			); // Random delay between 300-800ms

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
					t.terminal_consultation_ongoing,
					"",
					t.terminal_server_response,
					t.terminal_processing_completed,
					"",
					t.terminal_result_header,
					"",
					...webhookResponse.split("\n"),
					"",
					t.terminal_result_footer,
					"",
					t.terminal_consultation_finished,
				]);
				setShowResponse(true);
			}, 500);

			return () => clearTimeout(timeout);
		}
	}, [webhookResponse, currentIndex, showResponse, t, terminalLines.length]);

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

			<Card className="backdrop-blur-xl bg-black border-green-500/30 overflow-hidden">
				<CardContent className="p-0">
					{/* Terminal Header */}
					<div className="bg-gray-900 border-b border-green-500/30 px-4 py-2 flex items-center gap-2">
						<div className="flex gap-2">
							<div className="size-3 rounded-full bg-red-500" />
							<div className="size-3 rounded-full bg-yellow-500" />
							<div className="size-3 rounded-full bg-green-500" />
						</div>
						<span className="text-white/70 text-sm ml-2">
							terminal — consulta-spymate
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
														? "text-yellow-400"
														: "text-white"
									}
								>
									{line}
								</span>
								{index === visibleLines.length - 1 && (
									<span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse" />
								)}
							</div>
						))}
					</div>

					{/* Important Notice */}
					{!showResponse && !webhookResponse && (
						<div className="bg-yellow-500/10 border-t border-yellow-500/30 p-6">
							<h3 className="text-xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
								<svg
									className="size-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-label="Ícone de aviso"
								>
									<title>Aviso</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
								{t.terminalWarningTitle}
							</h3>
							<p className="text-white/90 text-base leading-relaxed">
								{t.terminalWarningMessage.replace(
									"{days}",
									`${t.terminalWarningDays}`,
								)}
							</p>
						</div>
					)}
					{!showResponse && webhookResponse && (
						<div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-t border-yellow-500/30 p-6">
							<h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
								<svg
									className="size-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-label="Ícone de cronograma"
								>
									<title>Cronograma</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								{t.spyingSchedule}
							</h3>
							<p className="text-white/90 text-base leading-relaxed mb-4">
								{t.spyingScheduleMessage}
							</p>
							<div className="mt-4 p-4 bg-black/30 rounded-lg border border-yellow-500/20">
								<p className="text-lg font-bold text-yellow-400 mb-2">
									{t.resultAvailableIn}
								</p>
								<p className="text-3xl font-bold text-white">
									1 a 5 {t.daysRemaining}
								</p>
							</div>
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
								{t.terminalSuccessTitle}
							</h3>
							<p className="text-white/90 text-base leading-relaxed">
								{t.terminalSuccessMessage}
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
