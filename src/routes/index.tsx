import { ConsultationReportView } from "@/components/ConsultationReportView";
import { ConsultationTerminalScreen } from "@/components/ConsultationTerminalScreen";
import { DeepenIaHeader } from "@/components/DeepenIaHeader";
import { DeletedMessagesTab } from "@/components/DeletedMessagesTab";
import { InstagramConsultationDialog } from "@/components/InstagramConsultationDialog";
import {
	type InstagramProfileData,
	InstagramProfileView,
} from "@/components/InstagramProfileView";
import { InstagramTerminalScreen } from "@/components/InstagramTerminalScreen";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ModernBackground } from "@/components/ModernBackground";
import { InstagramIcon, WhatsAppIcon } from "@/components/SocialIcons";
import {
	type ConsultationFormData,
	WhatsAppConsultationDialog,
} from "@/components/WhatsAppConsultationDialog";
import { Badge } from "@/components/ui/badge";
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
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuthContext } from "@/contexts/AuthContext";
import {
	type PlatformData,
	instagramData,
	whatsappData,
} from "@/lib/demo-data";
import {
	type Language,
	type Translation,
	getStoredLanguage,
	setStoredLanguage,
	translations,
} from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
	component: App,
});

type Platform = "whatsapp" | "instagram" | null;
type Section = "home" | "clone" | "support";
type ConsultationView = "terminal" | "report" | null;
type InstagramConsultationView = "terminal" | "profile" | null;

