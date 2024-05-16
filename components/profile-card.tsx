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
import { User } from "lucide-react";


export function ProfileCard() {
	const { userDetails } = useAuthStore();
	if (!userDetails) {
		return;
	}

	const { name, email, role, cars } = userDetails;

	return (
		<Card x-chunk="dashboard-01-chunk-0">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">
					{role}
				</CardTitle>
				<User className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{name}</div>
				<p className="text-xs text-muted-foreground">
					{email}
				</p>
			</CardContent>
		</Card>
	);


}