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

interface WhatsAppConsultationDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (data: ConsultationFormData) => void;
	t: Translation;
	currentLanguage: string;
}

export interface ConsultationFormData {
	name: string;
	phone: string;
	address: string;
	cep: string;
	country: string;
	city: string;
	neighborhood: string;
	language: string;
}

export function WhatsAppConsultationDialog({
	open,
	onOpenChange,
	onSubmit,
	t,
	currentLanguage,
}: WhatsAppConsultationDialogProps) {
	const [formData, setFormData] = useState<ConsultationFormData>({
		name: "",
		phone: "",
		address: "",
		cep: "",
		country: "",
		city: "",
		neighborhood: "",
		language: currentLanguage,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
		// Reset form
		setFormData({
			name: "",
			phone: "",
			address: "",
			cep: "",
			country: "",
			city: "",
			neighborhood: "",
			language: currentLanguage,
		});
	};

	const handleChange = (field: keyof ConsultationFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[600px] bg-black/95 border-green-500/30 text-white backdrop-blur-xl">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
						{t.consultationTitle}
					</DialogTitle>
					<DialogDescription className="text-white/70">
						{t.consultationDesc}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-1 gap-4">
							<div className="space-y-2">
								<Label htmlFor="name" className="text-white">
									{t.consultationName}
								</Label>
								<Input
									id="name"
									value={formData.name}
									onChange={(e) => handleChange("name", e.target.value)}
									className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="phone" className="text-white">
									{t.consultationPhone}
								</Label>
								<Input
									id="phone"
									type="tel"
									value={formData.phone}
									onChange={(e) => handleChange("phone", e.target.value)}
									className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="address" className="text-white">
									{t.consultationAddress}
								</Label>
								<Input
									id="address"
									value={formData.address}
									onChange={(e) => handleChange("address", e.target.value)}
									className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
									required
								/>
							</div>

							<div className="grid grid-cols-3 gap-4">
								<div className="space-y-2">
									<Label htmlFor="cep" className="text-white">
										{t.consultationCep}
									</Label>
									<Input
										id="cep"
										value={formData.cep}
										onChange={(e) => handleChange("cep", e.target.value)}
										className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
										required
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="country" className="text-white">
										{t.consultationCountry}
									</Label>
									<Input
										id="country"
										value={formData.country}
										onChange={(e) => handleChange("country", e.target.value)}
										className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
										required
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="city" className="text-white">
										{t.consultationCity}
									</Label>
									<Input
										id="city"
										value={formData.city}
										onChange={(e) => handleChange("city", e.target.value)}
										className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
										required
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="neighborhood" className="text-white">
									{t.consultationNeighborhood}
								</Label>
								<Input
									id="neighborhood"
									value={formData.neighborhood}
									onChange={(e) => handleChange("neighborhood", e.target.value)}
									className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
									required
								/>
							</div>
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
							className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
						>
							{t.consultationSubmit}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
