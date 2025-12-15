import { ModernBackground } from "@/components/ModernBackground";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/contexts/AuthContext";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/forgot-password")({
	component: ForgotPasswordPage,
});

export function ForgotPasswordPage() {
	const { resetPassword, isLoading } = useAuthContext();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccess(false);

		if (!email) {
			setError("Por favor, insira seu email");
			return;
		}

		try {
			await resetPassword(email);
			setSuccess(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Erro ao resetar senha");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center relative overflow-hidden">
			<ModernBackground />

			<div className="relative z-10 w-full max-w-md px-4">
				<Card className="backdrop-blur-xl bg-black/40 border-white/20 shadow-2xl">
					<CardHeader className="space-y-1">
						<CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
							Esqueceu a Senha?
						</CardTitle>
						<CardDescription className="text-white/70 text-center">
							Digite seu email para receber instruções de recuperação
						</CardDescription>
					</CardHeader>
					<CardContent>
						{!success ? (
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="email" className="text-white">
										Email
									</Label>
									<div className="relative">
										<Mail className="absolute left-3 top-3 size-4 text-white/50" />
										<Input
											id="email"
											type="email"
											placeholder="seu@email.com"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
											disabled={isLoading}
										/>
									</div>
								</div>

								{error && (
									<div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50">
										<p className="text-red-400 text-sm">{error}</p>
									</div>
								)}

								<Button
									type="submit"
									className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
									disabled={isLoading}
								>
									{isLoading ? "Enviando..." : "Enviar Email"}
								</Button>

								<div className="text-center">
									<Button
										type="button"
										variant="ghost"
										onClick={() => navigate({ to: "/login" })}
										className="text-white/70 hover:text-white hover:bg-white/10"
									>
										<ArrowLeft className="mr-2 size-4" />
										Voltar ao Login
									</Button>
								</div>
							</form>
						) : (
							<div className="space-y-4">
								<div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50">
									<p className="text-green-400 text-sm text-center">
										Email enviado com sucesso! Verifique sua caixa de entrada
										para instruções de recuperação de senha.
									</p>
								</div>

								<div className="text-center">
									<Button
										type="button"
										onClick={() => navigate({ to: "/login" })}
										className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
									>
										Voltar ao Login
									</Button>
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
