'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Avatar,
	AvatarFallback,
} from "@/components/ui/avatar"

import { useAuthStore } from "@/store/auth";
import { Badge } from "./ui/badge";
import { LogIn, User } from "lucide-react";
import { Login } from "./login";


export function LoginCard() {
	const { userDetails } = useAuthStore();
	if (userDetails) {
		return;
	}


	return (
		<Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">

			<CardContent>
				<Login/>
			</CardContent>
		</Card>
	);


}