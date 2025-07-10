"use server"

import { UserProvider } from "@/widgets/user/ui/provider"
import { Header } from "@/widgets/header"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <Header />
      <main>
        {children}
      </main>
    </UserProvider>
  )
}

export default MainLayout
