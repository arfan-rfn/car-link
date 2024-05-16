'use client';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { UserTypes } from "@/types/all-types"
import { Car, ChevronsRight, Trash2, Users } from "lucide-react"
import { AddUser } from "./add-user"
import { useAuthStore } from "@/store/auth"
import { toast } from "sonner"

type UserListProps = {
	users: UserTypes[],
	selectedUserId: number | null | undefined,
	onSelectUser: (userId: number | null) => void
}

export function UserList({ users, onSelectUser, selectedUserId }: UserListProps) {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	const { apiKey } = useAuthStore();

	const onDelete = async (id: number) => {
		const response = await fetch(`${apiUrl}/api/person/${id}`, {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
		});
		if (!response.ok) {
			toast.error('Failed to remove user');
			return;
		}

		if (window !== undefined) {
			window.location.reload();
		}
	}

	return (
		<Card x-chunk="dashboard-01-chunk-5">
			<CardHeader className="flex flex-row items-center">
				<div className="grid gap-2">
					<CardTitle className="flex justify-start items-center">
						<Users className="mr-2" />
						<span>Users</span>
					</CardTitle>
					<CardDescription>
						List of all users
					</CardDescription>
				</div>
				<div className="ml-auto gap-1">
					<AddUser />
				</div>
			</CardHeader>
			<CardContent className="grid gap-2">
				{users.map((user) => (
					<div
						key={user.id}
						className={cn("flex items-center gap-4 p-2 cursor-pointer hover:bg-muted", {
							"font-semibold border-2": user.id === selectedUserId,
						})}
						onClick={() => onSelectUser(user.id)}
					>
						<Avatar className="hidden h-9 w-9 sm:flex">
							<AvatarFallback>{user.name[0]}</AvatarFallback>
						</Avatar>
						<div className="grid gap-1">
							<p className="text-sm font-medium leading-none">
								{user.name}
								{user.role.toLowerCase() === 'admin' && <Badge className="ml-2" variant='outline'>Admin</Badge>}
							</p>
							<p className="text-sm text-muted-foreground">
								{user.email}
							</p>
							<p className="flex text-muted-foreground text-sm items-center">
								<span>
									{user.cars.length}
								</span>
								<Car className="size-4 text-muted-foreground mx-1" />
							</p>
						</div>
						<div className="ml-auto font-medium">
							<Button
								variant='ghost'
								size='icon'
								className="hover:text-destructive"
								onClick={() => onDelete(user.id)}
							>
								<Trash2 className="size-4" />
							</Button>
						</div>
						<ChevronsRight className={cn("opacity-0 size-5 text-muted-foreground", { 'opacity-100': user.id === selectedUserId })} />
					</div>
				))}
			</CardContent>
		</Card>
	);
}