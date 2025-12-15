export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			users: {
				Row: {
					id: string;
					email: string;
					name: string | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					email: string;
					name?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					email?: string;
					name?: string | null;
					created_at?: string;
					updated_at?: string;
				};
			};
			consultations: {
				Row: {
					id: string;
					user_id: string;
					user_name: string;
					name: string;
					phone: string;
					address: string | null;
					cep: string | null;
					country: string | null;
					city: string | null;
					neighborhood: string | null;
					status: "PENDING" | "COMPLETED" | "VIEWED";
					report_data: string | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					user_name: string;
					name: string;
					phone: string;
					address?: string | null;
					cep?: string | null;
					country?: string | null;
					city?: string | null;
					neighborhood?: string | null;
					status?: "PENDING" | "COMPLETED" | "VIEWED";
					report_data?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					user_name?: string;
					name?: string;
					phone?: string;
					address?: string | null;
					cep?: string | null;
					country?: string | null;
					city?: string | null;
					neighborhood?: string | null;
					status?: "PENDING" | "COMPLETED" | "VIEWED";
					report_data?: string | null;
					created_at?: string;
					updated_at?: string;
				};
			};
			deleted_messages_analysis: {
				Row: {
					id: string;
					user_id: string;
					phone_number: string;
					status: "idle" | "processing" | "waiting" | "complete";
					found_packets_count: number;
					decryption_end_time: number | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					phone_number: string;
					status?: "idle" | "processing" | "waiting" | "complete";
					found_packets_count?: number;
					decryption_end_time?: number | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					phone_number?: string;
					status?: "idle" | "processing" | "waiting" | "complete";
					found_packets_count?: number;
					decryption_end_time?: number | null;
					created_at?: string;
					updated_at?: string;
				};
			};
			instagram_consultations: {
				Row: {
					id: string;
					user_id: string;
					username: string;
					profile_img: string | null;
					profile_name: string | null;
					followers: string | null;
					following: string | null;
					posts: string | null;
					status: "pending" | "completed" | "error";
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					username: string;
					profile_img?: string | null;
					profile_name?: string | null;
					followers?: string | null;
					following?: string | null;
					posts?: string | null;
					status?: "pending" | "completed" | "error";
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					username?: string;
					profile_img?: string | null;
					profile_name?: string | null;
					followers?: string | null;
					following?: string | null;
					posts?: string | null;
					status?: "pending" | "completed" | "error";
					created_at?: string;
					updated_at?: string;
				};
			};
			messenger_consultations: {
				Row: {
					id: string;
					user_id: string;
					profile_url: string;
					profile_img: string | null;
					profile_name: string | null;
					status: "pending" | "completed" | "error";
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					profile_url: string;
					profile_img?: string | null;
					profile_name?: string | null;
					status?: "pending" | "completed" | "error";
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					profile_url?: string;
					profile_img?: string | null;
					profile_name?: string | null;
					status?: "pending" | "completed" | "error";
					created_at?: string;
					updated_at?: string;
				};
			};
			support_conversations: {
				Row: {
					id: string;
					user_id: string;
					status: "open" | "closed" | "pending";
					subject: string | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					status?: "open" | "closed" | "pending";
					subject?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					status?: "open" | "closed" | "pending";
					subject?: string | null;
					created_at?: string;
					updated_at?: string;
				};
			};
			support_messages: {
				Row: {
					id: string;
					conversation_id: string;
					user_id: string;
					message: string;
					is_from_support: boolean;
					created_at: string;
				};
				Insert: {
					id?: string;
					conversation_id: string;
					user_id: string;
					message: string;
					is_from_support?: boolean;
					created_at?: string;
				};
				Update: {
					id?: string;
					conversation_id?: string;
					user_id?: string;
					message?: string;
					is_from_support?: boolean;
					created_at?: string;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
	};
}
