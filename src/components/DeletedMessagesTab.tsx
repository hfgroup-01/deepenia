import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import type { Translation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ArrowLeft, Clock, Search, Shield } from "lucide-react";
import { useEffect, useState } from "react";

type AnalysisStatus = "idle" | "processing" | "waiting" | "complete";

interface DeletedMessagesTabProps {
	t: Translation;
	onBack: () => void;
}

interface StoredState {
	analysis_status: AnalysisStatus;
	decryption_end_time: number | null;
	found_packets_count: number;
	phone_number: string;
}

const STORAGE_KEY = "deleted_messages_state";
const PROCESSING_DURATION = 5000; // 5 seconds
const WAITING_DAYS = 4; // 4 days

export function DeletedMessagesTab({ t, onBack }: DeletedMessagesTabProps) {
	const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>("idle");
	const [decryptionEndTime, setDecryptionEndTime] = useState<number | null>(
		null,
	);
	const [foundPacketsCount, setFoundPacketsCount] = useState<number>(0);
	const [timeRemaining, setTimeRemaining] = useState<string>("");
	const [showPhonePopup, setShowPhonePopup] = useState<boolean>(false);
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [phoneError, setPhoneError] = useState<string>("");

	// Load state from localStorage on mount
	useEffect(() => {
		const storedState = localStorage.getItem(STORAGE_KEY);
		if (storedState) {
			try {
				const parsed: StoredState = JSON.parse(storedState);
				setAnalysisStatus(parsed.analysis_status);
				setDecryptionEndTime(parsed.decryption_end_time);
				setFoundPacketsCount(parsed.found_packets_count);
				setPhoneNumber(parsed.phone_number || "");
			} catch (error) {
				console.error("Error parsing stored state:", error);
			}
		}
	}, []);

	// Save state to localStorage whenever it changes
	useEffect(() => {
		const state: StoredState = {
			analysis_status: analysisStatus,
			decryption_end_time: decryptionEndTime,
			found_packets_count: foundPacketsCount,
			phone_number: phoneNumber,
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	}, [analysisStatus, decryptionEndTime, foundPacketsCount, phoneNumber]);

	// Countdown timer for waiting state
	useEffect(() => {
		if (analysisStatus === "waiting" && decryptionEndTime) {
			const interval = setInterval(() => {
				const now = Date.now();
				const remaining = decryptionEndTime - now;

				if (remaining <= 0) {
					setAnalysisStatus("complete");
					clearInterval(interval);
					return;
				}

				// Calculate days, hours, minutes, seconds
				const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
				const hours = Math.floor(
					(remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
				);
				const minutes = Math.floor(
					(remaining % (1000 * 60 * 60)) / (1000 * 60),
				);
				const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

				setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [analysisStatus, decryptionEndTime]);

	const handleStartAnalysis = () => {
		setShowPhonePopup(true);
		setPhoneError("");
	};

	const handlePhoneSubmit = () => {
		// Basic phone validation (must have at least 10 digits)
		const digitsOnly = phoneNumber.replace(/\D/g, "");
		if (digitsOnly.length < 10) {
			setPhoneError(t.phone_popup_error);
			return;
		}

		setShowPhonePopup(false);
		setPhoneError("");
		setAnalysisStatus("processing");

		// Simulate processing for 5 seconds
		setTimeout(() => {
			// Generate random packet count between 3 and 8
			const randomCount = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
			setFoundPacketsCount(randomCount);

			// Calculate end time (4 days from now)
			const endTime = Date.now() + WAITING_DAYS * 24 * 60 * 60 * 1000;
			setDecryptionEndTime(endTime);

			setAnalysisStatus("waiting");
		}, PROCESSING_DURATION);
	};

	const handlePhoneCancel = () => {
		setShowPhonePopup(false);
		setPhoneError("");
		setPhoneNumber("");
	};

	const handleReset = () => {
		setAnalysisStatus("idle");
		setDecryptionEndTime(null);
		setFoundPacketsCount(0);
		setTimeRemaining("");
		setPhoneNumber("");
		localStorage.removeItem(STORAGE_KEY);
	};

	return (
		<div className="max-w-4xl mx-auto">
			<Button
				onClick={onBack}
				variant="ghost"
				className="mb-6 text-white hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/40 backdrop-blur-sm"
			>
				<ArrowLeft className="mr-2 size-4" />
				{t.backToDashboard}
			</Button>

			<Card className="backdrop-blur-xl bg-white/10 border-white/20">
				<CardHeader>
					<CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
						{t.tab_title}
					</CardTitle>
					<CardDescription className="text-white/70 text-lg">
						{analysisStatus === "idle" && t.analysis_description}
						{analysisStatus === "processing" && "Processando varredura..."}
						{analysisStatus === "waiting" && "Aguardando descriptografia..."}
						{analysisStatus === "complete" && "Análise concluída"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{/* Tela 1: Início da Busca */}
					{analysisStatus === "idle" && (
						<div className="py-12 text-center space-y-6">
							<div className="flex justify-center mb-6">
								<div className="p-8 rounded-full bg-gradient-to-br from-red-400 via-orange-500 to-yellow-500 shadow-lg">
									<Search className="size-16 text-white" />
								</div>
							</div>
							<h3 className="text-2xl font-bold text-white">
								{t.analysis_title}
							</h3>
							<p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
								{t.analysis_description}
							</p>
							<Button
								onClick={handleStartAnalysis}
								className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
							>
								{t.analysis_start_button}
							</Button>
						</div>
					)}

					{/* Tela 2: Processamento e Descoberta */}
					{analysisStatus === "processing" && (
						<div className="py-12 space-y-8">
							<div className="flex justify-center mb-6">
								<div className="p-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg animate-pulse">
									<Search className="size-16 text-white animate-spin" />
								</div>
							</div>
							<div className="space-y-4">
								<h3 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
									Analisando dados...
								</h3>
								<div className="space-y-4 max-w-2xl mx-auto">
									<ProcessingLine
										text="Conectando aos servidores..."
										delay={0}
									/>
									<ProcessingLine text="Escaneando registros..." delay={1000} />
									<ProcessingLine
										text="Identificando mensagens apagadas..."
										delay={2000}
									/>
									<ProcessingLine
										text="Preparando descriptografia..."
										delay={3500}
									/>
								</div>
								<Progress value={80} className="max-w-md mx-auto" />
							</div>
						</div>
					)}

					{/* Tela 3: Espera e Descriptografia */}
					{analysisStatus === "waiting" && (
						<div className="py-12 space-y-8">
							<div className="flex justify-center mb-6">
								<div className="p-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg">
									<Clock className="size-16 text-white" />
								</div>
							</div>
							<div className="text-center space-y-6">
								<h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
									{t.waiting_title}
								</h3>
								<p className="text-white/80 max-w-2xl mx-auto text-lg">
									{t.waiting_subtitle.replace(
										"{{packets_count}}",
										foundPacketsCount.toString(),
									)}
								</p>
								<div className="my-8 p-8 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 max-w-md mx-auto">
									<div className="text-sm text-white/60 mb-2">
										Tempo estimado restante:
									</div>
									<div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
										{timeRemaining}
									</div>
								</div>
								<p className="text-white/70 max-w-xl mx-auto">
									{t.waiting_instruction}
								</p>
							</div>
						</div>
					)}

					{/* Tela 4: Relatório Final */}
					{analysisStatus === "complete" && (
						<div className="py-12 space-y-8">
							<div className="flex justify-center mb-6">
								<div className="p-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg">
									<Shield className="size-16 text-white" />
								</div>
							</div>
							<div className="text-center space-y-6">
								<h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
									{t.report_title}
								</h3>
								<div className="max-w-2xl mx-auto p-8 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
									<p className="text-white/90 text-lg leading-relaxed">
										{t.report_body.replace(
											"{{packets_count}}",
											foundPacketsCount.toString(),
										)}
									</p>
								</div>
								<div className="pt-6">
									<Button
										onClick={handleReset}
										className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
									>
										{t.report_reset_button}
									</Button>
								</div>
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Phone Number Popup */}
			<Dialog open={showPhonePopup} onOpenChange={setShowPhonePopup}>
				<DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-slate-900 to-slate-800 border-white/20">
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
							{t.phone_popup_title}
						</DialogTitle>
						<DialogDescription className="text-white/70">
							{t.phone_popup_description}
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="phone" className="text-white">
								{t.phone_popup_label}
							</Label>
							<Input
								id="phone"
								type="tel"
								placeholder={t.phone_popup_placeholder}
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
							/>
							{phoneError && (
								<p className="text-sm text-red-400">{phoneError}</p>
							)}
						</div>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={handlePhoneCancel}
							className="border-white/20 text-white hover:bg-white/10"
						>
							{t.phone_popup_cancel}
						</Button>
						<Button
							type="submit"
							onClick={handlePhoneSubmit}
							className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 text-white font-semibold hover:shadow-xl transition-all hover:scale-105"
						>
							{t.phone_popup_button}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

interface ProcessingLineProps {
	text: string;
	delay: number;
}

function ProcessingLine({ text, delay }: ProcessingLineProps) {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setVisible(true), delay);
		return () => clearTimeout(timer);
	}, [delay]);

	return (
		<div
			className={cn(
				"flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 transition-all duration-500",
				visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
			)}
		>
			<div className="size-2 rounded-full bg-cyan-400 animate-pulse" />
			<span className="text-white/80 font-mono text-sm">{text}</span>
		</div>
	);
}
