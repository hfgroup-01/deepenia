export interface Contact {
	id: string;
	name: string;
	username?: string;
	status: "online" | "offline" | "active";
	lastSeen?: string;
	avatar: string;
}

export interface Message {
	id: string;
	contactId: string;
	content: string;
	timestamp: string;
	isIncoming: boolean;
}

export interface MediaItem {
	id: string;
	contactId: string;
	url: string;
	type: "image" | "video" | "document";
	timestamp: string;
}

export interface PlatformData {
	contacts: Contact[];
	messages: Message[];
	media: MediaItem[];
	stats: {
		messageCount: number;
		activeChats: number;
		mediaCount: number;
		followers?: number;
	};
}

// WhatsApp Demo Data
export const whatsappData: PlatformData = {
	contacts: [
		{
			id: "wa1",
			name: "Sarah Chen",
			status: "online",
			lastSeen: "2 min ago",
			avatar: "https://i.pravatar.cc/150?img=1",
		},
		{
			id: "wa2",
			name: "Marcus Rodriguez",
			status: "active",
			lastSeen: "10 min ago",
			avatar: "https://i.pravatar.cc/150?img=12",
		},
		{
			id: "wa3",
			name: "Emma Wilson",
			status: "offline",
			lastSeen: "1 hour ago",
			avatar: "https://i.pravatar.cc/150?img=5",
		},
		{
			id: "wa4",
			name: "James Park",
			status: "active",
			lastSeen: "5 min ago",
			avatar: "https://i.pravatar.cc/150?img=13",
		},
		{
			id: "wa5",
			name: "Olivia Martinez",
			status: "online",
			lastSeen: "Just now",
			avatar: "https://i.pravatar.cc/150?img=9",
		},
	],
	messages: [
		{
			id: "wm1",
			contactId: "wa1",
			content: "Hey! Just checking in on the project status.",
			timestamp: "2025-10-29T10:30:00Z",
			isIncoming: true,
		},
		{
			id: "wm2",
			contactId: "wa1",
			content: "Everything is on track. We should be ready by Friday.",
			timestamp: "2025-10-29T10:32:00Z",
			isIncoming: false,
		},
		{
			id: "wm3",
			contactId: "wa2",
			content: "Can we schedule a call for tomorrow?",
			timestamp: "2025-10-29T09:15:00Z",
			isIncoming: true,
		},
		{
			id: "wm4",
			contactId: "wa2",
			content: "Sure, how about 2 PM?",
			timestamp: "2025-10-29T09:20:00Z",
			isIncoming: false,
		},
		{
			id: "wm5",
			contactId: "wa4",
			content: "Thanks for the update on the timeline.",
			timestamp: "2025-10-29T08:45:00Z",
			isIncoming: true,
		},
		{
			id: "wm6",
			contactId: "wa5",
			content: "Looking forward to our meeting!",
			timestamp: "2025-10-29T11:00:00Z",
			isIncoming: true,
		},
	],
	media: [
		{
			id: "wmed1",
			contactId: "wa1",
			url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300",
			type: "image",
			timestamp: "2025-10-29T10:00:00Z",
		},
		{
			id: "wmed2",
			contactId: "wa2",
			url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300",
			type: "image",
			timestamp: "2025-10-29T09:00:00Z",
		},
		{
			id: "wmed3",
			contactId: "wa4",
			url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300",
			type: "image",
			timestamp: "2025-10-29T08:30:00Z",
		},
	],
	stats: {
		messageCount: 156,
		activeChats: 5,
		mediaCount: 23,
	},
};

// Instagram Demo Data
export const instagramData: PlatformData = {
	contacts: [
		{
			id: "ig1",
			name: "Luna Rivera",
			username: "@luna.creative",
			status: "online",
			lastSeen: "Active now",
			avatar: "https://i.pravatar.cc/150?img=20",
		},
		{
			id: "ig2",
			name: "Max Sterling",
			username: "@maxsterling",
			status: "offline",
			lastSeen: "3 hours ago",
			avatar: "https://i.pravatar.cc/150?img=15",
		},
		{
			id: "ig3",
			name: "Aria Bennett",
			username: "@ariabennett",
			status: "active",
			lastSeen: "20 min ago",
			avatar: "https://i.pravatar.cc/150?img=23",
		},
		{
			id: "ig4",
			name: "Ethan Brooks",
			username: "@ethan.brooks",
			status: "online",
			lastSeen: "Active now",
			avatar: "https://i.pravatar.cc/150?img=17",
		},
		{
			id: "ig5",
			name: "Mia Torres",
			username: "@mia_torres",
			status: "offline",
			lastSeen: "1 day ago",
			avatar: "https://i.pravatar.cc/150?img=24",
		},
	],
	messages: [
		{
			id: "im1",
			contactId: "ig1",
			content: "Love your recent post! 🔥",
			timestamp: "2025-10-29T13:00:00Z",
			isIncoming: true,
		},
		{
			id: "im2",
			contactId: "ig1",
			content: "Thanks so much! 🙏",
			timestamp: "2025-10-29T13:02:00Z",
			isIncoming: false,
		},
		{
			id: "im3",
			contactId: "ig4",
			content: "Are you attending the event next week?",
			timestamp: "2025-10-29T12:30:00Z",
			isIncoming: true,
		},
		{
			id: "im4",
			contactId: "ig4",
			content: "Definitely! See you there.",
			timestamp: "2025-10-29T12:35:00Z",
			isIncoming: false,
		},
		{
			id: "im5",
			contactId: "ig3",
			content: "Check out my story!",
			timestamp: "2025-10-29T11:45:00Z",
			isIncoming: true,
		},
	],
	media: [
		{
			id: "imed1",
			contactId: "ig1",
			url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300",
			type: "image",
			timestamp: "2025-10-29T12:50:00Z",
		},
		{
			id: "imed2",
			contactId: "ig4",
			url: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=300",
			type: "image",
			timestamp: "2025-10-29T12:20:00Z",
		},
		{
			id: "imed3",
			contactId: "ig3",
			url: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=300",
			type: "image",
			timestamp: "2025-10-29T11:30:00Z",
		},
	],
	stats: {
		messageCount: 124,
		activeChats: 5,
		mediaCount: 18,
		followers: 2847,
	},
};
