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

type AddCarProps = {
	userId: number
}

export function AddCar({ userId: id }: AddCarProps) {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	const [open, setOpen] = useState(false);
	const { apiKey } = useAuthStore();
	const [model, setModel] = useState('');
	const [year, setYear] = useState('');

	const handleAddCar = async () => {

		const body = {
			model: model,
			year: year,
			ownerId: id
		}

		const url = `${apiUrl}/api/cars`;
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
			toast.error('Failed to add car');
			return;
		}

		setOpen(false);
		if (typeof window !== 'undefined') {
			window.location.reload();
		}
		toast.success('Car added successfully');
	}

	return (
		<Dialog open={open} onOpenChange={setOpen} >
			<DialogTrigger asChild >
				<Button  >
					<Plus className="h-4 w-4 mr-2" />
					Car
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>New Car</DialogTitle>
					<DialogDescription>
						Add a new car to your profile
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Model
						</Label>
						<Input
							id="model"
							placeholder="Tesla Model 3"
							className="col-span-3"
							value={model}
							onChange={(e) => setModel(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="year" className="text-right">
							Year
						</Label>
						<Input
							id="year"
							placeholder="2021"
							className="col-span-3"
							value={year}
							onChange={(e) => setYear(e.target.value)}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button onClick={handleAddCar} >Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
