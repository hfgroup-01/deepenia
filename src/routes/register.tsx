import { LanguageSelector } from "@/components/LanguageSelector";
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
import {
	type Language,
	getStoredLanguage,
	setStoredLanguage,
	translations,
} from "@/lib/i18n";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/register")({
	component: RegisterPage,
});

export function RegisterPage() {
	const { register, isLoading } = useAuthContext();
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [language, setLanguage] = useState<Language>(getStoredLanguage());
	const t = translations[language];

	const handleLanguageChange = (newLanguage: Language) => {
		setLanguage(newLanguage);
		setStoredLanguage(newLanguage);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!name || !email || !password || !confirmPassword) {
			setError(t.allFieldsRequired);
			return;
		}

		if (password !== confirmPassword) {
			setError(t.passwordsDontMatch);
			return;
		}

		if (password.length < 6) {
			setError(t.passwordMinLength);
			return;
		}

		try {
			await register(email, password, name);
			navigate({ to: "/" });
		} catch (err) {
			setError(err instanceof Error ? err.message : t.registerError);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center relative overflow-hidden">
			<ModernBackground />

			{/* Language Selector - Top Right */}
			<div className="absolute top-4 right-4 z-20">
				<LanguageSelector
					currentLanguage={language}
					onLanguageChange={handleLanguageChange}
				/>
			</div>

			<div className="relative z-10 w-full max-w-md px-4">
				<Card className="backdrop-blur-xl bg-black/40 border-white/20 shadow-2xl">
					<CardHeader className="space-y-1">
						<CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
							{t.registerTitle}
						</CardTitle>
						<CardDescription className="text-white/70 text-center">
							{t.registerDescription}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name" className="text-white">
									{t.fullName}
								</Label>
								<div className="relative">
									<User className="absolute left-3 top-3 size-4 text-white/50" />
									<Input
										id="name"
										type="text"
										placeholder={t.fullNamePlaceholder}
										value={name}
										onChange={(e) => setName(e.target.value)}
										className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
										disabled={isLoading}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="email" className="text-white">
									{t.email}
								</Label>
								<div className="relative">
									<Mail className="absolute left-3 top-3 size-4 text-white/50" />
									<Input
										id="email"
										type="email"
										placeholder={t.emailPlaceholder}
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
										disabled={isLoading}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="password" className="text-white">
									{t.password}
								</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-3 size-4 text-white/50" />
									<Input
										id="password"
										type="password"
										placeholder={t.passwordPlaceholder}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
										disabled={isLoading}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="confirmPassword" className="text-white">
									{t.confirmPasswordLabel}
								</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-3 size-4 text-white/50" />
									<Input
										id="confirmPassword"
										type="password"
										placeholder={t.confirmPasswordPlaceholder}
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
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
								{isLoading ? t.creatingAccount : t.registerButton}
							</Button>

							<div className="text-center text-sm text-white/70">
								{t.haveAccount}{" "}
								<button
									type="button"
									onClick={() => navigate({ to: "/login" })}
									className="text-purple-400 hover:text-purple-300 transition-colors font-semibold"
								>
									{t.loginLink}
								</button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
