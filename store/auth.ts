import { UserTypes } from '@/types/all-types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AuthState {
	apiKey: null | string
	userDetails: null | UserTypes
	setApiKey: (token: string | null) => Promise<UserTypes | null | undefined>
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
async function fetchUser(token: string): Promise<UserTypes | null | undefined> {
	if (!token) return;

	const response = await fetch(`${apiUrl}/api/person`, {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	if (!response.ok) {
		console.error('Failed to fetch user');
		return;
	}
	const user = await response.json();
	return user as UserTypes;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			apiKey: null,
			userDetails: null,
			setApiKey: async (token) => {
				if (!token) {
					set({ apiKey: null, userDetails: null });
					return;
				}

				const user = await fetchUser(token);
				if (!user) {
					set({ apiKey: null, userDetails: null });
					return;
				}
				set({ apiKey: token, userDetails: user });
				return user;
			},
		}),
		{
			name: 'auth-storage',
		},
	),

)