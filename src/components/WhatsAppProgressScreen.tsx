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
import { Progress } from "@/components/ui/progress";
import type { Translation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface WhatsAppProgressScreenProps {
	onBack: () => void;
	onCancel: () => void;
	t: Translation;
	consultationData: {
		name: string;
		email: string;
		phone: string;
		startDate: string;
	};
}

export function WhatsAppProgressScreen({
	onBack,
	onCancel,
	t,
	consultationData,
}: WhatsAppProgressScreenProps) {
	const [currentDay, setCurrentDay] = useState(1);
	const [progress, setProgress] = useState(0);
	const [showCancelDialog, setShowCancelDialog] = useState(false);

	useEffect(() => {
		const startDate = new Date(consultationData.startDate);
		const now = new Date();
		const diffTime = Math.abs(now.getTime() - startDate.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		// Calculate current day (1-3)
		const day = Math.min(diffDays, 3);
		setCurrentDay(day);

		// Calculate progress percentage
		const progressPercent = Math.min((day / 3) * 100, 100);
		setProgress(progressPercent);
	}, [consultationData.startDate]);

	const days = [
		{
			day: 1,
			title: `${t.consultationDay} 1`,
			description: "Iniciando análise de dados",
			status: currentDay >= 1 ? "completed" : "pending",
		},
		{
			day: 2,
			title: `${t.consultationDay} 2`,
			description: "Processando informações",
			status:
				currentDay >= 2
					? "completed"
					: currentDay === 1
						? "current"
						: "pending",
		},
		{
			day: 3,
			title: `${t.consultationDay} 3`,
			description: "Finalizando consulta",
			status:
				currentDay >= 3
					? "completed"
					: currentDay === 2
						? "current"
						: "pending",
		},
	];

	const isComplete = currentDay >= 3;

	const handleCancelConfirm = () => {
		setShowCancelDialog(false);
		onCancel();
	};

	return (
		<div className="max-w-4xl mx-auto">
			<div className="flex items-center justify-between mb-6">
				<Button
					onClick={onBack}
					variant="ghost"
					className="text-white hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/40 backdrop-blur-sm"
				>
					<ArrowLeft className="mr-2 size-4" />
					{t.backToDashboard}
				</Button>

				{!isComplete && (
					<Button
						onClick={() => setShowCancelDialog(true)}
						variant="destructive"
						className="bg-red-500 hover:bg-red-600 text-white"
					>
						<XCircle className="mr-2 size-4" />
						Cancelar Consulta
					</Button>
				)}
			</div>

			<Card className="backdrop-blur-xl bg-white/10 border-white/20">
				<CardHeader>
					<CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
						{t.consultationProgress}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Consultation Info */}
					<div className="p-6 rounded-xl bg-green-500/10 border border-green-500/30">
						<h3 className="text-xl font-semibold text-green-400 mb-3">
							Informações da Consulta
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
							<div>
								<p className="text-sm text-white/60">Nome:</p>
								<p className="font-semibold">{consultationData.name}</p>
							</div>
							<div>
								<p className="text-sm text-white/60">Email:</p>
								<p className="font-semibold">{consultationData.email}</p>
							</div>
							<div>
								<p className="text-sm text-white/60">Telefone:</p>
								<p className="font-semibold">{consultationData.phone}</p>
							</div>
							<div>
								<p className="text-sm text-white/60">Data de Início:</p>
								<p className="font-semibold">
									{new Date(consultationData.startDate).toLocaleDateString()}
								</p>
							</div>
						</div>
					</div>

					{/* Progress Bar */}
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<p className="text-white font-semibold">
								{isComplete ? t.consultationComplete : t.consultationProcessing}
							</p>
							<p className="text-white/70">{Math.round(progress)}%</p>
						</div>
						<Progress value={progress} className="h-3" />
					</div>

					{/* Days Timeline */}
					<div className="space-y-4">
						{days.map((dayInfo) => (
							<div
								key={dayInfo.day}
								className={cn(
									"p-5 rounded-xl border transition-all",
									dayInfo.status === "completed" &&
										"bg-green-500/20 border-green-500/50",
									dayInfo.status === "current" &&
										"bg-yellow-500/20 border-yellow-500/50 animate-pulse",
									dayInfo.status === "pending" &&
										"bg-white/5 border-white/20 opacity-50",
								)}
							>
								<div className="flex items-center gap-4">
									<div
										className={cn(
											"flex items-center justify-center size-12 rounded-full font-bold text-lg shrink-0",
											dayInfo.status === "completed" &&
												"bg-green-500 text-white",
											dayInfo.status === "current" &&
												"bg-yellow-500 text-black",
											dayInfo.status === "pending" &&
												"bg-white/10 text-white/50",
										)}
									>
										{dayInfo.status === "completed" ? (
											<CheckCircle2 className="size-6" />
										) : (
											dayInfo.day
										)}
									</div>
									<div className="flex-1">
										<h4
											className={cn(
												"text-lg font-semibold",
												dayInfo.status === "completed" && "text-green-400",
												dayInfo.status === "current" && "text-yellow-400",
												dayInfo.status === "pending" && "text-white/50",
											)}
										>
											{dayInfo.title}
										</h4>
										<p
											className={cn(
												"text-sm",
												dayInfo.status === "completed" && "text-green-300/80",
												dayInfo.status === "current" && "text-yellow-300/80",
												dayInfo.status === "pending" && "text-white/40",
											)}
										>
											{dayInfo.description}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Complete Message */}
					{isComplete && (
						<div className="p-6 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50">
							<div className="flex items-center gap-3 mb-2">
								<CheckCircle2 className="size-6 text-green-400" />
								<h3 className="text-xl font-semibold text-green-400">
									{t.consultationComplete}
								</h3>
							</div>
							<p className="text-white/80">
								Sua consulta foi concluída com sucesso. Todos os dados foram
								processados e estão disponíveis para visualização.
							</p>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Cancel Confirmation Dialog */}
			<AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
				<AlertDialogContent className="backdrop-blur-xl bg-black/90 border-white/20 text-white">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
							Cancelar Consulta?
						</AlertDialogTitle>
						<AlertDialogDescription className="text-white/80 text-base">
							Tem certeza que deseja cancelar esta consulta? Você perderá todo o
							progresso atual e poderá criar uma nova consulta posteriormente.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white">
							Não, manter consulta
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleCancelConfirm}
							className="bg-red-500 hover:bg-red-600 text-white"
						>
							Sim, cancelar consulta
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