function App() {
	const { isAuthenticated, logout, user } = useAuthContext();
	const [language, setLanguage] = useState<Language>(getStoredLanguage());
	const [selectedPlatform, setSelectedPlatform] = useState<Platform>(null);
	const [currentSection, setCurrentSection] = useState<Section>("home");
	const [showConsultationDialog, setShowConsultationDialog] = useState(false);
	const [consultationView, setConsultationView] =
		useState<ConsultationView>(null);
	const [instagramConsultationView, setInstagramConsultationView] =
		useState<InstagramConsultationView>(null);
	const [showInstagramDialog, setShowInstagramDialog] = useState(false);
	const [instagramUsername, setInstagramUsername] = useState("");
	const [instagramProfileData, setInstagramProfileData] =
		useState<InstagramProfileData | null>(null);
	const [showRealTimeMessagesDialog, setShowRealTimeMessagesDialog] =
		useState(false);
	const [showDeletedMessagesTab, setShowDeletedMessagesTab] = useState(false);
	const navigate = useNavigate();
	const t = translations[language];

	// State para armazenar a última resposta do webhook
	const [lastWebhookResponse, setLastWebhookResponse] = useState<string | null>(
		null,
	);
	const [showLastReportDialog, setShowLastReportDialog] = useState(false);
	const [lastReportData, setLastReportData] = useState<string | null>(null);
	const [loadingLastReport, setLoadingLastReport] = useState(false);
	const [consultationTimestamp, setConsultationTimestamp] = useState<
		number | null
	>(null);
	const [isResultReady, setIsResultReady] = useState(false);

	const handleLanguageChange = (newLanguage: Language) => {
		setLanguage(newLanguage);
		setStoredLanguage(newLanguage);
	};

	// Carregar timestamp da consulta do localStorage
	useEffect(() => {
		const storedTimestamp = localStorage.getItem("consultationTimestamp");
		if (storedTimestamp) {
			const timestamp = Number.parseInt(storedTimestamp, 10);
			setConsultationTimestamp(timestamp);

			// Verificar se passaram 5 dias (5 dias = 432000000 ms)
			const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000;
			const timePassed = Date.now() - timestamp;
			setIsResultReady(timePassed >= fiveDaysInMs);
		}
	}, []);

	// Atualizar o status do resultado a cada minuto
	useEffect(() => {
		if (consultationTimestamp && !isResultReady) {
			const interval = setInterval(() => {
				const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000;
				const timePassed = Date.now() - consultationTimestamp;
				if (timePassed >= fiveDaysInMs) {
					setIsResultReady(true);
					clearInterval(interval);
				}
			}, 60000); // Verifica a cada minuto

			return () => clearInterval(interval);
		}
	}, [consultationTimestamp, isResultReady]);

	const handleNavigation = (section: Section) => {
		setCurrentSection(section);
		setSelectedPlatform(null);
		setConsultationView(null);
		setInstagramConsultationView(null);
		setInstagramProfileData(null);
	};

	const handleWhatsAppClick = () => {
		setShowConsultationDialog(true);
	};

	const handleConsultationSubmit = async (data: ConsultationFormData) => {
		// Validação do user ID
		if (!user?.id) {
			console.error("❌ User ID not found");
			alert("Erro: Usuário não autenticado. Por favor, faça login novamente.");
			return;
		}

		// Validação dos dados do formulário
		if (!data.name || !data.phone) {
			console.error("❌ Missing required fields:", data);
			alert("Erro: Preencha todos os campos obrigatórios (Nome e Telefone).");
			return;
		}

		console.log("🚀 INICIANDO PROCESSO DE CONSULTA");
		console.log("🚀 User ID:", user.id);
		console.log("🚀 User Email:", user.email);
		console.log("🚀 User Name:", user.name);
		console.log("🚀 Form Data:", data);

		// Close dialog and show terminal first
		setShowConsultationDialog(false);
		setConsultationView("terminal");

		try {
			const webhookUrl =
				"https://n8n-n8n.iztngl.easypanel.host/webhook/42f83305-57d8-40be-8e4f-aa7cc055ad4b";

			console.log("🔗 Sending to webhook:", webhookUrl);

			const requestBody = {
				userId: user.id,
				userName: user.name || "",
				name: data.name,
				phone: data.phone,
				address: data.address || "",
				cep: data.cep || "",
				country: data.country || "",
				city: data.city || "",
				neighborhood: data.neighborhood || "",
				language: data.language || "pt",
				timestamp: new Date().toISOString(),
			};

			console.log("📦 Request body:", JSON.stringify(requestBody, null, 2));

			// Create abort controller for timeout
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

			try {
				// Send webhook with timeout
				const webhookResponse = await fetch(webhookUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify(requestBody),
					signal: controller.signal,
				});

				clearTimeout(timeoutId);

				console.log("📡 Response status:", webhookResponse.status);
				console.log("📡 Response status text:", webhookResponse.statusText);

				if (!webhookResponse.ok) {
					let errorText = "";
					try {
						errorText = await webhookResponse.text();
					} catch (e) {
						errorText = "Could not read error response";
					}
					console.error("❌ Webhook failed:", {
						status: webhookResponse.status,
						statusText: webhookResponse.statusText,
						errorText: errorText,
					});
					throw new Error(
						`Webhook retornou erro ${webhookResponse.status}: ${webhookResponse.statusText}`,
					);
				}

				let webhookData: { output?: string; success?: boolean } = {
					success: true,
				};
				try {
					webhookData = await webhookResponse.json();
				} catch (e) {
					console.log("⚠️ Response is not JSON, treating as success");
					webhookData = { success: true };
				}

				console.log("✅ Webhook response:", webhookData);

				// Se o webhook retornar output, armazenar a resposta
				if (webhookData.output) {
					console.log("🔄 WEBHOOK RETORNOU OUTPUT!");
					setLastWebhookResponse(webhookData.output);

					// Salvar timestamp da consulta
					const timestamp = Date.now();
					localStorage.setItem("consultationTimestamp", timestamp.toString());
					setConsultationTimestamp(timestamp);
					setIsResultReady(false);
				} else {
					console.log("⚠️ Webhook não retornou output");
				}
			} catch (fetchError) {
				clearTimeout(timeoutId);

				if (fetchError instanceof Error && fetchError.name === "AbortError") {
					throw new Error(
						"Tempo limite excedido. O servidor demorou muito para responder.",
					);
				}
				throw fetchError;
			}
		} catch (error) {
			console.error("❌ Error sending consultation:", error);
			console.error("❌ Error details:", {
				message: error instanceof Error ? error.message : String(error),
				stack: error instanceof Error ? error.stack : undefined,
			});

			// Mostrar mensagem de erro mais específica
			let errorMessage = "Erro desconhecido ao criar consulta";

			if (error instanceof Error) {
				if (error.message.includes("Failed to fetch")) {
					errorMessage =
						"Erro de conexão. Verifique sua internet e tente novamente.";
				} else if (error.message.includes("NetworkError")) {
					errorMessage =
						"Erro de rede. O servidor pode estar indisponível no momento.";
				} else {
					errorMessage = error.message;
				}
			}

			alert(
				`Erro ao criar consulta:\n\n${errorMessage}\n\nPor favor, tente novamente.`,
			);

			// Voltar ao estado inicial
			setConsultationView(null);
			setShowConsultationDialog(true);
		}
	};

	const handleBackFromConsultation = () => {
		setConsultationView(null);
		setLastWebhookResponse(null);
	};

	// Instagram handlers
	const handleInstagramClick = () => {
		setShowInstagramDialog(true);
	};

	const handleInstagramConsultationSubmit = async (username: string) => {
		setInstagramUsername(username);
		setShowInstagramDialog(false);
		setInstagramConsultationView("terminal");

		try {
			// Enviar webhook para o n8n
			const webhookResponse = await fetch(
				"https://n8n-n8n.ck75vf.easypanel.host/webhook/a37dcb36-49ff-461f-9c31-102f574a09f9",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						instagram: username,
						userId: user?.id,
						userName: user?.name,
						timestamp: new Date().toISOString(),
					}),
				},
			);

			if (!webhookResponse.ok) {
				console.error("Webhook failed:", webhookResponse.statusText);
				alert("Erro ao processar consulta. Por favor, tente novamente.");
				setInstagramConsultationView(null);
				return;
			}

			const webhookData = await webhookResponse.json();
			console.log("Instagram webhook response:", webhookData);

			// Processar resposta do webhook
			if (webhookData.img && webhookData.name) {
				setInstagramProfileData({
					img: webhookData.img,
					name: webhookData.name,
					username: username,
					seguidores: webhookData.seguidores || "0",
					seguindo: webhookData.seguindo || "0",
					publicacoes: webhookData.publicacoes || "0",
				});

				// Aguardar um pouco no terminal antes de mostrar o perfil
				setTimeout(() => {
					setInstagramConsultationView("profile");
				}, 2000);
			}
		} catch (error) {
			console.error("Error sending Instagram consultation:", error);
			alert("Erro ao processar consulta. Por favor, tente novamente.");
			setInstagramConsultationView(null);
		}
	};

	const handleBackFromInstagram = () => {
		setInstagramConsultationView(null);
		setInstagramProfileData(null);
		setInstagramUsername("");
	};

	// Handler para ver resultado
	const handleViewLastReport = async () => {
		if (!user?.id) {
			console.error("User ID not found");
			alert("Erro: Usuário não autenticado.");
			return;
		}

		setShowLastReportDialog(true);

		// Se o resultado ainda não está pronto, não buscar dados
		if (!isResultReady) {
			setLoadingLastReport(false);
			setLastReportData(null);
			return;
		}

		setLoadingLastReport(true);
		setLastReportData(null);

		try {
			// Buscar último relatório do webhook
			const response = await fetch(
				"https://n8n-n8n.iztngl.easypanel.host/webhook/42f83305-57d8-40be-8e4f-aa7cc055ad4b",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						userId: user.id,
						action: "getLastReport",
						timestamp: new Date().toISOString(),
					}),
				},
			);

			if (!response.ok) {
				console.error("Failed to fetch last report:", response.statusText);
				setLastReportData(null);
			} else {
				const data = await response.json();
				if (data.output) {
					setLastReportData(data.output);
				} else {
					setLastReportData(null);
				}
			}
		} catch (error) {
			console.error("Error fetching last report:", error);
			setLastReportData(null);
		} finally {
			setLoadingLastReport(false);
		}
	};

	// Função para calcular dias restantes
	const getDaysRemaining = (): number => {
		if (!consultationTimestamp) return 5;
		const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000;
		const timePassed = Date.now() - consultationTimestamp;
		const timeRemaining = fiveDaysInMs - timePassed;
		const daysRemaining = Math.ceil(timeRemaining / (24 * 60 * 60 * 1000));
		return Math.max(0, daysRemaining);
	};

	// Função para calcular progresso (0-100)
	const getProgress = (): number => {
		if (!consultationTimestamp) return 0;
		const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000;
		const timePassed = Date.now() - consultationTimestamp;
		const progress = (timePassed / fiveDaysInMs) * 100;
		return Math.min(100, Math.max(0, progress));
	};

	// Redirect to login if not authenticated
	useEffect(() => {
		if (!isAuthenticated) {
			navigate({ to: "/login" });
		}
	}, [isAuthenticated, navigate]);

	return (
		<div className="min-h-screen text-white relative overflow-hidden">
			<ModernBackground />

			<div className="relative z-10">
				{/* Header */}
				<DeepenIaHeader t={t} onNavigate={handleNavigation} />

				{/* Language Selector Bar with User Info */}
				<div className="border-b border-white/10 backdrop-blur-xl bg-black/20">
					<div className="container mx-auto px-4 py-3 flex justify-between items-center">
						<div className="text-white/80">
							{t.greeting},{" "}
							<span className="font-semibold text-white">{user?.name}</span>
						</div>
						<div className="flex items-center gap-4">
							<LanguageSelector
								currentLanguage={language}
								onLanguageChange={handleLanguageChange}
							/>
							<Button
								onClick={logout}
								variant="ghost"
								size="sm"
								className="text-white/70 hover:text-white hover:bg-white/10"
							>
								<LogOut className="mr-2 size-4" />
								Sair
							</Button>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<main className="container mx-auto px-4 py-8">
					{showDeletedMessagesTab ? (
						<DeletedMessagesTab
							t={t}
							onBack={() => setShowDeletedMessagesTab(false)}
						/>
					) : instagramConsultationView === "terminal" ? (
						<InstagramTerminalScreen
							t={t}
							onBack={handleBackFromInstagram}
							webhookResponse={instagramProfileData ? "received" : null}
							currentLanguage={language}
							onLanguageChange={handleLanguageChange}
							onComplete={() => setInstagramConsultationView("profile")}
						/>
					) : instagramConsultationView === "profile" &&
						instagramProfileData ? (
						<InstagramProfileView
							profileData={instagramProfileData}
							onBack={handleBackFromInstagram}
							t={t}
						/>
					) : consultationView === "terminal" ? (
						<ConsultationTerminalScreen
							t={t}
							onBack={handleBackFromConsultation}
							webhookResponse={lastWebhookResponse}
							currentLanguage={language}
							onLanguageChange={handleLanguageChange}
						/>
					) : consultationView === "report" && lastWebhookResponse ? (
						<ConsultationReportView
							reportData={lastWebhookResponse}
							onBack={handleBackFromConsultation}
							t={t}
						/>
					) : currentSection === "home" && selectedPlatform === null ? (
						<Dashboard
							onSelectPlatform={setSelectedPlatform}
							onWhatsAppClick={handleWhatsAppClick}
							onInstagramClick={handleInstagramClick}
							onRealTimeMessagesClick={() =>
								setShowRealTimeMessagesDialog(true)
							}
							onDeletedMessagesClick={() => setShowDeletedMessagesTab(true)}
							onCloneClick={() => setCurrentSection("clone")}
							onViewLastReportClick={handleViewLastReport}
							onMonitorFollowersClick={() => {
								// Aqui você pode adicionar lógica futura para monitoramento de seguidores
								alert(t.monitorFollowersTitle);
							}}
							t={t}
						/>
					) : currentSection === "home" && selectedPlatform === "whatsapp" ? (
						<PlatformView
							platform="whatsapp"
							data={whatsappData}
							onBack={() => setSelectedPlatform(null)}
							t={t}
						/>
					) : currentSection === "home" && selectedPlatform === "instagram" ? (
						<PlatformView
							platform="instagram"
							data={instagramData}
							onBack={() => setSelectedPlatform(null)}
							t={t}
						/>
					) : currentSection === "clone" ? (
						<CloneWhatsAppSection
							t={t}
							onBack={() => setCurrentSection("home")}
						/>
					) : (
						<SupportSection t={t} onBack={() => setCurrentSection("home")} />
					)}
				</main>

				{/* WhatsApp Consultation Dialog */}
				<WhatsAppConsultationDialog
					open={showConsultationDialog}
					onOpenChange={setShowConsultationDialog}
					onSubmit={handleConsultationSubmit}
					t={t}
					currentLanguage={language}
				/>

				{/* Instagram Consultation Dialog */}
				<InstagramConsultationDialog
					open={showInstagramDialog}
					onOpenChange={setShowInstagramDialog}
					onSubmit={handleInstagramConsultationSubmit}
					t={t}
				/>

				{/* Real-Time Messages Dialog */}
				<Dialog
					open={showRealTimeMessagesDialog}
					onOpenChange={setShowRealTimeMessagesDialog}
				>
					<DialogContent className="backdrop-blur-xl bg-black/90 border-white/20 text-white max-w-md">
						<DialogHeader>
							<DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#FF2358] to-white bg-clip-text text-transparent">
								{t.realTimeMessagesTitle}
							</DialogTitle>
							<DialogDescription className="text-white/80 text-base leading-relaxed pt-4">
								{t.realTimeMessagesWarning}
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>

				{/* View Result Dialog */}
				<Dialog
					open={showLastReportDialog}
					onOpenChange={setShowLastReportDialog}
				>
					<DialogContent className="backdrop-blur-xl bg-black/90 border-white/20 text-white max-w-3xl max-h-[80vh]">
						<DialogHeader>
							<DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#FF2358] to-white bg-clip-text text-transparent">
								{t.viewResultTitle}
							</DialogTitle>
						</DialogHeader>
						<ScrollArea className="h-[60vh] pr-4">
							{!isResultReady && consultationTimestamp ? (
								<div className="flex items-center justify-center py-12">
									<div className="text-center space-y-6 w-full max-w-2xl px-4">
										<div className="p-6 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30">
											<h3 className="text-xl font-bold text-yellow-400 mb-4">
												{t.spyingSchedule}
											</h3>
											<p className="text-white/90 text-base leading-relaxed mb-6">
												{t.spyingScheduleMessage}
											</p>

											{/* Barra de Progresso */}
											<div className="mb-6">
												<div className="flex justify-between items-center mb-2">
													<p className="text-sm font-semibold text-yellow-300">
														{t.decryptionProgress}
													</p>
													<p className="text-sm font-bold text-white">
														{Math.round(getProgress())}%
													</p>
												</div>
												<Progress
													value={getProgress()}
													className="h-3 bg-black/40 border border-yellow-500/30"
												/>
											</div>

											<div className="mt-6 p-4 bg-black/30 rounded-lg border border-yellow-500/20">
												<p className="text-2xl font-bold text-yellow-400">
													{t.resultAvailableIn}
												</p>
												<p className="text-4xl font-bold text-white mt-2">
													{getDaysRemaining()} {t.daysRemaining}
												</p>
											</div>
										</div>
									</div>
								</div>
							) : loadingLastReport ? (
								<div className="flex items-center justify-center py-12">
									<div className="text-center">
										<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF2358] mb-4" />
										<p className="text-white/70">{t.lastReportLoading}</p>
									</div>
								</div>
							) : lastReportData ? (
								<div className="space-y-4">
									<div className="p-6 rounded-xl bg-gradient-to-r from-[#FF2358]/10 to-white/5 border border-[#FF2358]/30">
										<pre className="whitespace-pre-wrap text-white/90 font-mono text-sm">
											{lastReportData}
										</pre>
									</div>
								</div>
							) : consultationTimestamp ? (
								<div className="flex items-center justify-center py-12">
									<div className="text-center space-y-6 w-full max-w-2xl px-4">
										<div className="p-8 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
											<div className="mb-6">
												<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 mb-4">
													<svg
														className="w-8 h-8 text-green-400"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
														role="img"
														aria-label="Check icon"
													>
														<title>Faithful partner confirmation</title>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M5 13l4 4L19 7"
														/>
													</svg>
												</div>
												<h3 className="text-2xl font-bold text-green-400 mb-2">
													100% FIEL
												</h3>
											</div>
											<p className="text-white/90 text-lg leading-relaxed">
												{t.faithfulMessage}
											</p>
										</div>
									</div>
								</div>
							) : (
								<div className="flex items-center justify-center py-12">
									<div className="text-center">
										<p className="text-white/70 text-lg">
											{t.lastReportNotFound}
										</p>
									</div>
								</div>
							)}
						</ScrollArea>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}

