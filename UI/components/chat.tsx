'use client'
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
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { webSocketService } from "@/lib/websocketService"
import { MessageCircleMore, Send } from "lucide-react";
import { useEffect, useState } from "react"
import { Input } from "./ui/input"
import { useAuthStore } from "@/store/auth"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
} from "./ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ScrollArea } from "./ui/scroll-area"

const formSchema = z.object({
	message: z.string(),
})

export function Chat() {

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			message: '',
		},
	})

	const { userDetails } = useAuthStore();
	const [chat, setChat] = useState<any[]>([]);

	useEffect(() => {
		webSocketService.connect();
		webSocketService.addMessageHandler(handleNewMessage);

		return () => {
			webSocketService.disconnect();
		};
	}, []);

	const handleNewMessage = (newMessage: string) => {
		const incomingMessage = JSON.parse(newMessage);
		setChat(prevChat => [...prevChat, incomingMessage]);
	};

	const onSubmit = (value: z.infer<typeof formSchema>) => {

		const json = JSON.stringify({
			user: userDetails?.name || 'Anonymous',
			message: value.message,
		});

		webSocketService.sendMessage(json);
		form.reset();

	};

	return (
		<Card x-chunk="dashboard-01-chunk-5">
			<CardHeader>
				<CardTitle className="flex justify-start items-center">
					<MessageCircleMore className="mr-2" />
					<span>Community Chat</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea className="grid gap-8 h-80">
					{chat.length === 0 && <div className="text-muted-foreground text-center">No Message yet</div>}
					{chat.map((message, index) => (
						<div key={index} className="flex items-center gap-4 my-6">
							<Avatar className="hidden h-9 w-9 sm:flex">
								<AvatarFallback>{message.user.charAt(0)}</AvatarFallback>
							</Avatar>
							<div className="grid gap-1">
								<p className="text-sm font-medium leading-none">
									{message.user}
								</p>
								<p className="text-sm text-muted-foreground">
									{message.message}
								</p>
							</div>
						</div>
					))}
				</ScrollArea>
			</CardContent>
			<CardFooter>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-center space-x-2">
						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormControl>
										<Input
											type="text"
											placeholder="Type your message here..."

											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button type="submit">
							<Send className="size-4 mr-2" />
							Send
						</Button>
					</form>
				</Form>
			</CardFooter>
		</Card>
	);
}
