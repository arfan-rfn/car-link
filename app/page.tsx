'use client'
import { Cars } from "@/components/cars"
import { Chat } from "@/components/chat"
import { ProfileCard } from "@/components/profile-card"
import { useAuthStore } from "@/store/auth"

export default function Index() {
  const { userDetails } = useAuthStore();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-1 md:gap-8">
          <ProfileCard/>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {userDetails && <Cars userId={userDetails.id}/>}
          <Chat />
        </div>
      </main>
    </div>
  )
}