interface DashboardProps {
	onSelectPlatform: (platform: Platform) => void;
	onWhatsAppClick: () => void;
	onInstagramClick: () => void;
	onRealTimeMessagesClick: () => void;
	onDeletedMessagesClick: () => void;
	onCloneClick: () => void;
	onViewLastReportClick: () => void;
	onMonitorFollowersClick: () => void;
	t: Translation;
}

function Dashboard({
	onSelectPlatform,
	onWhatsAppClick,
	onInstagramClick,
	onRealTimeMessagesClick,
	onDeletedMessagesClick,
	onCloneClick,
	onViewLastReportClick,
	onMonitorFollowersClick,
	t,
}: DashboardProps) {
	const platforms = [
		{
			id: "whatsapp" as const,
			name: t.whatsapp,
			icon: WhatsAppIcon,
			description: "WhatsApp Business",
			hasButton: true,
			gradient: "from-[#FF2358] to-white",
			bgGradient: "from-[#FF2358]/20 to-white/10",
			iconColor: "text-[#25D366]",
		},
		{
			id: "instagram" as const,
			name: t.instagram,
			icon: InstagramIcon,
			description: "Instagram Direct",
			hasButton: true,
			gradient: "from-[#FF2358] to-white",
			bgGradient: "from-[#FF2358]/20 to-white/10",
			iconColor: "text-[#E4405F]",
		},
	];

	return (
		<div className="max-w-6xl mx-auto">
			<div className="mb-12 text-center">
				<h2 className="text-5xl font-bold mb-4 text-gray-300">
					{t.selectPlatform}
				</h2>
				<p className="text-gray-300 text-lg mb-6">{t.dashboard}</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{platforms.map((platform) => {
					const Icon = platform.icon;
					return (
						<Card
							key={platform.id}
							className="relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-xl bg-white/10 border-white/20 hover:border-white/40 group"
						>
							{/* Gradient background */}
							<div
								className={cn(
									"absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
									platform.bgGradient,
								)}
							/>

							<CardHeader className="relative z-10">
								<div className="flex items-center justify-center mb-4">
									<div
										className={cn(
											"p-6 rounded-2xl bg-gradient-to-br shadow-lg",
											platform.gradient,
										)}
									>
										<Icon className={cn("size-12", platform.iconColor)} />
									</div>
								</div>
								<CardTitle className="text-2xl text-center font-bold text-gray-300">
									{platform.name}
								</CardTitle>
								<CardDescription className="text-gray-300 text-center">
									{platform.description}
								</CardDescription>
							</CardHeader>
							<CardContent className="relative z-10 space-y-3">
								<Button
									onClick={() => {
										const platformId = platform.id;
										if (platformId === "whatsapp") {
											onWhatsAppClick();
										} else if (platformId === "instagram") {
											onInstagramClick();
										}
									}}
									className={cn(
										"w-full bg-gradient-to-r text-gray-300 font-semibold shadow-lg hover:shadow-xl transition-all",
										platform.gradient,
									)}
								>
									{t.makeConsultation}
								</Button>
								{platform.id === "instagram" && (
									<div className="space-y-3">
										<Button
											onClick={onMonitorFollowersClick}
											className="w-full bg-gradient-to-r from-purple-500/60 to-pink-500/60 text-gray-300 font-semibold shadow-lg hover:shadow-xl transition-all border border-pink-500/30"
										>
											{t.monitorFollowersTitle}
										</Button>
										<p className="text-center text-sm text-pink-300/80">
											{t.monitorFollowersSubtitle}
										</p>
									</div>
								)}
								{platform.id === "whatsapp" && (
									<>
										<Button
											onClick={onCloneClick}
											className="w-full bg-gradient-to-r from-white/20 to-[#FF2358]/60 text-gray-300 font-semibold shadow-lg hover:shadow-xl transition-all border border-white/30"
										>
											{t.cloneWhatsApp}
										</Button>
										<Button
											onClick={onViewLastReportClick}
											className="w-full bg-gradient-to-r from-[#FF2358]/60 to-white/20 text-gray-300 font-semibold shadow-lg hover:shadow-xl transition-all border border-white/30"
										>
											{t.viewResult}
										</Button>
									</>
								)}
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}

interface PlatformViewProps {
	platform: "whatsapp" | "instagram";
	data: PlatformData;
	onBack: () => void;
	t: Translation;
}

function PlatformView({ platform, data, onBack, t }: PlatformViewProps) {
	const [selectedContactId, setSelectedContactId] = useState(
		data.contacts[0]?.id || "",
	);
	const selectedContact = data.contacts.find((c) => c.id === selectedContactId);
	const contactMessages = data.messages.filter(
		(m) => m.contactId === selectedContactId,
	);
	const contactMedia = data.media.filter(
		(m) => m.contactId === selectedContactId,
	);

	const platformColors = {
		whatsapp: {
			gradient: "from-green-400 to-green-600",
			bg: "bg-green-500/10",
			border: "border-green-500/30",
			text: "text-green-400",
		},
		instagram: {
			gradient: "from-purple-400 via-pink-500 to-orange-500",
			bg: "bg-pink-500/10",
			border: "border-pink-500/30",
			text: "text-pink-400",
		},
	};

	const colors = platformColors[platform];

	return (
		<div className="max-w-7xl mx-auto">
			<Button
				onClick={onBack}
				variant="ghost"
				className="mb-6 text-white hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/40 backdrop-blur-sm"
			>
				<ArrowLeft className="mr-2 size-4" />
				{t.backToDashboard}
			</Button>

			{/* Statistics */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
				<StatCard
					title={t.messageCount}
					value={data.stats.messageCount}
					gradient={colors.gradient}
				/>
				<StatCard
					title={t.activeChats}
					value={data.stats.activeChats}
					gradient={colors.gradient}
				/>
				<StatCard
					title={t.mediaCount}
					value={data.stats.mediaCount}
					gradient={colors.gradient}
				/>
				{data.stats.followers && (
					<StatCard
						title={t.followers}
						value={data.stats.followers}
						gradient={colors.gradient}
					/>
				)}
			</div>

			{/* Main Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Contacts List */}
				<Card className="backdrop-blur-xl bg-white/10 border-white/20">
					<CardHeader>
						<CardTitle
							className={cn(
								"text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
								colors.gradient,
							)}
						>
							{t.contacts}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-[500px] pr-4">
							<div className="space-y-2">
								{data.contacts.map((contact) => (
									<button
										type="button"
										key={contact.id}
										onClick={() => setSelectedContactId(contact.id)}
										className={cn(
											"p-3 rounded-xl border cursor-pointer transition-all w-full text-left",
											selectedContactId === contact.id
												? `${colors.bg} ${colors.border} border-2`
												: "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10",
										)}
									>
										<div className="flex items-start gap-3">
											<img
												src={contact.avatar}
												alt={contact.name}
												className="size-10 rounded-full border-2 border-white/30"
											/>
											<div className="flex-1 min-w-0">
												<div className="flex items-center justify-between gap-2">
													<p className="font-semibold text-white truncate">
														{contact.name}
													</p>
													<Badge
														variant="outline"
														className={cn(
															"text-xs shrink-0 border-white/30",
															contact.status === "online" &&
																"bg-green-500/20 text-green-400 border-green-500/50",
															contact.status === "active" &&
																"bg-blue-500/20 text-blue-400 border-blue-500/50",
															contact.status === "offline" &&
																"bg-gray-500/20 text-gray-400 border-gray-500/50",
														)}
													>
														{t[contact.status]}
													</Badge>
												</div>
												{contact.username && (
													<p className="text-xs text-white/60">
														{contact.username}
													</p>
												)}
												{contact.lastSeen && (
													<p className="text-xs text-white/50 mt-1">
														{contact.lastSeen}
													</p>
												)}
											</div>
										</div>
									</button>
								))}
							</div>
						</ScrollArea>
					</CardContent>
				</Card>

				{/* Messages */}
				<Card className="backdrop-blur-xl bg-white/10 border-white/20">
					<CardHeader>
						<CardTitle
							className={cn(
								"text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
								colors.gradient,
							)}
						>
							{t.messages}
						</CardTitle>
						{selectedContact && (
							<CardDescription className="text-white/70">
								{selectedContact.name}
							</CardDescription>
						)}
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-[500px] pr-4">
							<div className="space-y-3">
								{contactMessages.length > 0 ? (
									contactMessages.map((message) => (
										<div
											key={message.id}
											className={cn(
												"p-4 rounded-2xl border transition-all",
												message.isIncoming
													? "bg-white/10 border-white/20 ml-0 mr-8"
													: `${colors.bg} ${colors.border} ml-8 mr-0`,
											)}
										>
											<p className="text-sm text-white mb-2">
												{message.content}
											</p>
											<p className="text-xs text-white/50">
												{new Date(message.timestamp).toLocaleTimeString()}
											</p>
										</div>
									))
								) : (
									<p className="text-center text-white/50 py-8">
										{t.noMessages}
									</p>
								)}
							</div>
						</ScrollArea>
					</CardContent>
				</Card>

				{/* Media */}
				<Card className="backdrop-blur-xl bg-white/10 border-white/20">
					<CardHeader>
						<CardTitle
							className={cn(
								"text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
								colors.gradient,
							)}
						>
							{t.media}
						</CardTitle>
						{selectedContact && (
							<CardDescription className="text-white/70">
								{selectedContact.name}
							</CardDescription>
						)}
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-[500px] pr-4">
							<div className="grid grid-cols-2 gap-3">
								{contactMedia.length > 0 ? (
									contactMedia.map((item) => (
										<div
											key={item.id}
											className="relative group aspect-square rounded-xl overflow-hidden border-2 border-white/20 hover:border-white/40 transition-all"
										>
											<img
												src={item.url}
												alt="Media"
												className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
											/>
											<div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-end">
												<p className="text-xs text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
													{new Date(item.timestamp).toLocaleDateString()}
												</p>
											</div>
										</div>
									))
								) : (
									<p className="col-span-2 text-center text-white/50 py-8">
										{t.noMessages}
									</p>
								)}
							</div>
						</ScrollArea>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

interface StatCardProps {
	title: string;
	value: number;
	gradient: string;
}

function StatCard({ title, value, gradient }: StatCardProps) {
	return (
		<Card className="backdrop-blur-xl bg-white/10 border-white/20 hover:border-white/40 transition-all hover:shadow-xl">
			<CardHeader className="pb-3">
				<CardDescription className="text-white/70 text-sm font-medium">
					{title}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p
					className={cn(
						"text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
						gradient,
					)}
				>
					{value.toLocaleString()}
				</p>
			</CardContent>
		</Card>
	);
}

interface SectionProps {
	t: Translation;
	onBack: () => void;
}

function CloneWhatsAppSection({ t, onBack }: SectionProps) {
	const tutorialSteps = [
		{
			title: t.cloneTutorialStep1Title,
			description: t.cloneTutorialStep1Desc,
			image: "https://i.ibb.co/m5Jn3rZT/parte-1-original.png",
		},
		{
			title: t.cloneTutorialStep2Title,
			description: t.cloneTutorialStep2Desc,
			image: "https://i.ibb.co/5hY3pQgj/parte-2-original.png",
		},
		{
			title: t.cloneTutorialStep3Title,
			description: t.cloneTutorialStep3Desc,
			image: "https://i.ibb.co/dwk3XvPj/qr-code-clone.jpg",
		},
		{
			title: t.cloneTutorialStep4Title,
			description: t.cloneTutorialStep4Desc,
			image: "https://i.ibb.co/TMTc5n6h/Captura-de-tela-2025-11-06-143153.png",
		},
		{
			title: t.cloneTutorialStep5Title,
			description: t.cloneTutorialStep5Desc,
			image: "https://i.ibb.co/1fj6jQ0D/parte-5-original.png",
		},
		{
			title: t.cloneTutorialStep6Title,
			description: t.cloneTutorialStep6Desc,
			image: null,
		},
		{
			title: t.cloneTutorialStep7Title,
			description: t.cloneTutorialStep7Desc,
			image: null,
		},
		{
			title: t.cloneTutorialStep8Title,
			description: t.cloneTutorialStep8Desc,
			image: null,
		},
	];

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
					<CardTitle className="text-3xl font-bold bg-gradient-to-r from-[#FF2358] to-white bg-clip-text text-transparent">
						{t.cloneTutorialTitle}
					</CardTitle>
					<CardDescription className="text-white/70 text-lg">
						{t.cloneWhatsApp}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[700px] pr-4">
						<div className="space-y-6">
							{tutorialSteps.map((step, index) => (
								<div
									key={`step-${index + 1}`}
									className="p-6 rounded-xl bg-gradient-to-r from-[#FF2358]/10 to-white/5 border border-[#FF2358]/30 hover:border-[#FF2358]/50 transition-all"
								>
									<h3 className="text-xl font-semibold text-[#FF2358] mb-3">
										{step.title}
									</h3>
									<p className="text-white/80 mb-4">{step.description}</p>
									{step.image && (
										<div className="rounded-lg overflow-hidden border-2 border-[#FF2358]/30">
											<img
												src={step.image}
												alt={`Tutorial step ${index + 1}`}
												className="w-full h-auto object-contain max-h-[400px] bg-white/5"
												loading="lazy"
											/>
										</div>
									)}
								</div>
							))}
						</div>
					</ScrollArea>
				</CardContent>
			</Card>
		</div>
	);
}

function SupportSection({ t, onBack }: SectionProps) {
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
					<CardTitle className="text-3xl font-bold bg-gradient-to-r from-[#FF2358] to-white bg-clip-text text-transparent">
						{t.support}
					</CardTitle>
					<CardDescription className="text-white/70 text-lg">
						Central de ajuda e suporte técnico
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="p-6 rounded-xl bg-gradient-to-r from-[#FF2358]/10 to-white/5 border border-[#FF2358]/30 flex flex-col items-center justify-center text-center">
						<h3 className="text-xl font-semibold text-white mb-4">
							Precisa de ajuda?
						</h3>
						<p className="text-white/70 mb-6">
							Entre em contato com nossa equipe de suporte
						</p>
						<div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
							<Button
								onClick={() =>
									window.open(
										"https://api.whatsapp.com/send/?phone=17866050358&text&type=phone_number&app_absent=0",
										"_blank",
										"noopener,noreferrer",
									)
								}
								className="flex-1 bg-gradient-to-r from-[#FF2358] to-[#FF2358]/80 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
							>
								<WhatsAppIcon className="mr-3 size-6" />
								Entrar em Contato com Suporte
							</Button>
							<Button
								onClick={() =>
									window.open(
										"https://forms.clickup.com/9013214015/f/8cknetz-3573/4EHWHCS7K9CCBSKMFV",
										"_blank",
										"noopener,noreferrer",
									)
								}
								className="flex-1 bg-gradient-to-r from-white/20 to-[#FF2358]/60 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-white/30"
							>
								{t.refund}
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
