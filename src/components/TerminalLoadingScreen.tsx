import { Card, CardContent } from "@/components/ui/card";
import type { Translation } from "@/lib/i18n";
import { useEffect, useState } from "react";

interface TerminalLoadingScreenProps {
	t: Translation;
}

const getTerminalLines = (t: Translation): string[] => [
	t.terminal_loading_starting_whatsapp,
	t.terminal_connecting,
	t.terminal_connection_established,
	t.terminal_loading_processing_user_data,
	t.terminal_loading_analyzing_messages,
	t.terminal_loading_verifying_contacts,
	t.terminal_loading_processing_media,
	t.terminal_loading_extracting_profile,
	t.terminal_loading_profile_analyzed,
	t.terminal_loading_querying_database,
	t.terminal_loading_crossing_info,
	t.terminal_loading_generating_report,
	t.terminal_loading_applying_algorithms,
	t.terminal_loading_analysis_ongoing,
	t.terminal_process_duration,
	t.terminal_notification_message,
	t.terminal_loading_awaiting_server,
	t.terminal_loading_standby_mode,
];

export function TerminalLoadingScreen({ t }: TerminalLoadingScreenProps) {
	const [visibleLines, setVisibleLines] = useState<string[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
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

	return (
		<div className="max-w-4xl mx-auto">
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
							terminal — consulta-whatsapp
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
							AVISO IMPORTANTE
						</h3>
						<p className="text-white/90 text-base leading-relaxed">
							A consulta está em andamento e pode levar de{" "}
							<span className="font-bold text-yellow-400">1 a 3 dias</span> para
							ser concluída. Por favor, aguarde. Você poderá visualizar o
							relatório completo assim que o processamento for finalizado.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
