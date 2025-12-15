export type Language = "en" | "es" | "fr" | "pt" | "it";

export interface Translation {
	title: string;
	selectLanguage: string;
	dashboard: string;
	selectPlatform: string;
	whatsapp: string;
	instagram: string;
	backToDashboard: string;
	contacts: string;
	messages: string;
	media: string;
	statistics: string;
	messageCount: string;
	activeChats: string;
	mediaCount: string;
	conversations: string;
	threads: string;
	followers: string;
	online: string;
	offline: string;
	active: string;
	viewDetails: string;
	noMessages: string;
	loading: string;
	cloneWhatsApp: string;
	howToUse: string;
	support: string;
	profile: string;
	greeting: string;
	// WhatsApp consultation
	consultationTitle: string;
	consultationDesc: string;
	consultationName: string;
	consultationPhone: string;
	consultationAddress: string;
	consultationCep: string;
	consultationCountry: string;
	consultationCity: string;
	consultationNeighborhood: string;
	consultationSubmit: string;
	consultationCancel: string;
	consultationProgress: string;
	consultationDay: string;
	consultationComplete: string;
	consultationProcessing: string;
	accessConsultation: string;
	makeConsultation: string;
	// Support chat
	chatTitle: string;
	chatStatus: string;
	chatWelcome: string;
	chatInstruction: string;
	chatPlaceholder: string;
	chatAgentResponse: string;
	// Clone WhatsApp Tutorial
	cloneTutorialTitle: string;
	cloneTutorialStep1Title: string;
	cloneTutorialStep1Desc: string;
	cloneTutorialStep2Title: string;
	cloneTutorialStep2Desc: string;
	cloneTutorialStep3Title: string;
	cloneTutorialStep3Desc: string;
	cloneTutorialStep4Title: string;
	cloneTutorialStep4Desc: string;
	cloneTutorialStep5Title: string;
	cloneTutorialStep5Desc: string;
	cloneTutorialStep6Title: string;
	cloneTutorialStep6Desc: string;
	cloneTutorialStep7Title: string;
	cloneTutorialStep7Desc: string;
	cloneTutorialStep8Title: string;
	cloneTutorialStep8Desc: string;
	// Instagram consultation
	instagramConsultationTitle: string;
	instagramConsultationDesc: string;
	instagramConsultationUsername: string;
	instagramConsultationPlaceholder: string;
	instagramTerminalConnecting: string;
	instagramTerminalProcessing: string;
	instagramTerminalValidating: string;
	instagramTerminalFetching: string;
	instagramTerminalComplete: string;
	instagramProfileTitle: string;
	instagramProfileFollowers: string;
	instagramProfileFollowing: string;
	instagramProfilePosts: string;
	instagramAnalysisTitle: string;
	instagramAnalysisMessage: string;
	viewLastFollowers: string;
	monitorFollowersTitle: string;
	monitorFollowersSubtitle: string;
	// Edit Profile & Reset Password
	editProfile: string;
	forgotPassword: string;
	resetPasswordTitle: string;
	resetPasswordDesc: string;
	newPassword: string;
	confirmPassword: string;
	resetPasswordButton: string;
	passwordResetSuccess: string;
	passwordResetWarning: string;
	redirectingToLogin: string;
	passwordMismatch: string;
	passwordTooShort: string;
	userNotFound: string;
	// Real-time messages
	viewRealTimeMessages: string;
	realTimeMessagesTitle: string;
	realTimeMessagesWarning: string;
	// Terminal warning message
	terminalWarningTitle: string;
	terminalWarningMessage: string;
	terminalWarningDays: string;
	terminalSuccessTitle: string;
	terminalSuccessMessage: string;
	backToMenu: string;
	// Refund
	refund: string;
	// Deleted Messages Tab
	tab_title: string;
	analysis_title: string;
	analysis_description: string;
	analysis_start_button: string;
	waiting_title: string;
	waiting_subtitle: string;
	waiting_instruction: string;
	report_title: string;
	report_body: string;
	report_reset_button: string;
	// Phone Number Popup
	phone_popup_title: string;
	phone_popup_description: string;
	phone_popup_label: string;
	phone_popup_placeholder: string;
	phone_popup_button: string;
	phone_popup_cancel: string;
	phone_popup_error: string;
	// Terminal Process Lines
	terminal_starting: string;
	terminal_connecting: string;
	terminal_connection_established: string;
	terminal_processing_data: string;
	terminal_validating_info: string;
	terminal_sending_analysis: string;
	terminal_data_received: string;
	terminal_creating_request: string;
	terminal_consultation_registered: string;
	terminal_processing_started: string;
	terminal_process_duration: string;
	terminal_notification_message: string;
	terminal_awaiting_response: string;
	terminal_consultation_ongoing: string;
	terminal_server_response: string;
	terminal_processing_completed: string;
	terminal_result_header: string;
	terminal_result_footer: string;
	terminal_consultation_finished: string;
	// Terminal Loading Screen (WhatsApp specific)
	terminal_loading_starting_whatsapp: string;
	terminal_loading_processing_user_data: string;
	terminal_loading_analyzing_messages: string;
	terminal_loading_verifying_contacts: string;
	terminal_loading_processing_media: string;
	terminal_loading_extracting_profile: string;
	terminal_loading_profile_analyzed: string;
	terminal_loading_querying_database: string;
	terminal_loading_crossing_info: string;
	terminal_loading_generating_report: string;
	terminal_loading_applying_algorithms: string;
	terminal_loading_analysis_ongoing: string;
	terminal_loading_awaiting_server: string;
	terminal_loading_standby_mode: string;
	// Last Report
	viewLastReport: string;
	lastReportTitle: string;
	lastReportNotFound: string;
	lastReportLoading: string;
	// View Result
	viewResult: string;
	viewResultTitle: string;
	spyingSchedule: string;
	spyingScheduleMessage: string;
	daysRemaining: string;
	resultAvailableIn: string;
	resultReady: string;
	// Progress Bar & Fidelity Message
	decryptionProgress: string;
	faithfulMessage: string;
	// Login & Register
	welcomeBack: string;
	loginDescription: string;
	email: string;
	emailPlaceholder: string;
	password: string;
	passwordPlaceholder: string;
	loginButton: string;
	loggingIn: string;
	noAccount: string;
	createAccount: string;
	registerTitle: string;
	registerDescription: string;
	fullName: string;
	fullNamePlaceholder: string;
	confirmPasswordLabel: string;
	confirmPasswordPlaceholder: string;
	registerButton: string;
	creatingAccount: string;
	haveAccount: string;
	loginLink: string;
	allFieldsRequired: string;
	passwordsDontMatch: string;
	passwordMinLength: string;
	loginError: string;
	registerError: string;
}

