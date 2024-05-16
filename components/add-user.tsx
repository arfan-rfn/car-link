'use client';
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/store/auth";
import { Plus } from "lucide-react"
import { useState } from "react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";


export function AddUser() {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	const [open, setOpen] = useState(false);
	const { apiKey } = useAuthStore();
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('USER');

	const onCreateUser = async () => {

		const body = {
			email: email,
			name: name,
			password: password,
			role: role
		}

		console.log(body);
		const url = `${apiUrl}/api/person`;
		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify(body),
			headers: {
				'Authorization': `Bearer ${apiKey}`,
				'Content-type': 'application/json',
			},
		});
		if (!response.ok) {
			toast.error('Failed to add user');
			return;
		}

		setOpen(false);
		if (typeof window !== 'undefined') {
			window.location.reload();
		}
		toast.success('User added successfully');
	}

	return (
		<Dialog open={open} onOpenChange={setOpen} >
			<DialogTrigger asChild >
				<Button  >
					<Plus className="h-4 w-4 mr-2" />
					User
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>New User</DialogTitle>
					<DialogDescription>
						Add a new user to the system
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							id="name"
							placeholder="John Doe"
							className="col-span-3"
							value={name}
							type="text"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="email" className="text-right">
							Email
						</Label>
						<Input
							id="email"
							placeholder="test@carlink.com"
							className="col-span-3"
							value={email}
							type="email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="password" className="text-right">
							Password
						</Label>
						<Input
							id="password"
							placeholder="password"
							className="col-span-3"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>

				<RadioGroup defaultValue="user" className="grid grid-cols-4 items-center gap-4">
					<Label className="text-right">
						Role
					</Label>
					<div className="flex space-x-8 justify-around items-center">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="user" id="user" onClick={() => setRole('USER')} />
							<Label htmlFor="user">USER</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="admin" id="admin" onClick={() => setRole('ADMIN')} />
							<Label htmlFor="admin">ADMIN</Label>
						</div>
					</div>
				</RadioGroup>
				<DialogFooter>
					<Button onClick={onCreateUser} >Create user</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
