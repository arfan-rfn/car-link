import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "./ui/table";
import { Badge } from "./ui/badge";
import { AddCar } from "./add-car";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";
import { CarTypes } from "@/types/all-types";
import { Button } from "./ui/button";
import { Car, Delete, Trash2 } from "lucide-react";

type AddCarProps = {
	userId: number
}

export function Cars({ userId }: AddCarProps) {

	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	const { apiKey } = useAuthStore();
	const [cars, setCars] = useState<CarTypes[]>([]);

	useEffect(() => {
		fetchCars();
	}, [userId]);

	const fetchCars = async () => {
		const response = await fetch(`${apiUrl}/api/cars/${userId}`, {
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
		});
		if (!response.ok) {
			toast.error('Failed to fetch cars');
			return;
		}

		const cars = await response.json();
		setCars(cars);
	}

	const onDelete = async (id: number) => {
		const response = await fetch(`${apiUrl}/api/cars/${id}`, {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
		});
		if (!response.ok) {
			toast.error('Failed to delete car');
			return;
		}

		const updatedCars = cars.filter((car) => car.id !== id);
		setCars(updatedCars);
		toast.success('Car removed!');
	}

	return (
		<Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
			<CardHeader className="flex flex-row items-center">
				<div className="grid gap-2">
					<CardTitle className="flex justify-start items-center">
						<Car className="mr-2" />
						<span>Cars</span>
					</CardTitle>
					<CardDescription>
						Cars on the profile
					</CardDescription>
				</div>
				<div className="ml-auto gap-1">
					<AddCar userId={userId} />
				</div>
			</CardHeader>
			<CardContent>
				{cars.length === 0 && <div className="text-center">
					<p className="text-muted-foreground">No cars found</p>
				</div>}
				{cars.length > 0 && <Table>
					<TableHeader>
						<TableRow>
							<TableHead>Car Model</TableHead>
							<TableHead className="text-right">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{cars.map((car) => (
							<TableRow key={car.id}>
								<TableCell>
									<div className="font-medium">{car.model}</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										{car.year}
									</div>
								</TableCell>
								<TableCell className="text-right">
									<Button variant='ghost' size='icon' onClick={() => onDelete(car.id)}>
										<Trash2 className="h-4 w-4" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>}
			</CardContent>
		</Card>
	);
}