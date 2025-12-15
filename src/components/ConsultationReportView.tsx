import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Translation } from "@/lib/i18n";
import { ArrowLeft } from "lucide-react";

interface ConsultationReportViewProps {
	reportData: string;
	onBack: () => void;
	t: Translation;
}

export function ConsultationReportView({
	reportData,
	onBack,
	t,
}: ConsultationReportViewProps) {
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
					<CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
						Relatório de Consulta
					</CardTitle>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[600px] pr-4">
						<div className="space-y-4">
							<div className="p-6 rounded-xl bg-green-500/10 border border-green-500/30">
								<div className="prose prose-invert max-w-none">
									<div className="whitespace-pre-wrap text-white/90 leading-relaxed">
										{reportData}
									</div>
								</div>
							</div>
						</div>
					</ScrollArea>
				</CardContent>
			</Card>
		</div>
	);
}
