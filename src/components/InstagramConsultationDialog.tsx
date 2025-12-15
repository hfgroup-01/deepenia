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
import type { Translation } from "@/lib/i18n";
import { useState } from "react";

interface InstagramConsultationDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (username: string) => void;
	t: Translation;
}

export function InstagramConsultationDialog({
	open,
	onOpenChange,
	onSubmit,
	t,
}: InstagramConsultationDialogProps) {
	const [username, setUsername] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Remove @ if present
		const cleanUsername = username.startsWith("@")
			? username.substring(1)
			: username;
		onSubmit(cleanUsername);
		// Reset form
		setUsername("");
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px] bg-black/95 border-pink-500/30 text-white backdrop-blur-xl">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent">
						{t.instagramConsultationTitle}
					</DialogTitle>
					<DialogDescription className="text-white/70">
						{t.instagramConsultationDesc}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="space-y-2">
							<Label htmlFor="username" className="text-white">
								{t.instagramConsultationUsername}
							</Label>
							<Input
								id="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								placeholder={t.instagramConsultationPlaceholder}
								className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
								required
							/>
						</div>
					</div>
					<DialogFooter className="gap-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
							className="bg-white/10 border-white/20 text-white hover:bg-white/20"
						>
							{t.consultationCancel}
						</Button>
						<Button
							type="submit"
							className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white"
						>
							{t.consultationSubmit}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