export const translations: Record<Language, Translation> = {
	en: {
		title: "Matrix Messaging Dashboard",
		selectLanguage: "Select Language",
		dashboard: "Dashboard",
		selectPlatform: "Select Platform",
		whatsapp: "WhatsApp",
		instagram: "Instagram",
		backToDashboard: "Back to Dashboard",
		contacts: "Contacts",
		messages: "Messages",
		media: "Media",
		statistics: "Statistics",
		messageCount: "Message Count",
		activeChats: "Active Chats",
		mediaCount: "Media Count",
		conversations: "Conversations",
		threads: "Threads",
		followers: "Followers",
		online: "Online",
		offline: "Offline",
		active: "Active",
		viewDetails: "View Details",
		noMessages: "No messages",
		loading: "Loading...",
		cloneWhatsApp: "Clone WhatsApp",
		howToUse: "How to Use the App",
		support: "Support",
		profile: "Profile",
		greeting: "Hello",
		consultationTitle: "WhatsApp Consultation",
		consultationDesc: "Enter the information of the person to be consulted",
		consultationName: "Full Name",
		consultationPhone: "Phone Number",
		consultationAddress: "Address",
		consultationCep: "Postal Code",
		consultationCountry: "Country",
		consultationCity: "City",
		consultationNeighborhood: "Neighborhood",
		consultationSubmit: "Request Consultation",
		consultationCancel: "Cancel",
		consultationProgress: "Consultation in Progress",
		consultationDay: "Day",
		consultationComplete: "Consultation Complete!",
		consultationProcessing: "Processing your consultation request...",
		accessConsultation: "Access Consultation",
		makeConsultation: "Make Consultation",
		chatTitle: "Support Team",
		chatStatus: "Online - Ready to help",
		chatWelcome: "Welcome to DEEPEN IA Support!",
		chatInstruction: "Type your question below and we'll help you",
		chatPlaceholder: "Type your message...",
		chatAgentResponse:
			"Thank you for your message. An agent will assist you shortly.",
		cloneTutorialTitle: "WhatsApp Cloning Tutorial",
		cloneTutorialStep1Title: "First step:",
		cloneTutorialStep1Desc:
			"Download WhatsApp Business. Open WhatsApp Business, go to the home screen and click on the 3 dots located at the top.",
		cloneTutorialStep2Title: "Second step:",
		cloneTutorialStep2Desc: 'Click on "Link as companion device".',
		cloneTutorialStep3Title: "Third step:",
		cloneTutorialStep3Desc:
			"A QR Code will open. Now, the next step is to secretly take your partner's phone.",
		cloneTutorialStep4Title: "Fourth step:",
		cloneTutorialStep4Desc: 'On your partner\'s phone, go to "Settings".',
		cloneTutorialStep5Title: "Fifth step:",
		cloneTutorialStep5Desc: 'Then, go to "Linked devices".',
		cloneTutorialStep6Title: "Sixth step:",
		cloneTutorialStep6Desc: "Next, scan the QR Code on your phone.",
		cloneTutorialStep7Title: "Seventh step:",
		cloneTutorialStep7Desc: "Wait for message synchronization to complete.",
		cloneTutorialStep8Title: "Eighth step:",
		cloneTutorialStep8Desc:
			"It is recommended to disable all WhatsApp Business notifications so that you are not identified by your partner.",
		instagramConsultationTitle: "Instagram Consultation",
		instagramConsultationDesc:
			"Enter the Instagram username of the person to consult",
		instagramConsultationUsername: "Instagram Username",
		instagramConsultationPlaceholder: "Enter @username or username",
		instagramTerminalConnecting: "Connecting to Instagram servers...",
		instagramTerminalProcessing: "Processing request...",
		instagramTerminalValidating: "Validating username...",
		instagramTerminalFetching: "Fetching profile data...",
		instagramTerminalComplete: "Profile data retrieved successfully",
		instagramProfileTitle: "Instagram Profile",
		instagramProfileFollowers: "Followers",
		instagramProfileFollowing: "Following",
		instagramProfilePosts: "Posts",
		instagramAnalysisTitle: "Security Analysis",
		instagramAnalysisMessage:
			"We did not find anything suspicious. We are monitoring and recommend a check every 3 days. We search for suspicious followers, suspicious conversations and suspicious likes. We did not find anything suspicious, we are doing a deeper search. We recommend a check every 3 days to continue the espionage.",
		viewLastFollowers: "View Last Followers",
		monitorFollowersTitle: "(Coming Soon) Monitor Followers",
		monitorFollowersSubtitle: "See your partner's new followers",
		editProfile: "Edit Profile",
		forgotPassword: "Forgot Password",
		resetPasswordTitle: "Reset Password",
		resetPasswordDesc: "Enter your new password below",
		newPassword: "New Password",
		confirmPassword: "Confirm Password",
		resetPasswordButton: "Reset Password",
		passwordResetSuccess: "Password reset successfully!",
		passwordResetWarning: "Please save your new password in a safe place.",
		redirectingToLogin: "Redirecting to login...",
		passwordMismatch: "Passwords do not match",
		passwordTooShort: "Password must be at least 6 characters",
		userNotFound: "User not found",
		viewRealTimeMessages: "View Real-Time Messages",
		realTimeMessagesTitle: "Real-Time Messages",
		realTimeMessagesWarning:
			"IMPORTANT NOTICE: In compliance with communication confidentiality and data privacy regulations (such as the General Data Protection Law - LGPD), we are strictly prohibited from displaying the content of any message, conversation, or media. Violation of this protocol would result in severe legal sanctions. However, our analysis is not based on content, but rather on metadata and behavioral patterns.",
		terminalWarningTitle: "IMPORTANT NOTICE",
		terminalWarningMessage:
			"The consultation is in progress and may take from {days} to be completed. Please wait. You will be able to view the result as soon as the processing is finished.",
		terminalWarningDays: "1 to 3 days",
		terminalSuccessTitle: "CONSULTATION COMPLETED",
		terminalSuccessMessage:
			"The consultation has been processed successfully! The result is displayed above.",
		backToMenu: "Back to Menu",
		refund: "Refund",
		// Deleted Messages Tab
		tab_title: "Deleted Messages",
		analysis_title: "Find Deleted Messages",
		analysis_description:
			"Start a scan to locate and attempt to recover content from deleted messages. The process may take several days.",
		analysis_start_button: "Start Search",
		waiting_title: "Messages Found!",
		waiting_subtitle:
			"We found {{packets_count}} records of deleted messages. We are now beginning the process to attempt content recovery.",
		waiting_instruction:
			"You can close the app. Return after the estimated time to view the report.",
		report_title: "Final Report",
		report_body:
			"Analysis complete. Of the {{packets_count}} records found, the security encryption prevented the content from being recovered. Privacy was maintained.",
		report_reset_button: "Search Again",
		// Phone Number Popup
		phone_popup_title: "Enter Spy Number",
		phone_popup_description:
			"Enter the phone number to monitor before starting the deleted messages search.",
		phone_popup_label: "Phone Number",
		phone_popup_placeholder: "+1 (555) 000-0000",
		phone_popup_button: "Start Analysis",
		phone_popup_cancel: "Cancel",
		phone_popup_error: "Please enter a valid phone number",
		// Terminal Process Lines
		terminal_starting: "$ Starting consultation...",
		terminal_connecting: "> Connecting to servers...",
		terminal_connection_established: "[OK] Connection established",
		terminal_processing_data: "> Processing submitted data...",
		terminal_validating_info: "[INFO] Validating information",
		terminal_sending_analysis: "[INFO] Sending data for analysis...",
		terminal_data_received: "[OK] Data received successfully",
		terminal_creating_request: "> Creating consultation request...",
		terminal_consultation_registered: "[OK] Consultation registered",
		terminal_processing_started: "[INFO] Processing started",
		terminal_process_duration: "[INFO] This process may take 1 to 3 days",
		terminal_notification_message:
			"[INFO] You will be notified when the consultation is ready",
		terminal_awaiting_response: "> System awaiting response...",
		terminal_consultation_ongoing: "$ Consultation in progress",
		terminal_server_response: "> Server response received!",
		terminal_processing_completed: "[OK] Processing completed",
		terminal_result_header: "=== CONSULTATION RESULT ===",
		terminal_result_footer: "=== END OF RESULT ===",
		terminal_consultation_finished: "[OK] Consultation completed successfully",
		// Terminal Loading Screen (WhatsApp specific)
		terminal_loading_starting_whatsapp: "$ Starting WhatsApp consultation...",
		terminal_loading_processing_user_data: "> Processing user data...",
		terminal_loading_analyzing_messages: "[INFO] Analyzing message history",
		terminal_loading_verifying_contacts: "[INFO] Verifying contacts...",
		terminal_loading_processing_media: "[INFO] Processing shared media...",
		terminal_loading_extracting_profile: "> Extracting profile information...",
		terminal_loading_profile_analyzed: "[OK] Profile analyzed successfully",
		terminal_loading_querying_database: "> Querying database...",
		terminal_loading_crossing_info: "[INFO] Cross-referencing information...",
		terminal_loading_generating_report:
			"[INFO] Generating preliminary report...",
		terminal_loading_applying_algorithms: "> Applying analysis algorithms...",
		terminal_loading_analysis_ongoing: "[OK] Analysis in progress",
		terminal_loading_awaiting_server: "> Awaiting server response...",
		terminal_loading_standby_mode: "$ System in standby mode",
		// Last Report
		viewLastReport: "View Last Report",
		lastReportTitle: "Last Consultation Report",
		lastReportNotFound: "No report found. Please make a consultation first.",
		lastReportLoading: "Loading report...",
		// View Result
		viewResult: "View Result",
		viewResultTitle: "Consultation Result",
		spyingSchedule: "Spying Schedule",
		spyingScheduleMessage:
			"Decryption takes 1 to 5 days to complete. Please wait.",
		daysRemaining: "days remaining",
		resultAvailableIn: "Result available in",
		resultReady: "Result ready! Click to view.",
		// Progress Bar & Fidelity Message
		decryptionProgress: "Decryption Progress",
		faithfulMessage:
			"Decryption has been completed and your partner is not cheating on you. Our app was developed to identify suspicious messages that indicate infidelity and nothing was found. We are happy to help. Your partner is 100% FAITHFUL.",
		// Login & Register
		welcomeBack: "Welcome Back",
		loginDescription: "Sign in with your credentials to access DEEPEN IA",
		email: "Email",
		emailPlaceholder: "your@email.com",
		password: "Password",
		passwordPlaceholder: "••••••••",
		loginButton: "Sign In",
		loggingIn: "Signing in...",
		noAccount: "Don't have an account?",
		createAccount: "Create account",
		registerTitle: "Create Account",
		registerDescription: "Fill in your details to start using DEEPEN IA",
		fullName: "Full Name",
		fullNamePlaceholder: "Your name",
		confirmPasswordLabel: "Confirm Password",
		confirmPasswordPlaceholder: "••••••••",
		registerButton: "Create Account",
		creatingAccount: "Creating account...",
		haveAccount: "Already have an account?",
		loginLink: "Sign in",
		allFieldsRequired: "Please fill in all fields",
		passwordsDontMatch: "Passwords do not match",
		passwordMinLength: "Password must be at least 6 characters",
		loginError: "Error signing in",
		registerError: "Error creating account",
	},
	es: {
		title: "Panel de Mensajería Matrix",
		selectLanguage: "Seleccionar Idioma",
		dashboard: "Panel",
		selectPlatform: "Seleccionar Plataforma",
		whatsapp: "WhatsApp",
		instagram: "Instagram",
		backToDashboard: "Volver al Panel",
		contacts: "Contactos",
		messages: "Mensajes",
		media: "Medios",
		statistics: "Estadísticas",
		messageCount: "Cantidad de Mensajes",
		activeChats: "Chats Activos",
		mediaCount: "Cantidad de Medios",
		conversations: "Conversaciones",
		threads: "Hilos",
		followers: "Seguidores",
		online: "En Línea",
		offline: "Desconectado",
		active: "Activo",
		viewDetails: "Ver Detalles",
		noMessages: "Sin mensajes",
		loading: "Cargando...",
		cloneWhatsApp: "Clonar WhatsApp",
		howToUse: "Cómo usar la Aplicación",
		support: "Soporte",
		profile: "Perfil",
		greeting: "Hola",
		consultationTitle: "Consulta WhatsApp",
		consultationDesc: "Ingrese la información de la persona a consultar",
		consultationName: "Nombre Completo",
		consultationPhone: "Número de Teléfono",
		consultationAddress: "Dirección",
		consultationCep: "Código Postal",
		consultationCountry: "País",
		consultationCity: "Ciudad",
		consultationNeighborhood: "Barrio",
		consultationSubmit: "Solicitar Consulta",
		consultationCancel: "Cancelar",
		consultationProgress: "Consulta en Progreso",
		consultationDay: "Día",
		consultationComplete: "¡Consulta Completa!",
		consultationProcessing: "Procesando su solicitud de consulta...",
		accessConsultation: "Acceder a Consulta",
		makeConsultation: "Hacer Consulta",
		chatTitle: "Equipo de Soporte",
		chatStatus: "En línea - Listo para ayudar",
		chatWelcome: "¡Bienvenido al Soporte de DEEPEN IA!",
		chatInstruction: "Escriba su pregunta a continuación y lo ayudaremos",
		chatPlaceholder: "Escribe tu mensaje...",
		chatAgentResponse:
			"Gracias por su mensaje. Un agente lo atenderá en breve.",
		cloneTutorialTitle: "Tutorial de Clonación de WhatsApp",
		cloneTutorialStep1Title: "Primer paso:",
		cloneTutorialStep1Desc:
			"Descarga WhatsApp Business. Abre WhatsApp Business, ve a la pantalla de inicio y haz clic en los 3 puntos ubicados en la parte superior.",
		cloneTutorialStep2Title: "Segundo paso:",
		cloneTutorialStep2Desc:
			'Haz clic en "Conectar como dispositivo adicional".',
		cloneTutorialStep3Title: "Tercer paso:",
		cloneTutorialStep3Desc:
			"Se abrirá un código QR. Ahora, el siguiente paso es tomar, a escondidas, el celular de tu pareja.",
		cloneTutorialStep4Title: "Cuarto paso:",
		cloneTutorialStep4Desc: 'En el celular de tu pareja, ve a "Configuración".',
		cloneTutorialStep5Title: "Quinto paso:",
		cloneTutorialStep5Desc: 'Luego, en "Dispositivos conectados".',
		cloneTutorialStep6Title: "Sexto paso:",
		cloneTutorialStep6Desc:
			"A continuación, escanea el código QR en tu celular.",
		cloneTutorialStep7Title: "Séptimo paso:",
		cloneTutorialStep7Desc:
			"Espera a que se complete la sincronización de mensajes.",
		cloneTutorialStep8Title: "Octavo paso:",
		cloneTutorialStep8Desc:
			"Se recomienda desactivar todas las notificaciones de WhatsApp Business para no ser identificado(a) por tu pareja.",
		instagramConsultationTitle: "Consulta de Instagram",
		instagramConsultationDesc:
			"Ingrese el nombre de usuario de Instagram de la persona a consultar",
		instagramConsultationUsername: "Nombre de Usuario de Instagram",
		instagramConsultationPlaceholder: "Ingrese @usuario o usuario",
		instagramTerminalConnecting: "Conectando a servidores de Instagram...",
		instagramTerminalProcessing: "Procesando solicitud...",
		instagramTerminalValidating: "Validando nombre de usuario...",
		instagramTerminalFetching: "Obteniendo datos del perfil...",
		instagramTerminalComplete: "Datos del perfil obtenidos exitosamente",
		instagramProfileTitle: "Perfil de Instagram",
		instagramProfileFollowers: "Seguidores",
		instagramProfileFollowing: "Siguiendo",
		instagramProfilePosts: "Publicaciones",
		instagramAnalysisTitle: "Análisis de Seguridad",
		instagramAnalysisMessage:
			"No encontramos nada sospechoso. Estamos monitoreando y recomendamos una consulta cada 3 días. Buscamos seguidores sospechosos, conversaciones sospechosas y me gusta sospechosos. No encontramos nada sospechoso, estamos haciendo una búsqueda más profunda. Recomendamos una consulta cada 3 días para continuar el espionaje.",
		viewLastFollowers: "Ver Últimos Seguidores",
		monitorFollowersTitle: "(Próximamente) Monitoreo de Seguidores",
		monitorFollowersSubtitle: "Vea los nuevos seguidores de su pareja",
		editProfile: "Editar Perfil",
		forgotPassword: "Olvidé la Contraseña",
		resetPasswordTitle: "Restablecer Contraseña",
		resetPasswordDesc: "Ingrese su nueva contraseña a continuación",
		newPassword: "Nueva Contraseña",
		confirmPassword: "Confirmar Contraseña",
		resetPasswordButton: "Restablecer Contraseña",
		passwordResetSuccess: "¡Contraseña restablecida con éxito!",
		passwordResetWarning:
			"Por favor, guarde su nueva contraseña en un lugar seguro.",
		redirectingToLogin: "Redirigiendo al inicio de sesión...",
		passwordMismatch: "Las contraseñas no coinciden",
		passwordTooShort: "La contraseña debe tener al menos 6 caracteres",
		userNotFound: "Usuario no encontrado",
		viewRealTimeMessages: "Ver Mensajes en Tiempo Real",
		realTimeMessagesTitle: "Mensajes en Tiempo Real",
		realTimeMessagesWarning:
			"AVISO IMPORTANTE: En conformidad con las regulaciones de secreto de comunicación y privacidad de datos (como la Ley General de Protección de Datos - LGPD), estamos estrictamente prohibidos de mostrar el contenido de cualquier mensaje, conversación o medios. La violación de este protocolo resultaría en severas sanciones legales. Sin embargo, nuestro análisis no se basa en el contenido, sino en metadatos y patrones de comportamiento.",
		terminalWarningTitle: "AVISO IMPORTANTE",
		terminalWarningMessage:
			"La consulta está en curso y puede tardar de {days} en completarse. Por favor, espere. Podrá visualizar el resultado tan pronto como se finalice el procesamiento.",
		terminalWarningDays: "1 a 3 días",
		terminalSuccessTitle: "CONSULTA COMPLETADA",
		terminalSuccessMessage:
			"¡La consulta fue procesada con éxito! El resultado se muestra arriba.",
		backToMenu: "Volver al Menú",
		refund: "Reembolso",
		// Deleted Messages Tab
		tab_title: "Mensajes Eliminados",
		analysis_title: "Buscar Mensajes Eliminados",
		analysis_description:
			"Inicie un escaneo para localizar e intentar recuperar el contenido de mensajes que fueron eliminados. El proceso puede tardar varios días.",
		analysis_start_button: "Iniciar Búsqueda",
		waiting_title: "¡Mensajes Encontrados!",
		waiting_subtitle:
			"Encontramos {{packets_count}} registros de mensajes eliminados. Ahora comenzamos el proceso para intentar recuperar el contenido.",
		waiting_instruction:
			"Puedes cerrar la aplicación. Regresa después del tiempo estimado para ver el informe.",
		report_title: "Informe Final",
		report_body:
			"Análisis completo. De los {{packets_count}} registros encontrados, el cifrado de seguridad impidió la recuperación del contenido. Se mantuvo la privacidad.",
		report_reset_button: "Buscar Nuevamente",
		// Phone Number Popup
		phone_popup_title: "Ingresar Número de Espionaje",
		phone_popup_description:
			"Ingrese el número de teléfono a monitorear antes de iniciar la búsqueda de mensajes eliminados.",
		phone_popup_label: "Número de Teléfono",
		phone_popup_placeholder: "+34 (555) 000-0000",
		phone_popup_button: "Iniciar Análisis",
		phone_popup_cancel: "Cancelar",
		phone_popup_error: "Por favor, ingrese un número de teléfono válido",
		// Terminal Process Lines
		terminal_starting: "$ Iniciando consulta...",
		terminal_connecting: "> Conectando a los servidores...",
		terminal_connection_established: "[OK] Conexión establecida",
		terminal_processing_data: "> Procesando datos enviados...",
		terminal_validating_info: "[INFO] Validando información",
		terminal_sending_analysis: "[INFO] Enviando datos para análisis...",
		terminal_data_received: "[OK] Datos recibidos con éxito",
		terminal_creating_request: "> Creando solicitud de consulta...",
		terminal_consultation_registered: "[OK] Consulta registrada",
		terminal_processing_started: "[INFO] Procesamiento iniciado",
		terminal_process_duration: "[INFO] Este proceso puede tardar de 1 a 3 días",
		terminal_notification_message:
			"[INFO] Se le notificará cuando la consulta esté lista",
		terminal_awaiting_response: "> Sistema esperando respuesta...",
		terminal_consultation_ongoing: "$ Consulta en curso",
		terminal_server_response: "> ¡Respuesta del servidor recibida!",
		terminal_processing_completed: "[OK] Procesamiento completado",
		terminal_result_header: "=== RESULTADO DE LA CONSULTA ===",
		terminal_result_footer: "=== FIN DEL RESULTADO ===",
		terminal_consultation_finished: "[OK] Consulta finalizada con éxito",
		// Terminal Loading Screen (WhatsApp specific)
		terminal_loading_starting_whatsapp: "$ Iniciando consulta de WhatsApp...",
		terminal_loading_processing_user_data: "> Procesando datos del usuario...",
		terminal_loading_analyzing_messages:
			"[INFO] Analizando historial de mensajes",
		terminal_loading_verifying_contacts: "[INFO] Verificando contactos...",
		terminal_loading_processing_media:
			"[INFO] Procesando medios compartidos...",
		terminal_loading_extracting_profile:
			"> Extrayendo información de perfil...",
		terminal_loading_profile_analyzed: "[OK] Perfil analizado con éxito",
		terminal_loading_querying_database: "> Consultando base de datos...",
		terminal_loading_crossing_info: "[INFO] Cruzando información...",
		terminal_loading_generating_report:
			"[INFO] Generando informe preliminar...",
		terminal_loading_applying_algorithms:
			"> Aplicando algoritmos de análisis...",
		terminal_loading_analysis_ongoing: "[OK] Análisis en curso",
		terminal_loading_awaiting_server: "> Esperando respuesta del servidor...",
		terminal_loading_standby_mode: "$ Sistema en modo de espera",
		// Last Report
		viewLastReport: "Ver Último Informe",
		lastReportTitle: "Último Informe de Consulta",
		lastReportNotFound:
			"No se encontró ningún informe. Por favor, realice una consulta primero.",
		lastReportLoading: "Cargando informe...",
		// View Result
		viewResult: "Ver Resultado",
		viewResultTitle: "Resultado de la Consulta",
		spyingSchedule: "Cronograma de Espionaje",
		spyingScheduleMessage:
			"La descriptografía dura de 1 a 5 días para completarse. Por favor, espere.",
		daysRemaining: "días restantes",
		resultAvailableIn: "Resultado disponible en",
		resultReady: "¡Resultado listo! Haz clic para ver.",
		// Progress Bar & Fidelity Message
		decryptionProgress: "Progreso de Descriptografía",
		faithfulMessage:
			"La descriptografía se ha completado y tu pareja no te está engañando. Nuestra aplicación fue desarrollada para identificar mensajes sospechosos que indican infidelidad y no se encontró nada. Estamos felices de poder ayudar. Tu pareja es 100% FIEL.",
		// Login & Register
		welcomeBack: "Bienvenido de Regreso",
		loginDescription: "Ingresa con tus credenciales para acceder a DEEPEN IA",
		email: "Correo Electrónico",
		emailPlaceholder: "tu@correo.com",
		password: "Contraseña",
		passwordPlaceholder: "••••••••",
		loginButton: "Iniciar Sesión",
		loggingIn: "Iniciando sesión...",
		noAccount: "¿No tienes una cuenta?",
		createAccount: "Crear cuenta",
		registerTitle: "Crear Cuenta",
		registerDescription: "Completa tus datos para comenzar a usar DEEPEN IA",
		fullName: "Nombre Completo",
		fullNamePlaceholder: "Tu nombre",
		confirmPasswordLabel: "Confirmar Contraseña",
		confirmPasswordPlaceholder: "••••••••",
		registerButton: "Crear Cuenta",
		creatingAccount: "Creando cuenta...",
		haveAccount: "¿Ya tienes una cuenta?",
		loginLink: "Iniciar sesión",
		allFieldsRequired: "Por favor, completa todos los campos",
		passwordsDontMatch: "Las contraseñas no coinciden",
		passwordMinLength: "La contraseña debe tener al menos 6 caracteres",
		loginError: "Error al iniciar sesión",
		registerError: "Error al crear cuenta",
	},
	fr: {
		title: "Tableau de Bord de Messagerie Matrix",
		selectLanguage: "Sélectionner la Langue",
		dashboard: "Tableau de Bord",
		selectPlatform: "Sélectionner la Plateforme",
		whatsapp: "WhatsApp",
		instagram: "Instagram",
		backToDashboard: "Retour au Tableau de Bord",
		contacts: "Contacts",
		messages: "Messages",
		media: "Médias",
		statistics: "Statistiques",
		messageCount: "Nombre de Messages",
		activeChats: "Chats Actifs",
		mediaCount: "Nombre de Médias",
		conversations: "Conversations",
		threads: "Fils",
		followers: "Abonnés",
		online: "En Ligne",
		offline: "Hors Ligne",
		active: "Actif",
		viewDetails: "Voir les Détails",
		noMessages: "Aucun message",
		loading: "Chargement...",
		cloneWhatsApp: "Cloner WhatsApp",
		howToUse: "Comment utiliser l'Application",
		support: "Support",
		profile: "Profil",
		greeting: "Bonjour",
		consultationTitle: "Consultation WhatsApp",
		consultationDesc: "Entrez les informations de la personne à consulter",
		consultationName: "Nom Complet",
		consultationPhone: "Numéro de Téléphone",
		consultationAddress: "Adresse",
		consultationCep: "Code Postal",
		consultationCountry: "Pays",
		consultationCity: "Ville",
		consultationNeighborhood: "Quartier",
		consultationSubmit: "Demander une Consultation",
		consultationCancel: "Annuler",
		consultationProgress: "Consultation en Cours",
		consultationDay: "Jour",
		consultationComplete: "Consultation Terminée!",
		consultationProcessing: "Traitement de votre demande de consultation...",
		accessConsultation: "Accéder à la Consultation",
		makeConsultation: "Faire une Consultation",
		chatTitle: "Équipe de Support",
		chatStatus: "En ligne - Prêt à aider",
		chatWelcome: "Bienvenue au Support DEEPEN IA!",
		chatInstruction: "Tapez votre question ci-dessous et nous vous aiderons",
		chatPlaceholder: "Tapez votre message...",
		chatAgentResponse:
			"Merci pour votre message. Un agent vous assistera sous peu.",
		cloneTutorialTitle: "Tutoriel de Clonage WhatsApp",
		cloneTutorialStep1Title: "Première étape:",
		cloneTutorialStep1Desc:
			"Téléchargez WhatsApp Business. Ouvrez WhatsApp Business, allez à l'écran d'accueil et cliquez sur les 3 points situés en haut.",
		cloneTutorialStep2Title: "Deuxième étape:",
		cloneTutorialStep2Desc:
			'Cliquez sur "Connecter comme appareil supplémentaire".',
		cloneTutorialStep3Title: "Troisième étape:",
		cloneTutorialStep3Desc:
			"Un code QR s'ouvrira. Maintenant, l'étape suivante consiste à prendre secrètement le téléphone de votre partenaire.",
		cloneTutorialStep4Title: "Quatrième étape:",
		cloneTutorialStep4Desc:
			'Sur le téléphone de votre partenaire, allez dans "Paramètres".',
		cloneTutorialStep5Title: "Cinquième étape:",
		cloneTutorialStep5Desc: 'Ensuite, dans "Appareils connectés".',
		cloneTutorialStep6Title: "Sixième étape:",
		cloneTutorialStep6Desc: "Ensuite, scannez le code QR sur votre téléphone.",
		cloneTutorialStep7Title: "Septième étape:",
		cloneTutorialStep7Desc:
			"Attendez que la synchronisation des messages soit terminée.",
		cloneTutorialStep8Title: "Huitième étape:",
		cloneTutorialStep8Desc:
			"Il est recommandé de désactiver toutes les notifications WhatsApp Business pour ne pas être identifié(e) par votre partenaire.",
		instagramConsultationTitle: "Consultation Instagram",
		instagramConsultationDesc:
			"Entrez le nom d'utilisateur Instagram de la personne à consulter",
		instagramConsultationUsername: "Nom d'utilisateur Instagram",
		instagramConsultationPlaceholder: "Entrez @utilisateur ou utilisateur",
		instagramTerminalConnecting: "Connexion aux serveurs Instagram...",
		instagramTerminalProcessing: "Traitement de la demande...",
		instagramTerminalValidating: "Validation du nom d'utilisateur...",
		instagramTerminalFetching: "Récupération des données du profil...",
		instagramTerminalComplete: "Données du profil récupérées avec succès",
		instagramProfileTitle: "Profil Instagram",
		instagramProfileFollowers: "Abonnés",
		instagramProfileFollowing: "Abonnements",
		instagramProfilePosts: "Publications",
		instagramAnalysisTitle: "Analyse de Sécurité",
		instagramAnalysisMessage:
			"Nous n'avons rien trouvé de suspect. Nous surveillons et recommandons une vérification tous les 3 jours. Nous recherchons des abonnés suspects, des conversations suspectes et des likes suspects. Nous n'avons rien trouvé de suspect, nous effectuons une recherche plus approfondie. Nous recommandons une vérification tous les 3 jours pour continuer l'espionnage.",
		viewLastFollowers: "Voir les Derniers Abonnés",
		monitorFollowersTitle: "(Bientôt Disponible) Surveillance des Abonnés",
		monitorFollowersSubtitle: "Voir les nouveaux abonnés de votre partenaire",
		editProfile: "Modifier le Profil",
		forgotPassword: "Mot de Passe Oublié",
		resetPasswordTitle: "Réinitialiser le Mot de Passe",
		resetPasswordDesc: "Entrez votre nouveau mot de passe ci-dessous",
		newPassword: "Nouveau Mot de Passe",
		confirmPassword: "Confirmer le Mot de Passe",
		resetPasswordButton: "Réinitialiser le Mot de Passe",
		passwordResetSuccess: "Mot de passe réinitialisé avec succès!",
		passwordResetWarning:
			"Veuillez enregistrer votre nouveau mot de passe dans un endroit sûr.",
		redirectingToLogin: "Redirection vers la connexion...",
		passwordMismatch: "Les mots de passe ne correspondent pas",
		passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères",
		userNotFound: "Utilisateur non trouvé",
		viewRealTimeMessages: "Voir les Messages en Temps Réel",
		realTimeMessagesTitle: "Messages en Temps Réel",
		realTimeMessagesWarning:
			"AVIS IMPORTANT : Conformément aux réglementations sur le secret des communications et la protection des données personnelles (telles que la Loi générale sur la protection des données - LGPD), il nous est strictement interdit d'afficher le contenu de tout message, conversation ou média. La violation de ce protocole entraînerait de graves sanctions légales. Cependant, notre analyse ne repose pas sur le contenu, mais plutôt sur les métadonnées et les modèles de comportement.",
		terminalWarningTitle: "AVIS IMPORTANT",
		terminalWarningMessage:
			"La consultation est en cours et peut prendre de {days} pour être terminée. Veuillez patienter. Vous pourrez visualiser le résultat dès que le traitement sera terminé.",
		terminalWarningDays: "1 à 3 jours",
		terminalSuccessTitle: "CONSULTATION TERMINÉE",
		terminalSuccessMessage:
			"La consultation a été traitée avec succès! Le résultat est affiché ci-dessus.",
		backToMenu: "Retour au Menu",
		refund: "Remboursement",
		// Deleted Messages Tab
		tab_title: "Messages Supprimés",
		analysis_title: "Rechercher les Messages Supprimés",
		analysis_description:
			"Lancez une analyse pour localiser et tenter de récupérer le contenu des messages qui ont été supprimés. Le processus peut prendre plusieurs jours.",
		analysis_start_button: "Démarrer la Recherche",
		waiting_title: "Messages Trouvés!",
		waiting_subtitle:
			"Nous avons trouvé {{packets_count}} enregistrements de messages supprimés. Nous commençons maintenant le processus pour tenter de récupérer le contenu.",
		waiting_instruction:
			"Vous pouvez fermer l'application. Revenez après le délai estimé pour consulter le rapport.",
		report_title: "Rapport Final",
		report_body:
			"Analyse terminée. Sur les {{packets_count}} enregistrements trouvés, le chiffrement de sécurité a empêché la récupération du contenu. La confidentialité a été maintenue.",
		report_reset_button: "Rechercher à Nouveau",
		// Phone Number Popup
		phone_popup_title: "Entrer le Numéro d'Espionnage",
		phone_popup_description:
			"Entrez le numéro de téléphone à surveiller avant de commencer la recherche de messages supprimés.",
		phone_popup_label: "Numéro de Téléphone",
		phone_popup_placeholder: "+33 (555) 000-0000",
		phone_popup_button: "Démarrer l'Analyse",
		phone_popup_cancel: "Annuler",
		phone_popup_error: "Veuillez entrer un numéro de téléphone valide",
		// Terminal Process Lines
		terminal_starting: "$ Démarrage de la consultation...",
		terminal_connecting: "> Connexion aux serveurs...",
		terminal_connection_established: "[OK] Connexion établie",
		terminal_processing_data: "> Traitement des données soumises...",
		terminal_validating_info: "[INFO] Validation des informations",
		terminal_sending_analysis: "[INFO] Envoi des données pour analyse...",
		terminal_data_received: "[OK] Données reçues avec succès",
		terminal_creating_request: "> Création de la demande de consultation...",
		terminal_consultation_registered: "[OK] Consultation enregistrée",
		terminal_processing_started: "[INFO] Traitement démarré",
		terminal_process_duration:
			"[INFO] Ce processus peut prendre de 1 à 3 jours",
		terminal_notification_message:
			"[INFO] Vous serez notifié lorsque la consultation sera prête",
		terminal_awaiting_response: "> Système en attente de réponse...",
		terminal_consultation_ongoing: "$ Consultation en cours",
		terminal_server_response: "> Réponse du serveur reçue!",
		terminal_processing_completed: "[OK] Traitement terminé",
		terminal_result_header: "=== RÉSULTAT DE LA CONSULTATION ===",
		terminal_result_footer: "=== FIN DU RÉSULTAT ===",
		terminal_consultation_finished: "[OK] Consultation terminée avec succès",
		// Terminal Loading Screen (WhatsApp specific)
		terminal_loading_starting_whatsapp:
			"$ Démarrage de la consultation WhatsApp...",
		terminal_loading_processing_user_data:
			"> Traitement des données utilisateur...",
		terminal_loading_analyzing_messages:
			"[INFO] Analyse de l'historique des messages",
		terminal_loading_verifying_contacts: "[INFO] Vérification des contacts...",
		terminal_loading_processing_media:
			"[INFO] Traitement des médias partagés...",
		terminal_loading_extracting_profile:
			"> Extraction des informations de profil...",
		terminal_loading_profile_analyzed: "[OK] Profil analysé avec succès",
		terminal_loading_querying_database:
			"> Interrogation de la base de données...",
		terminal_loading_crossing_info: "[INFO] Recoupement des informations...",
		terminal_loading_generating_report:
			"[INFO] Génération du rapport préliminaire...",
		terminal_loading_applying_algorithms:
			"> Application des algorithmes d'analyse...",
		terminal_loading_analysis_ongoing: "[OK] Analyse en cours",
		terminal_loading_awaiting_server:
			"> En attente de la réponse du serveur...",
		terminal_loading_standby_mode: "$ Système en mode veille",
		// Last Report
		viewLastReport: "Voir le Dernier Rapport",
		lastReportTitle: "Dernier Rapport de Consultation",
		lastReportNotFound:
			"Aucun rapport trouvé. Veuillez d'abord effectuer une consultation.",
		lastReportLoading: "Chargement du rapport...",
		// View Result
		viewResult: "Voir le Résultat",
		viewResultTitle: "Résultat de la Consultation",
		spyingSchedule: "Calendrier d'Espionnage",
		spyingScheduleMessage:
			"Le décryptage dure de 1 à 5 jours pour être complété. Veuillez patienter.",
		daysRemaining: "jours restants",
		resultAvailableIn: "Résultat disponible dans",
		resultReady: "Résultat prêt ! Cliquez pour voir.",
		// Progress Bar & Fidelity Message
		decryptionProgress: "Progression du Décryptage",
		faithfulMessage:
			"Le décryptage a été complété et votre partenaire ne vous trompe pas. Notre application a été développée pour identifier les messages suspects qui indiquent l'infidélité et rien n'a été trouvé. Nous sommes heureux de pouvoir aider. Votre partenaire est 100% FIDÈLE.",
		// Login & Register
		welcomeBack: "Bienvenue",
		loginDescription:
			"Connectez-vous avec vos identifiants pour accéder à DEEPEN IA",
		email: "Email",
		emailPlaceholder: "votre@email.com",
		password: "Mot de Passe",
		passwordPlaceholder: "••••••••",
		loginButton: "Se Connecter",
		loggingIn: "Connexion en cours...",
		noAccount: "Vous n'avez pas de compte ?",
		createAccount: "Créer un compte",
		registerTitle: "Créer un Compte",
		registerDescription:
			"Remplissez vos informations pour commencer à utiliser DEEPEN IA",
		fullName: "Nom Complet",
		fullNamePlaceholder: "Votre nom",
		confirmPasswordLabel: "Confirmer le Mot de Passe",
		confirmPasswordPlaceholder: "••••••••",
		registerButton: "Créer un Compte",
		creatingAccount: "Création du compte...",
		haveAccount: "Vous avez déjà un compte ?",
		loginLink: "Se connecter",
		allFieldsRequired: "Veuillez remplir tous les champs",
		passwordsDontMatch: "Les mots de passe ne correspondent pas",
		passwordMinLength: "Le mot de passe doit contenir au moins 6 caractères",
		loginError: "Erreur de connexion",
		registerError: "Erreur lors de la création du compte",
	},
	pt: {
		title: "Painel de Mensagens Matrix",
		selectLanguage: "Selecionar Idioma",
		dashboard: "Painel",
		selectPlatform: "Selecionar Plataforma",
		whatsapp: "WhatsApp",
		instagram: "Instagram",
		backToDashboard: "Voltar ao Painel",
		contacts: "Contatos",
		messages: "Mensagens",
		media: "Mídia",
		statistics: "Estatísticas",
		messageCount: "Contagem de Mensagens",
		activeChats: "Chats Ativos",
		mediaCount: "Contagem de Mídia",
		conversations: "Conversas",
		threads: "Tópicos",
		followers: "Seguidores",
		online: "Online",
		offline: "Offline",
		active: "Ativo",
		viewDetails: "Ver Detalhes",
		noMessages: "Sem mensagens",
		loading: "Carregando...",
		cloneWhatsApp: "Clonar WhatsApp",
		howToUse: "Como usar o App",
		support: "Suporte",
		profile: "Perfil",
		greeting: "Olá",
		consultationTitle: "Consulta WhatsApp",
		consultationDesc: "Insira as informações da pessoa a ser consultada",
		consultationName: "Nome Completo",
		consultationPhone: "Número de Telefone",
		consultationAddress: "Endereço",
		consultationCep: "CEP",
		consultationCountry: "País",
		consultationCity: "Cidade",
		consultationNeighborhood: "Bairro",
		consultationSubmit: "Solicitar Consulta",
		consultationCancel: "Cancelar",
		consultationProgress: "Consulta em Andamento",
		consultationDay: "Dia",
		consultationComplete: "Consulta Completa!",
		consultationProcessing: "Processando sua solicitação de consulta...",
		accessConsultation: "Acessar Consulta",
		makeConsultation: "Fazer Consulta",
		chatTitle: "Equipe de Suporte",
		chatStatus: "Online - Pronto para ajudar",
		chatWelcome: "Bem-vindo ao Suporte DEEPEN IA!",
		chatInstruction: "Digite sua pergunta abaixo e nós ajudaremos você",
		chatPlaceholder: "Digite sua mensagem...",
		chatAgentResponse:
			"Obrigado pela sua mensagem. Um agente irá atendê-lo em breve.",
		cloneTutorialTitle: "Tutorial de Clonagem do WhatsApp",
		cloneTutorialStep1Title: "Primeiro passo:",
		cloneTutorialStep1Desc:
			"Baixe o WhatsApp Business. Abra o WhatsApp Business, acesse a tela inicial e clique nos 3 pontos localizados na parte superior.",
		cloneTutorialStep2Title: "Segundo passo:",
		cloneTutorialStep2Desc: 'Clique em "Conectar como dispositivo adicional".',
		cloneTutorialStep3Title: "Terceiro passo:",
		cloneTutorialStep3Desc:
			"Irá abrir um QR Code. Agora, o próximo passo é pegar, escondido, o celular do parceiro.",
		cloneTutorialStep4Title: "Quarto passo:",
		cloneTutorialStep4Desc: 'No celular do parceiro, vá em "Configurações".',
		cloneTutorialStep5Title: "Quinto passo:",
		cloneTutorialStep5Desc: 'Depois, em "Dispositivos conectados".',
		cloneTutorialStep6Title: "Sexto passo:",
		cloneTutorialStep6Desc: "Em seguida, escaneie o QR Code no seu celular.",
		cloneTutorialStep7Title: "Sétimo passo:",
		cloneTutorialStep7Desc:
			"Aguarde a sincronização das mensagens ser concluída.",
		cloneTutorialStep8Title: "Oitavo passo:",
		cloneTutorialStep8Desc:
			"Recomenda-se desativar todas as notificações do WhatsApp Business para não ser identificado(a) pelo parceiro.",
		instagramConsultationTitle: "Consulta do Instagram",
		instagramConsultationDesc:
			"Insira o nome de usuário do Instagram da pessoa a consultar",
		instagramConsultationUsername: "Nome de Usuário do Instagram",
		instagramConsultationPlaceholder: "Digite @usuario ou usuario",
		instagramTerminalConnecting: "Conectando aos servidores do Instagram...",
		instagramTerminalProcessing: "Processando solicitação...",
		instagramTerminalValidating: "Validando nome de usuário...",
		instagramTerminalFetching: "Buscando dados do perfil...",
		instagramTerminalComplete: "Dados do perfil obtidos com sucesso",
		instagramProfileTitle: "Perfil do Instagram",
		instagramProfileFollowers: "Seguidores",
		instagramProfileFollowing: "Seguindo",
		instagramProfilePosts: "Publicações",
		instagramAnalysisTitle: "Análise de Segurança",
		instagramAnalysisMessage:
			"Não encontramos nada suspeito. Estamos monitorando e recomendamos uma consulta a cada 3 dias. Buscamos seguidores suspeitos, conversas suspeitas e curtidas suspeitas. Não encontramos nada suspeito, estamos fazendo uma busca mais profunda. Recomendamos uma consulta a cada 3 dias para continuar a espionagem.",
		viewLastFollowers: "Ver Últimos Seguidores",
		monitorFollowersTitle: "(Em breve) Fazer Monitoramento de Seguidores",
		monitorFollowersSubtitle: "Veja os novos seguidores do seu parceiro",
		editProfile: "Editar Perfil",
		forgotPassword: "Esqueceu a Senha",
		resetPasswordTitle: "Redefinir Senha",
		resetPasswordDesc: "Digite sua nova senha abaixo",
		newPassword: "Nova Senha",
		confirmPassword: "Confirmar Senha",
		resetPasswordButton: "Redefinir Senha",
		passwordResetSuccess: "Senha redefinida com sucesso!",
		passwordResetWarning: "Por favor, salve sua nova senha em um local seguro.",
		redirectingToLogin: "Redirecionando para o login...",
		passwordMismatch: "As senhas não coincidem",
		passwordTooShort: "A senha deve ter pelo menos 6 caracteres",
		userNotFound: "Usuário não encontrado",
		viewRealTimeMessages: "Ver Mensagens em Tempo Real",
		realTimeMessagesTitle: "Mensagens em Tempo Real",
		realTimeMessagesWarning:
			"AVISO IMPORTANTE: Em conformidade com as regulações de sigilo de comunicação e privacidade de dados (como a Lei Geral de Proteção de Dados - LGPD), somos estritamente proibidos de exibir o conteúdo de qualquer mensagem, conversa ou mídia. A violação deste protocolo resultaria em severas sanções legais. No entanto, nossa análise não se baseia no conteúdo, mas sim em metadados e padrões de comportamento.",
		terminalWarningTitle: "AVISO IMPORTANTE",
		terminalWarningMessage:
			"A consulta está em andamento e pode levar de {days} para ser concluída. Por favor, aguarde. Você poderá visualizar o resultado assim que o processamento for finalizado.",
		terminalWarningDays: "1 a 3 dias",
		terminalSuccessTitle: "CONSULTA CONCLUÍDA",
		terminalSuccessMessage:
			"A consulta foi processada com sucesso! O resultado está exibido acima.",
		backToMenu: "Voltar ao Menu",
		refund: "Reembolso",
		// Deleted Messages Tab
		tab_title: "Mensagens Apagadas",
		analysis_title: "Buscar Mensagens Apagadas",
		analysis_description:
			"Inicie uma varredura para localizar e tentar recuperar o conteúdo de mensagens que foram apagadas. O processo pode levar alguns dias.",
		analysis_start_button: "Iniciar Busca",
		waiting_title: "Mensagens Encontradas!",
		waiting_subtitle:
			"Encontramos {{packets_count}} registros de mensagens apagadas. Iniciamos agora o processo para tentar recuperar o conteúdo.",
		waiting_instruction:
			"Você pode fechar o aplicativo. Volte após o tempo estimado para ver o relatório.",
		report_title: "Relatório Final",
		report_body:
			"Análise concluída. Dos {{packets_count}} registros encontrados, a criptografia de segurança impediu a recuperação do conteúdo. A privacidade foi mantida.",
		report_reset_button: "Buscar Novamente",
		// Phone Number Popup
		phone_popup_title: "Inserir Número da Espionagem",
		phone_popup_description:
			"Insira o número de telefone a ser monitorado antes de iniciar a busca de mensagens apagadas.",
		phone_popup_label: "Número de Telefone",
		phone_popup_placeholder: "+55 (11) 00000-0000",
		phone_popup_button: "Iniciar Análise",
		phone_popup_cancel: "Cancelar",
		phone_popup_error: "Por favor, insira um número de telefone válido",
		// Terminal Process Lines
		terminal_starting: "$ Iniciando consulta...",
		terminal_connecting: "> Conectando aos servidores...",
		terminal_connection_established: "[OK] Conexão estabelecida",
		terminal_processing_data: "> Processando dados enviados...",
		terminal_validating_info: "[INFO] Validando informações",
		terminal_sending_analysis: "[INFO] Enviando dados para análise...",
		terminal_data_received: "[OK] Dados recebidos com sucesso",
		terminal_creating_request: "> Criando requisição de consulta...",
		terminal_consultation_registered: "[OK] Consulta registrada",
		terminal_processing_started: "[INFO] Processamento iniciado",
		terminal_process_duration: "[INFO] Este processo pode levar de 1 a 3 dias",
		terminal_notification_message:
			"[INFO] Você será notificado quando a consulta estiver pronta",
		terminal_awaiting_response: "> Sistema aguardando resposta...",
		terminal_consultation_ongoing: "$ Consulta em andamento",
		terminal_server_response: "> Resposta do servidor recebida!",
		terminal_processing_completed: "[OK] Processamento concluído",
		terminal_result_header: "=== RESULTADO DA CONSULTA ===",
		terminal_result_footer: "=== FIM DO RESULTADO ===",
		terminal_consultation_finished: "[OK] Consulta finalizada com sucesso",
		// Terminal Loading Screen (WhatsApp specific)
		terminal_loading_starting_whatsapp: "$ Iniciando consulta de WhatsApp...",
		terminal_loading_processing_user_data: "> Processando dados do usuário...",
		terminal_loading_analyzing_messages:
			"[INFO] Analisando histórico de mensagens",
		terminal_loading_verifying_contacts: "[INFO] Verificando contatos...",
		terminal_loading_processing_media:
			"[INFO] Processando mídia compartilhada...",
		terminal_loading_extracting_profile: "> Extraindo informações de perfil...",
		terminal_loading_profile_analyzed: "[OK] Perfil analisado com sucesso",
		terminal_loading_querying_database: "> Consultando base de dados...",
		terminal_loading_crossing_info: "[INFO] Cruzando informações...",
		terminal_loading_generating_report:
			"[INFO] Gerando relatório preliminar...",
		terminal_loading_applying_algorithms:
			"> Aplicando algoritmos de análise...",
		terminal_loading_analysis_ongoing: "[OK] Análise em andamento",
		terminal_loading_awaiting_server: "> Aguardando resposta do servidor...",
		terminal_loading_standby_mode: "$ Sistema em modo de espera",
		// Last Report
		viewLastReport: "Ver Último Relatório",
		lastReportTitle: "Último Relatório de Consulta",
		lastReportNotFound:
			"Nenhum relatório encontrado. Por favor, faça uma consulta primeiro.",
		lastReportLoading: "Carregando relatório...",
		// View Result
		viewResult: "Ver Resultado",
		viewResultTitle: "Resultado da Consulta",
		spyingSchedule: "Cronograma de Espionagem",
		spyingScheduleMessage:
			"A descriptografia dura de 1 a 5 dias para ser concluída. Por favor, aguarde.",
		daysRemaining: "dias restantes",
		resultAvailableIn: "Resultado disponível em",
		resultReady: "Resultado pronto! Clique para visualizar.",
		// Progress Bar & Fidelity Message
		decryptionProgress: "Progresso da Descriptografia",
		faithfulMessage:
			"A descriptografia foi concluída e seu parceiro não está te traindo. Nosso aplicativo foi desenvolvido para identificar mensagens suspeitas que indicam infidelidade e nada foi encontrado. Ficamos felizes em poder ajudar. Seu parceiro é 100% FIEL.",
		// Login & Register
		welcomeBack: "Bem-vindo de Volta",
		loginDescription: "Entre com suas credenciais para acessar o DEEPEN IA",
		email: "Email",
		emailPlaceholder: "seu@email.com",
		password: "Senha",
		passwordPlaceholder: "••••••••",
		loginButton: "Entrar",
		loggingIn: "Entrando...",
		noAccount: "Não tem uma conta?",
		createAccount: "Criar conta",
		registerTitle: "Criar Conta",
		registerDescription: "Preencha seus dados para começar a usar o DEEPEN IA",
		fullName: "Nome Completo",
		fullNamePlaceholder: "Seu nome",
		confirmPasswordLabel: "Confirmar Senha",
		confirmPasswordPlaceholder: "••••••••",
		registerButton: "Criar Conta",
		creatingAccount: "Criando conta...",
		haveAccount: "Já tem uma conta?",
		loginLink: "Fazer login",
		allFieldsRequired: "Por favor, preencha todos os campos",
		passwordsDontMatch: "As senhas não coincidem",
		passwordMinLength: "A senha deve ter pelo menos 6 caracteres",
		loginError: "Erro ao fazer login",
		registerError: "Erro ao criar conta",
	},
	it: {
		title: "Dashboard di Messaggistica Matrix",
		selectLanguage: "Seleziona Lingua",
		dashboard: "Dashboard",
		selectPlatform: "Seleziona Piattaforma",
		whatsapp: "WhatsApp",
		instagram: "Instagram",
		backToDashboard: "Torna alla Dashboard",
		contacts: "Contatti",
		messages: "Messaggi",
		media: "Media",
		statistics: "Statistiche",
		messageCount: "Conteggio Messaggi",
		activeChats: "Chat Attive",
		mediaCount: "Conteggio Media",
		conversations: "Conversazioni",
		threads: "Thread",
		followers: "Follower",
		online: "Online",
		offline: "Offline",
		active: "Attivo",
		viewDetails: "Vedi Dettagli",
		noMessages: "Nessun messaggio",
		loading: "Caricamento...",
		cloneWhatsApp: "Clona WhatsApp",
		howToUse: "Come usare l'App",
		support: "Supporto",
		profile: "Profilo",
		greeting: "Ciao",
		consultationTitle: "Consultazione WhatsApp",
		consultationDesc: "Inserisci le informazioni della persona da consultare",
		consultationName: "Nome Completo",
		consultationPhone: "Numero di Telefono",
		consultationAddress: "Indirizzo",
		consultationCep: "Codice Postale",
		consultationCountry: "Paese",
		consultationCity: "Città",
		consultationNeighborhood: "Quartiere",
		consultationSubmit: "Richiedi Consultazione",
		consultationCancel: "Annulla",
		consultationProgress: "Consultazione in Corso",
		consultationDay: "Giorno",
		consultationComplete: "Consultazione Completata!",
		consultationProcessing: "Elaborazione della richiesta di consultazione...",
		accessConsultation: "Accedi alla Consultazione",
		makeConsultation: "Fai Consultazione",
		chatTitle: "Team di Supporto",
		chatStatus: "Online - Pronto ad aiutare",
		chatWelcome: "Benvenuto al Supporto DEEPEN IA!",
		chatInstruction: "Scrivi la tua domanda qui sotto e ti aiuteremo",
		chatPlaceholder: "Scrivi il tuo messaggio...",
		chatAgentResponse:
			"Grazie per il tuo messaggio. Un agente ti assisterà a breve.",
		cloneTutorialTitle: "Tutorial di Clonazione WhatsApp",
		cloneTutorialStep1Title: "Primo passo:",
		cloneTutorialStep1Desc:
			"Scarica WhatsApp Business. Apri WhatsApp Business, vai alla schermata iniziale e fai clic sui 3 punti situati in alto.",
		cloneTutorialStep2Title: "Secondo passo:",
		cloneTutorialStep2Desc:
			'Fai clic su "Collega come dispositivo aggiuntivo".',
		cloneTutorialStep3Title: "Terzo passo:",
		cloneTutorialStep3Desc:
			"Si aprirà un codice QR. Ora, il passo successivo è prendere di nascosto il telefono del partner.",
		cloneTutorialStep4Title: "Quarto passo:",
		cloneTutorialStep4Desc: 'Sul telefono del partner, vai su "Impostazioni".',
		cloneTutorialStep5Title: "Quinto passo:",
		cloneTutorialStep5Desc: 'Quindi, su "Dispositivi collegati".',
		cloneTutorialStep6Title: "Sesto passo:",
		cloneTutorialStep6Desc:
			"Successivamente, scansiona il codice QR sul tuo telefono.",
		cloneTutorialStep7Title: "Settimo passo:",
		cloneTutorialStep7Desc:
			"Attendi il completamento della sincronizzazione dei messaggi.",
		cloneTutorialStep8Title: "Ottavo passo:",
		cloneTutorialStep8Desc:
			"Si consiglia di disattivare tutte le notifiche di WhatsApp Business per non essere identificato(a) dal partner.",
		instagramConsultationTitle: "Consultazione Instagram",
		instagramConsultationDesc:
			"Inserisci il nome utente Instagram della persona da consultare",
		instagramConsultationUsername: "Nome Utente Instagram",
		instagramConsultationPlaceholder: "Inserisci @utente o utente",
		instagramTerminalConnecting: "Connessione ai server Instagram...",
		instagramTerminalProcessing: "Elaborazione richiesta...",
		instagramTerminalValidating: "Validazione nome utente...",
		instagramTerminalFetching: "Recupero dati profilo...",
		instagramTerminalComplete: "Dati profilo recuperati con successo",
		instagramProfileTitle: "Profilo Instagram",
		instagramProfileFollowers: "Follower",
		instagramProfileFollowing: "Seguiti",
		instagramProfilePosts: "Post",
		instagramAnalysisTitle: "Analisi di Sicurezza",
		instagramAnalysisMessage:
			"Non abbiamo trovato nulla di sospetto. Stiamo monitorando e raccomandiamo un controllo ogni 3 giorni. Cerchiamo follower sospetti, conversazioni sospette e like sospetti. Non abbiamo trovato nulla di sospetto, stiamo effettuando una ricerca più approfondita. Raccomandiamo un controllo ogni 3 giorni per continuare lo spionaggio.",
		viewLastFollowers: "Visualizza Ultimi Follower",
		monitorFollowersTitle: "(Prossimamente) Monitoraggio Follower",
		monitorFollowersSubtitle: "Vedi i nuovi follower del tuo partner",
		editProfile: "Modifica Profilo",
		forgotPassword: "Password Dimenticata",
		resetPasswordTitle: "Reimposta Password",
		resetPasswordDesc: "Inserisci la tua nuova password qui sotto",
		newPassword: "Nuova Password",
		confirmPassword: "Conferma Password",
		resetPasswordButton: "Reimposta Password",
		passwordResetSuccess: "Password reimpostata con successo!",
		passwordResetWarning:
			"Si prega di salvare la nuova password in un luogo sicuro.",
		redirectingToLogin: "Reindirizzamento al login...",
		passwordMismatch: "Le password non corrispondono",
		passwordTooShort: "La password deve contenere almeno 6 caratteri",
		userNotFound: "Utente non trovato",
		viewRealTimeMessages: "Visualizza Messaggi in Tempo Reale",
		realTimeMessagesTitle: "Messaggi in Tempo Reale",
		realTimeMessagesWarning:
			"AVVISO IMPORTANTE: In conformità con le normative sulla riservatezza delle comunicazioni e sulla privacy dei dati (come la Legge generale sulla protezione dei dati - LGPD), siamo severamente vietati di visualizzare il contenuto di qualsiasi messaggio, conversazione o media. La violazione di questo protocollo comporterebbe gravi sanzioni legali. Tuttavia, la nostra analisi non si basa sul contenuto, ma piuttosto su metadati e modelli di comportamento.",
		terminalWarningTitle: "AVVISO IMPORTANTE",
		terminalWarningMessage:
			"La consultazione è in corso e può richiedere da {days} per essere completata. Si prega di attendere. Potrai visualizzare il risultato non appena l'elaborazione sarà terminata.",
		terminalWarningDays: "1 a 3 giorni",
		terminalSuccessTitle: "CONSULTAZIONE COMPLETATA",
		terminalSuccessMessage:
			"La consultazione è stata elaborata con successo! Il risultato è visualizzato sopra.",
		backToMenu: "Torna al Menu",
		refund: "Rimborso",
		// Deleted Messages Tab
		tab_title: "Messaggi Eliminati",
		analysis_title: "Trova Messaggi Eliminati",
		analysis_description:
			"Avvia una scansione per individuare e tentare di recuperare il contenuto dei messaggi che sono stati eliminati. Il processo può richiedere diversi giorni.",
		analysis_start_button: "Avvia Ricerca",
		waiting_title: "Messaggi Trovati!",
		waiting_subtitle:
			"Abbiamo trovato {{packets_count}} record di messaggi eliminati. Stiamo ora avviando il processo per tentare il recupero del contenuto.",
		waiting_instruction:
			"Puoi chiudere l'app. Torna dopo il tempo stimato per visualizzare il rapporto.",
		report_title: "Rapporto Finale",
		report_body:
			"Analisi completata. Dei {{packets_count}} record trovati, la crittografia di sicurezza ha impedito il recupero del contenuto. La privacy è stata mantenuta.",
		report_reset_button: "Cerca di Nuovo",
		// Phone Number Popup
		phone_popup_title: "Inserisci Numero di Spionaggio",
		phone_popup_description:
			"Inserisci il numero di telefono da monitorare prima di iniziare la ricerca di messaggi eliminati.",
		phone_popup_label: "Numero di Telefono",
		phone_popup_placeholder: "+39 (555) 000-0000",
		phone_popup_button: "Avvia Analisi",
		phone_popup_cancel: "Annulla",
		phone_popup_error: "Inserisci un numero di telefono valido",
		// Terminal Process Lines
		terminal_starting: "$ Avvio consultazione...",
		terminal_connecting: "> Connessione ai server...",
		terminal_connection_established: "[OK] Connessione stabilita",
		terminal_processing_data: "> Elaborazione dati inviati...",
		terminal_validating_info: "[INFO] Validazione informazioni",
		terminal_sending_analysis: "[INFO] Invio dati per analisi...",
		terminal_data_received: "[OK] Dati ricevuti con successo",
		terminal_creating_request: "> Creazione richiesta di consultazione...",
		terminal_consultation_registered: "[OK] Consultazione registrata",
		terminal_processing_started: "[INFO] Elaborazione avviata",
		terminal_process_duration:
			"[INFO] Questo processo può richiedere da 1 a 3 giorni",
		terminal_notification_message:
			"[INFO] Sarai notificato quando la consultazione sarà pronta",
		terminal_awaiting_response: "> Sistema in attesa di risposta...",
		terminal_consultation_ongoing: "$ Consultazione in corso",
		terminal_server_response: "> Risposta del server ricevuta!",
		terminal_processing_completed: "[OK] Elaborazione completata",
		terminal_result_header: "=== RISULTATO DELLA CONSULTAZIONE ===",
		terminal_result_footer: "=== FINE DEL RISULTATO ===",
		terminal_consultation_finished:
			"[OK] Consultazione completata con successo",
		// Terminal Loading Screen (WhatsApp specific)
		terminal_loading_starting_whatsapp: "$ Avvio consultazione WhatsApp...",
		terminal_loading_processing_user_data: "> Elaborazione dati utente...",
		terminal_loading_analyzing_messages: "[INFO] Analisi cronologia messaggi",
		terminal_loading_verifying_contacts: "[INFO] Verifica contatti...",
		terminal_loading_processing_media: "[INFO] Elaborazione media condivisi...",
		terminal_loading_extracting_profile: "> Estrazione informazioni profilo...",
		terminal_loading_profile_analyzed: "[OK] Profilo analizzato con successo",
		terminal_loading_querying_database: "> Interrogazione database...",
		terminal_loading_crossing_info: "[INFO] Incrocio informazioni...",
		terminal_loading_generating_report:
			"[INFO] Generazione rapporto preliminare...",
		terminal_loading_applying_algorithms:
			"> Applicazione algoritmi di analisi...",
		terminal_loading_analysis_ongoing: "[OK] Analisi in corso",
		terminal_loading_awaiting_server: "> In attesa di risposta dal server...",
		terminal_loading_standby_mode: "$ Sistema in modalità standby",
		// Last Report
		viewLastReport: "Visualizza Ultimo Rapporto",
		lastReportTitle: "Ultimo Rapporto di Consultazione",
		lastReportNotFound:
			"Nessun rapporto trovato. Si prega di effettuare prima una consultazione.",
		lastReportLoading: "Caricamento rapporto...",
		// View Result
		viewResult: "Visualizza Risultato",
		viewResultTitle: "Risultato della Consultazione",
		spyingSchedule: "Programma di Spionaggio",
		spyingScheduleMessage:
			"La decrittografia richiede da 1 a 5 giorni per essere completata. Si prega di attendere.",
		daysRemaining: "giorni rimanenti",
		resultAvailableIn: "Risultato disponibile in",
		resultReady: "Risultato pronto! Clicca per visualizzare.",
		// Progress Bar & Fidelity Message
		decryptionProgress: "Progresso di Decrittografia",
		faithfulMessage:
			"La decrittografia è stata completata e il tuo partner non ti sta tradendo. La nostra app è stata sviluppata per identificare messaggi sospetti che indicano infedeltà e non è stato trovato nulla. Siamo felici di poter aiutare. Il tuo partner è 100% FEDELE.",
		// Login & Register
		welcomeBack: "Bentornato",
		loginDescription: "Accedi con le tue credenziali per accedere a DEEPEN IA",
		email: "Email",
		emailPlaceholder: "tua@email.com",
		password: "Password",
		passwordPlaceholder: "••••••••",
		loginButton: "Accedi",
		loggingIn: "Accesso in corso...",
		noAccount: "Non hai un account?",
		createAccount: "Crea account",
		registerTitle: "Crea Account",
		registerDescription: "Compila i tuoi dati per iniziare a usare DEEPEN IA",
		fullName: "Nome Completo",
		fullNamePlaceholder: "Il tuo nome",
		confirmPasswordLabel: "Conferma Password",
		confirmPasswordPlaceholder: "••••••••",
		registerButton: "Crea Account",
		creatingAccount: "Creazione account...",
		haveAccount: "Hai già un account?",
		loginLink: "Accedi",
		allFieldsRequired: "Si prega di compilare tutti i campi",
		passwordsDontMatch: "Le password non corrispondono",
		passwordMinLength: "La password deve contenere almeno 6 caratteri",
		loginError: "Errore durante l'accesso",
		registerError: "Errore durante la creazione dell'account",
	},
};

export function getStoredLanguage(): Language {
	const stored = localStorage.getItem("language");
	if (
		stored &&
		(stored === "en" ||
			stored === "es" ||
			stored === "fr" ||
			stored === "pt" ||
			stored === "it")
	) {
		return stored;
	}
	return "en";
}

export function setStoredLanguage(language: Language): void {
	localStorage.setItem("language", language);
}
