export type CarTypes = {
	id: number
	model: string
	year: number
}

export type UserTypes = {
	id: number
	name: string
	email: string
	role: string
	cars: CarTypes[]
}

