import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Translation } from "@/lib/i18n";
import { ArrowLeft } from "lucide-react";

interface InstagramProfileViewProps {
	profileData: InstagramProfileData;
	onBack: () => void;
	t: Translation;
}

export interface InstagramProfileData {
	img: string; // Base64 image
	name: string;
	username: string;
	seguidores: string;
	seguindo: string;
	publicacoes: string;
}

export function InstagramProfileView({
	profileData,
	onBack,
	t,
}: InstagramProfileViewProps) {
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

			<Card className="backdrop-blur-xl bg-white/10 border-pink-500/30 overflow-hidden">
				<CardHeader className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 border-b border-pink-500/30">
					<h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent text-center">
						{t.instagramProfileTitle}
					</h2>
				</CardHeader>
				<CardContent className="p-8">
					{/* Profile Header */}
					<div className="flex flex-col items-center mb-8">
						{/* Profile Picture */}
						<div className="mb-6">
							<div className="relative">
								<div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full blur-md opacity-50" />
								<img
									src={
										profileData.img.startsWith("data:")
											? profileData.img
											: `data:image/jpeg;base64,${profileData.img}`
									}
									alt={profileData.name}
									className="relative size-32 rounded-full object-cover border-4 border-white/20"
								/>
							</div>
						</div>

						{/* Name and Username */}
						<div className="text-center mb-6">
							<h3 className="text-2xl font-bold text-white mb-1">
								{profileData.name}
							</h3>
							<p className="text-lg text-pink-400">@{profileData.username}</p>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-3 gap-8 w-full max-w-md">
							<div className="text-center">
								<div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 mb-2">
									<p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
										{profileData.publicacoes}
									</p>
								</div>
								<p className="text-white/70 text-sm font-medium">
									{t.instagramProfilePosts}
								</p>
							</div>

							<div className="text-center">
								<div className="bg-pink-500/20 border border-pink-500/30 rounded-lg p-4 mb-2">
									<p className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-orange-500 bg-clip-text text-transparent">
										{profileData.seguidores}
									</p>
								</div>
								<p className="text-white/70 text-sm font-medium">
									{t.instagramProfileFollowers}
								</p>
							</div>

							<div className="text-center">
								<div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4 mb-2">
									<p className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
										{profileData.seguindo}
									</p>
								</div>
								<p className="text-white/70 text-sm font-medium">
									{t.instagramProfileFollowing}
								</p>
							</div>
						</div>
					</div>

					{/* Security Analysis Section */}
					<div className="mt-8 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/30 rounded-lg p-6">
						<h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-4 flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="size-6 text-green-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-label="Security check"
							>
								<title>Security check</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							{t.instagramAnalysisTitle}
						</h3>
						<p className="text-white/80 leading-relaxed">
							{t.instagramAnalysisMessage}
						</p>
					</div>

					{/* Back Button */}
					<div className="flex justify-center mt-8">
						<Button
							onClick={onBack}
							className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
						>
							{t.backToDashboard}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
