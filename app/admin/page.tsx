'use client';
import { Cars } from '@/components/cars';
import { Button } from '@/components/ui/button';
import { UserList } from '@/components/user-list';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';


export default function ProfilePage() {

	const { apiKey, userDetails } = useAuthStore();
	const [users, setUsers] = useState([]);
	const [userId, setUserId] = useState<number | null>();
	const router = useRouter();

	useEffect(() => {
		fetchUsers();
	}, [apiKey])

	const fetchUsers = async () => {
		if (userDetails?.role.toLowerCase() !== 'admin') {
			console.log(apiKey);
			return;
		}
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/person/all`, {
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
		});
		if (!response.ok) {
			console.error('Failed to fetch users');
			return;
		}

		const users = await response.json();
		setUsers(users);
	}



	if (userDetails?.role.toLowerCase() !== 'admin') {
		return (
			<div className='h-full text-center text-lg my-10'>
				<h1 className='my-4'>Only admins can access this page</h1>
				<Button onClick={() => router.push('/')}>Go back</Button>
			</div>
		);
	}



	return (
		<div className="grid gap-4 md:gap-8 m-4 lg:grid-cols-2 xl:grid-cols-3">
			<UserList users={users} onSelectUser={setUserId} selectedUserId={userId} />
			{userId && <Cars userId={userId} />}
		</div>
	);
};