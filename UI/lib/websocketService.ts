
import Stomp, { Client } from 'stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
	private stompClient: Client | null = null;
	private messageHandlers: ((message: string) => void)[] = [];
	public isConnected = false;

	connect() {
		const headers = {
			login: '',
			passcode: ''
		}

		const serverUrl = `${process.env.NEXT_PUBLIC_API_URL}/chat`;
		const socket = new SockJS(serverUrl);
		this.stompClient = Stomp.over(socket);
		this.stompClient.connect(
			headers,
			this.onConnected,
			this.onError
		);
	}

	onConnected = () => {
		console.log('Connected to WebSocket server');
		if (this.stompClient?.connected) {
			this.isConnected = true;
			this.stompClient?.subscribe('/topic/messages', this.onMessageReceived);
		}
	};

	onError = (error: any) => {
		console.error('Error in WebSocket connection: ', error.toString());
	};

	onMessageReceived = (payload: { body: string }) => {
		this.messageHandlers.forEach(handler => handler(payload.body));
	};

	sendMessage(message: string) {
		this.stompClient?.send("/app/message", {}, message);
	}

	addMessageHandler(handler: (message: string) => void) {
		this.messageHandlers.push(handler);
	}

	disconnect() {
		if ( this.isConnected && this.stompClient && this.stompClient.connected) {
			this.stompClient.disconnect(() => {
				console.log('Disconnected from WebSocket server');
			});
		}
	}
}

export const webSocketService = new WebSocketService();
