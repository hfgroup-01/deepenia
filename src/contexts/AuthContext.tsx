import { createContext, useContext, useEffect, useState } from "react";
import type React from "react";

interface User {
	id: string;
	email: string;
	name: string;
}

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string, name: string) => Promise<void>;
	logout: () => void;
	resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// Check for existing session on mount
	useEffect(() => {
		const storedUser = localStorage.getItem("deepen_ia_user");
		if (storedUser) {
			try {
				const parsedUser = JSON.parse(storedUser);

				// MIGRAÇÃO: Se o user.id NÃO for um email, atualizar para o formato de email
				if (
					parsedUser.id &&
					parsedUser.email &&
					parsedUser.id !== parsedUser.email
				) {
					console.log("🔄 MIGRAÇÃO: Detectado ID antigo:", parsedUser.id);
					console.log("🔄 MIGRAÇÃO: Migrando para email:", parsedUser.email);

					// Armazenar o ID antigo para migração de dados
					const oldId = parsedUser.id;

					// Atualizar para o novo formato (email como ID)
					const migratedUser: User = {
						...parsedUser,
						id: parsedUser.email, // Email como ID fixo
					};

					// Salvar usuário migrado
					localStorage.setItem("deepen_ia_user", JSON.stringify(migratedUser));

					// Armazenar o ID antigo para que possamos migrar as consultas
					localStorage.setItem("migration_old_id", oldId);

					console.log("✅ MIGRAÇÃO: Usuário atualizado com sucesso!");
					console.log("✅ MIGRAÇÃO: Novo ID (email):", migratedUser.id);

					setUser(migratedUser);
				} else {
					// Usuário já está no formato correto
					setUser(parsedUser);
				}
			} catch (e) {
				console.error("Failed to parse stored user", e);
				localStorage.removeItem("deepen_ia_user");
			}
		}
		setIsLoading(false);
	}, []);

	const login = async (email: string, password: string) => {
		setIsLoading(true);
		try {
			// Simulated login - In production, this would call your API
			// Check if user exists in localStorage (registered users)
			const storedUsers = localStorage.getItem("deepen_ia_users");
			const users = storedUsers ? JSON.parse(storedUsers) : [];

			const foundUser = users.find(
				(u: { email: string; password: string }) =>
					u.email === email && u.password === password,
			);

			if (!foundUser) {
				throw new Error("Credenciais inválidas");
			}

			// Usar email como ID fixo
			const loggedInUser: User = {
				id: email, // EMAIL COMO ID FIXO
				email: email,
				name: foundUser.name,
			};

			console.log("✅ LOGIN: User ID atribuído (EMAIL):", loggedInUser.id);
			console.log("✅ LOGIN: Email:", loggedInUser.email);
			console.log("✅ LOGIN: Nome:", loggedInUser.name);

			setUser(loggedInUser);
			localStorage.setItem("deepen_ia_user", JSON.stringify(loggedInUser));
		} finally {
			setIsLoading(false);
		}
	};

	const register = async (email: string, password: string, name: string) => {
		setIsLoading(true);
		try {
			// Simulated registration - In production, this would call your API
			const storedUsers = localStorage.getItem("deepen_ia_users");
			const users = storedUsers ? JSON.parse(storedUsers) : [];

			// Check if user already exists
			const existingUser = users.find(
				(u: { email: string }) => u.email === email,
			);
			if (existingUser) {
				throw new Error("Email já cadastrado");
			}

			// Usar email como ID fixo
			const newUser = {
				id: email, // EMAIL COMO ID FIXO
				email,
				password, // In production, never store plain passwords!
				name,
			};

			console.log("✅ REGISTRO: User ID gerado (EMAIL):", newUser.id);
			console.log("✅ REGISTRO: Email:", newUser.email);
			console.log("✅ REGISTRO: Nome:", newUser.name);
			console.log("💡 ID = EMAIL (consistente e permanente)");

			users.push(newUser);
			localStorage.setItem("deepen_ia_users", JSON.stringify(users));

			// Auto login after registration
			const loggedInUser: User = {
				id: email, // EMAIL COMO ID FIXO
				email: email,
				name: name,
			};

			setUser(loggedInUser);
			localStorage.setItem("deepen_ia_user", JSON.stringify(loggedInUser));

			// IMPORTANTE: Limpar consultas antigas ao registrar novo usuário
			console.log("🗑️ Limpando consultas antigas do localStorage...");
			const consultationKeys = Object.keys(localStorage).filter(
				(key) => key.startsWith("consultation_") || key === "consultations",
			);
			for (const key of consultationKeys) {
				localStorage.removeItem(key);
				console.log(`🗑️ Removido: ${key}`);
			}
			console.log("✅ Consultas antigas limpas!");
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("spymate_user");
	};

	const resetPassword = async (email: string) => {
		setIsLoading(true);
		try {
			// Simulated password reset - In production, this would send an email
			const storedUsers = localStorage.getItem("deepen_ia_users");
			const users = storedUsers ? JSON.parse(storedUsers) : [];

			const foundUser = users.find((u: { email: string }) => u.email === email);
			if (!foundUser) {
				throw new Error("Email não encontrado");
			}

			// Simulate email sent
			console.log("Password reset email sent to:", email);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				isLoading,
				login,
				register,
				logout,
				resetPassword,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
}
