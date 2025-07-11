"use server"

import { ClientSideUserProvider } from "./client-side"
import { getUser } from "@/features/user/api/get-user"

const UserProvider = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser()
  return <ClientSideUserProvider user={user}>{children}</ClientSideUserProvider>
}

export { UserProvider }
