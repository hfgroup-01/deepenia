import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Translation } from "@/lib/i18n";
import { ArrowLeft, FileText, Trash2 } from "lucide-react";
import { useState } from "react";

interface ReportViewScreenProps {
	onBack: () => void;
	onDelete: () => void;
	t: Translation;
	reportData: string;
	consultationData: {
		name: string;
		phone: string;
		startDate: string;
	};
}

export function ReportViewScreen({
	onBack,
	onDelete,
	t,
	reportData,
	consultationData,
}: ReportViewScreenProps) {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	// Parse JSON report data
	let parsedReport: Record<string, unknown> = {};
	try {
		parsedReport = JSON.parse(reportData);
	} catch (error) {
		console.error("Failed to parse report data:", error);
		parsedReport = { error: "Relatório inválido", rawData: reportData };
	}

	const handleDeleteConfirm = () => {
		setShowDeleteDialog(false);
		onDelete();
	};

	return (
		<div className="max-w-5xl mx-auto">
			<div className="flex items-center justify-between mb-6">
				<Button
					onClick={onBack}
					variant="ghost"
					className="text-white hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/40 backdrop-blur-sm"
				>
					<ArrowLeft className="mr-2 size-4" />
					{t.backToDashboard}
				</Button>

				<Button
					onClick={() => setShowDeleteDialog(true)}
					variant="destructive"
					className="bg-red-500 hover:bg-red-600 text-white"
				>
					<Trash2 className="mr-2 size-4" />
					Excluir Relatório
				</Button>
			</div>

			<Card className="backdrop-blur-xl bg-white/10 border-white/20">
				<CardHeader>
					<div className="flex items-center gap-3">
						<div className="p-3 rounded-xl bg-gradient-to-br from-green-400 to-green-600">
							<FileText className="size-6 text-white" />
						</div>
						<div>
							<CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
								Relatório de Consulta WhatsApp
							</CardTitle>
							<p className="text-white/70 mt-1">
								Gerado em{" "}
								{new Date(consultationData.startDate).toLocaleDateString()}
							</p>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Consultation Info */}
					<div className="p-6 rounded-xl bg-green-500/10 border border-green-500/30">
						<h3 className="text-xl font-semibold text-green-400 mb-3">
							Informações do Consulente
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
							<div>
								<p className="text-sm text-white/60">Nome:</p>
								<p className="font-semibold">{consultationData.name}</p>
							</div>
							<div>
								<p className="text-sm text-white/60">Telefone:</p>
								<p className="font-semibold">{consultationData.phone}</p>
							</div>
						</div>
					</div>

					{/* Report Content */}
					<div className="p-6 rounded-xl bg-white/5 border border-white/20">
						<h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
							<FileText className="size-5 text-green-400" />
							Resultado da Análise
						</h3>
						<ScrollArea className="h-[500px] pr-4">
							<div className="space-y-4">
								{Object.entries(parsedReport).map(([key, value]) => (
									<div
										key={key}
										className="p-4 rounded-lg bg-white/5 border border-white/10"
									>
										<h4 className="text-base font-semibold text-green-400 mb-2 capitalize">
											{key.replace(/_/g, " ")}
										</h4>
										<div className="text-white/90 whitespace-pre-wrap">
											{typeof value === "object" ? (
												<pre className="text-sm overflow-x-auto">
													{JSON.stringify(value, null, 2)}
												</pre>
											) : (
												<p className="text-sm leading-relaxed">
													{String(value)}
												</p>
											)}
										</div>
									</div>
								))}
							</div>
						</ScrollArea>
					</div>

					{/* Warning Notice */}
					<div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
						<p className="text-yellow-400 text-sm">
							⚠️ <span className="font-semibold">Importante:</span> Ao excluir
							este relatório, você não poderá fazer uma nova consulta durante{" "}
							<span className="font-bold">3 dias</span>. Recomendamos aguardar
							este período entre consultas.
						</p>
					</div>
				</CardContent>
			</Card>

			{/* Delete Confirmation Dialog */}
			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent className="backdrop-blur-xl bg-black/90 border-white/20 text-white">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
							Excluir Relatório?
						</AlertDialogTitle>
						<AlertDialogDescription className="text-white/80 text-base space-y-3">
							<p>
								Tem certeza que deseja excluir este relatório? Esta ação não
								pode ser desfeita.
							</p>
							<p className="font-semibold text-yellow-400">
								⚠️ Após excluir, você ficará bloqueado de fazer novas consultas
								por 3 dias. Recomendamos uma busca a cada 3 dias.
							</p>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white">
							Cancelar
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteConfirm}
							className="bg-red-500 hover:bg-red-600 text-white"
						>
							Sim, excluir relatório
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
