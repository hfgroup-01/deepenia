import { ResetPasswordDialog } from "@/components/ResetPasswordDialog";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Translation } from "@/lib/i18n";
import { KeyRound, Settings } from "lucide-react";
import { useState } from "react";

interface DeepenIaHeaderProps {
	t: Translation;
	onNavigate: (section: "home" | "clone" | "support") => void;
}

export function DeepenIaHeader({ t, onNavigate }: DeepenIaHeaderProps) {
	const [showResetPassword, setShowResetPassword] = useState(false);

	return (
		<header className="border-b border-white/10 backdrop-blur-xl bg-black/40 sticky top-0 z-50">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<button
						type="button"
						onClick={() => onNavigate("home")}
						className="flex items-center gap-3 group cursor-pointer"
					>
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-r from-[#FF2358] to-[#FF2358]/70 rounded-lg blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
							<div className="relative bg-black px-4 py-2 rounded-lg border border-white/20 group-hover:border-white/40 transition-colors">
								<span className="text-2xl font-black bg-gradient-to-r from-[#FF2358] to-white bg-clip-text text-transparent">
									DEEPEN IA
								</span>
							</div>
						</div>
					</button>

					{/* Navigation */}
					<nav className="hidden md:flex items-center gap-6">
						<Button
							variant="ghost"
							onClick={() => onNavigate("support")}
							className="text-white/80 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20 transition-all"
						>
							{t.support}
						</Button>
					</nav>

					{/* Profile Settings */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="text-white hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/40 transition-all rounded-full"
							>
								<Settings className="size-5" />
								<span className="sr-only">{t.profile}</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="w-56 backdrop-blur-xl bg-black/90 border-white/20"
						>
							<DropdownMenuLabel className="text-white">
								{t.profile}
							</DropdownMenuLabel>
							<DropdownMenuSeparator className="bg-white/10" />
							<DropdownMenuItem
								onClick={() => setShowResetPassword(true)}
								className="text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
							>
								<KeyRound className="mr-2 size-4" />
								<span>{t.forgotPassword}</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Mobile Navigation */}
				<nav className="md:hidden flex flex-wrap gap-2 mt-4">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => onNavigate("support")}
						className="text-white/80 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20 transition-all flex-1"
					>
						{t.support}
					</Button>
				</nav>
			</div>

			{/* Reset Password Dialog */}
			<ResetPasswordDialog
				open={showResetPassword}
				onOpenChange={setShowResetPassword}
				t={t}
			/>
		</header>
	);
}
