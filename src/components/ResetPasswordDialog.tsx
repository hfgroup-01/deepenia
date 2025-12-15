import { Button } from "@/components/ui/button";
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
import { useAuthContext } from "@/contexts/AuthContext";
import type { Translation } from "@/lib/i18n";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface ResetPasswordDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	t: Translation;
}

export function ResetPasswordDialog({
	open,
	onOpenChange,
	t,
}: ResetPasswordDialogProps) {
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const { user, logout } = useAuthContext();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		// Validações
		if (newPassword.length < 6) {
			setError(t.passwordTooShort);
			return;
		}

		if (newPassword !== confirmPassword) {
			setError(t.passwordMismatch);
			return;
		}

		if (!user?.email) {
			setError(t.userNotFound);
			return;
		}

		try {
			// Buscar usuários do localStorage (usando a chave correta)
			const usersData = localStorage.getItem("deepen_ia_users");
			const users: Array<{
				id: string;
				email: string;
				password: string;
				name: string;
			}> = usersData ? JSON.parse(usersData) : [];

			// Encontrar o usuário atual
			const userIndex = users.findIndex((u) => u.email === user.email);

			if (userIndex === -1) {
				setError(t.userNotFound);
				return;
			}

			// Atualizar a senha
			users[userIndex].password = newPassword;

			// Salvar de volta no localStorage (usando a chave correta)
			localStorage.setItem("deepen_ia_users", JSON.stringify(users));

			// Mostrar sucesso
			setSuccess(true);

			// Aguardar 3 segundos e redirecionar para login
			setTimeout(() => {
				logout();
				navigate({ to: "/login" });
			}, 3000);
		} catch (err) {
			console.error("Erro ao redefinir senha:", err);
			setError("Erro ao redefinir senha. Tente novamente.");
		}
	};

	const handleClose = () => {
		if (!success) {
			setNewPassword("");
			setConfirmPassword("");
			setError("");
			onOpenChange(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[500px] backdrop-blur-xl bg-black/90 border-white/20 text-white">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
						{t.resetPasswordTitle}
					</DialogTitle>
					<DialogDescription className="text-white/70">
						{t.resetPasswordDesc}
					</DialogDescription>
				</DialogHeader>

				{success ? (
					<div className="py-8 text-center space-y-4">
						<div className="flex justify-center">
							<div className="rounded-full bg-green-500/20 p-4">
								<CheckCircle2 className="size-12 text-green-400" />
							</div>
						</div>
						<div className="space-y-2">
							<p className="text-lg font-semibold text-green-400">
								{t.passwordResetSuccess}
							</p>
							<p className="text-sm text-white/70">{t.passwordResetWarning}</p>
							<p className="text-sm text-white/50 mt-4">
								{t.redirectingToLogin}
							</p>
						</div>
					</div>
				) : (
					<form onSubmit={handleSubmit}>
						<div className="space-y-4 py-4">
							{error && (
								<div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
									<AlertCircle className="size-4 shrink-0" />
									<p className="text-sm">{error}</p>
								</div>
							)}

							<div className="space-y-2">
								<Label htmlFor="new-password" className="text-white">
									{t.newPassword}
								</Label>
								<Input
									id="new-password"
									type="password"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
									placeholder="••••••••"
									className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-500/50"
									required
									minLength={6}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="confirm-password" className="text-white">
									{t.confirmPassword}
								</Label>
								<Input
									id="confirm-password"
									type="password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									placeholder="••••••••"
									className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-500/50"
									required
									minLength={6}
								/>
							</div>
						</div>

						<DialogFooter>
							<Button
								type="button"
								variant="ghost"
								onClick={handleClose}
								className="text-white/70 hover:text-white hover:bg-white/10"
							>
								{t.consultationCancel}
							</Button>
							<Button
								type="submit"
								className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
							>
								{t.resetPasswordButton}
							</Button>
						</DialogFooter>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
}
