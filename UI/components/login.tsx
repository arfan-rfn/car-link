'use client';
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs"
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function Login() {

	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	const router = useRouter();
	const { setApiKey } = useAuthStore();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>();

	const onLogin = async () => {
		const body = {
			email: email,
			password: password
		}

		const url = `${apiUrl}/api/auth/login`;
		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json',
			},
		});
		if (!response.ok) {
			console.error('Login failed', response.statusText);
			setError('Username or password is incorrect');
			return;
		}

		const { token } = await response.json();
		const user = await setApiKey(token);
		if (!user) {
			setError('Could not log in. Please try again later.');
			return;
		}
		toast.success('Logged in successfully');
		router.push('/');
	}


	const onSignUP = async () => {
		const body = {
			name: name,
			email: email,
			password: password
		}

		const url = `${apiUrl}/api/auth/signup`;
		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json',
			},
		});
		if (!response.ok) {
			setError('Could not create account. Please try again later.');
			return;
		}

		const { token } = await response.json();
		setApiKey(token);
		toast.success('Signed up successfully');
		router.push('/');
	}


	return (
		<section className="container flex justify-center items-center mt-12">
			<Tabs defaultValue="account" className="w-[400px]">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="account">Log In</TabsTrigger>
					<TabsTrigger value="password">Sign Up</TabsTrigger>
				</TabsList>
				<TabsContent value="account">
					<Card>
						<CardHeader>
							<CardTitle>Log In</CardTitle>
							<CardDescription>
								Log in to your account
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="email">Email</Label>
								<Input id="email" type="email" value={email} onChange={e => {
									setError(null);
									setEmail(e.target.value)
								}
								} />
							</div>
							<div className="space-y-1">
								<Label htmlFor="password">Password</Label>
								<Input id="password" type="password" value={password} onChange={e => {
									setError(null);
									setPassword(e.target.value)
								}
								} />
							</div>
							{error && <p className="text-destructive text-sm">*{error}</p>}
						</CardContent>
						<CardFooter>
							<Button onClick={onLogin}>Log In</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="password">
					<Card>
						<CardHeader>
							<CardTitle>Sign up</CardTitle>
							<CardDescription>
								Create a new account
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="name">Name</Label>
								<Input id="name" placeholder="Your name" value={name} onChange={e => {
									setError(null);
									setName(e.target.value)
								}
								} />
							</div>
							<div className="space-y-1">
								<Label htmlFor="email">Email</Label>
								<Input id="email" type="email" value={email} onChange={e => {
									setError(null);
									setEmail(e.target.value)
								}
								} />
							</div>
							<div className="space-y-1">
								<Label htmlFor="new">Password</Label>
								<Input id="new" type="password" value={password} onChange={e => {
									setError(null);
									setPassword(e.target.value)
								}
								} />
							</div>
							{error && <p className="text-destructive text-sm">*{error}</p>}
						</CardContent>
						<CardFooter>
							<Button onClick={onSignUP} >Sign Up</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</section>
	)
}
