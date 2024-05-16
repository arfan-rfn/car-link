
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
import { MessageCircleMore } from "lucide-react";

export function Chat() {
	return (
		<Card x-chunk="dashboard-01-chunk-5">
			<CardHeader>
				<CardTitle className="flex justify-start items-center">
					<MessageCircleMore className="mr-2" />
					<span>Community Chat</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-8">
				<div className="flex items-center gap-4">
					<Avatar className="hidden h-9 w-9 sm:flex">
						<AvatarFallback>OM</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">
							Olivia Martin
						</p>
						<p className="text-sm text-muted-foreground">
							olivia.martin@email.com
						</p>
					</div>
					<div className="ml-auto font-medium">+$1,999.00</div>
				</div>
			</CardContent>
		</Card>
	);
}