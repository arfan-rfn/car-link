'use client';

import { Button } from "./ui/button";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

export function LoginButton() {
	const router = useRouter();
	const { apiKey, setApiKey } = useAuthStore();

	const handleLogin = () => {
		if (apiKey) {
			setApiKey(null);
		} else {
			router.push('/login');
		}
	}

	return (
		<Button onClick={handleLogin} >
			{apiKey ? 'Log Out' : 'Log In'}
		</Button>
	)
}