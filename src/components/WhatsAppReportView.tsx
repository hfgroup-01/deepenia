import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Translation } from "@/lib/i18n";
import { AlertTriangle, CheckCircle2, FileText, Trash2 } from "lucide-react";

interface WhatsAppReportViewProps {
	reportData: string;
	onDelete: () => void;
	t: Translation;
}

export function WhatsAppReportView({
	reportData,
	onDelete,
	t,
}: WhatsAppReportViewProps) {
	let parsedReport: Record<string, unknown> = {};
	try {
		parsedReport = JSON.parse(reportData);
	} catch (e) {
		console.error("Failed to parse report data:", e);
	}

	return (
		<div className="max-w-6xl mx-auto">
			<Card className="backdrop-blur-xl bg-white/10 border-green-500/30">
				<CardHeader>
					<div className="flex items-start justify-between">
						<div className="space-y-2">
							<CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent flex items-center gap-2">
								<CheckCircle2 className="size-8 text-green-400" />
								Relatorio Completo - WhatsApp
							</CardTitle>
							<CardDescription className="text-white/70 text-lg">
								Sua consulta foi concluida com sucesso
							</CardDescription>
						</div>
						<Button
							onClick={onDelete}
							variant="destructive"
							className="bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 hover:text-red-300"
						>
							<Trash2 className="mr-2 size-4" />
							Excluir Relatorio
						</Button>
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
						<div className="flex items-start gap-4">
							<CheckCircle2 className="size-6 text-green-400 shrink-0 mt-1" />
							<div>
								<h3 className="text-xl font-semibold text-green-400 mb-2">
									Processamento Concluido
								</h3>
								<p className="text-white/80">
									O relatorio foi gerado com sucesso. Todas as informacoes
									solicitadas foram analisadas e estao disponiveis abaixo.
								</p>
							</div>
						</div>
					</div>

					<Card className="bg-black/50 border-white/20">
						<CardHeader>
							<CardTitle className="text-2xl text-white flex items-center gap-2">
								<FileText className="size-6" />
								Dados do Relatorio
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ScrollArea className="h-[600px] pr-4">
								<div className="space-y-4">
									{Object.keys(parsedReport).length > 0 ? (
										<div className="space-y-4">
											{Object.entries(parsedReport).map(([key, value]) => (
												<div
													key={key}
													className="bg-white/5 rounded-lg p-4 border border-white/10"
												>
													<h4 className="text-sm font-semibold text-green-400 uppercase mb-2">
														{key.replace(/_/g, " ")}
													</h4>
													<div className="text-white/90">
														{typeof value === "object" ? (
															<pre className="whitespace-pre-wrap font-mono text-sm overflow-x-auto">
																{JSON.stringify(value, null, 2)}
															</pre>
														) : (
															<p>{String(value)}</p>
														)}
													</div>
												</div>
											))}
										</div>
									) : (
										<div className="bg-white/5 rounded-lg p-8 border border-white/10 text-center">
											<p className="text-white/70 text-lg">
												Dados do relatorio:
											</p>
											<pre className="mt-4 text-white/90 whitespace-pre-wrap font-mono text-sm text-left">
												{reportData}
											</pre>
										</div>
									)}
								</div>
							</ScrollArea>
						</CardContent>
					</Card>

					<div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
						<div className="flex items-start gap-4">
							<AlertTriangle className="size-6 text-yellow-400 shrink-0 mt-1" />
							<div>
								<h3 className="text-xl font-semibold text-yellow-400 mb-2">
									Importante
								</h3>
								<p className="text-white/80">
									Ao excluir este relatorio, voce precisara aguardar{" "}
									<span className="font-bold text-yellow-400">3 dias</span>{" "}
									antes de poder solicitar uma nova consulta. Certifique-se de
									salvar as informacoes necessarias antes de excluir.
								</p>
							</div>
						</div>
					</div>

					<div className="flex gap-4 justify-end">
						<Button
							onClick={onDelete}
							variant="outline"
							className="bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
						>
							<Trash2 className="mr-2 size-4" />
							Excluir Relatorio
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
