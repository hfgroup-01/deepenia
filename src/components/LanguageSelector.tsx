import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Language } from "@/lib/i18n";

interface LanguageSelectorProps {
	currentLanguage: Language;
	onLanguageChange: (language: Language) => void;
}

const languageData: Record<Language, { name: string; flag: string }> = {
	en: { name: "English", flag: "🇺🇸" },
	es: { name: "Español", flag: "🇪🇸" },
	fr: { name: "Français", flag: "🇫🇷" },
	pt: { name: "Português", flag: "🇧🇷" },
	it: { name: "Italiano", flag: "🇮🇹" },
};

export function LanguageSelector({
	currentLanguage,
	onLanguageChange,
}: LanguageSelectorProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="text-white hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all"
					aria-label="Select language"
				>
					<span className="text-2xl">{languageData[currentLanguage].flag}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="backdrop-blur-xl bg-white/10 border-white/20 text-white"
			>
				{(Object.keys(languageData) as Language[]).map((lang) => (
					<DropdownMenuItem
						key={lang}
						onClick={() => onLanguageChange(lang)}
						className="cursor-pointer hover:bg-white/20 focus:bg-white/20 focus:text-white"
					>
						<span className="mr-2 text-xl">{languageData[lang].flag}</span>
						<span className="flex-1">{languageData[lang].name}</span>
						{currentLanguage === lang && (
							<span className="ml-2 text-purple-400">✓</span>
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
