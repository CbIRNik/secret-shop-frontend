"use client"

import { User, UserStore } from "@/entities/user/model"
import { AuthStore } from "@/entities/auth/model"
import { useEffect } from "react"

const ClientSideUserProvider = ({
  user,
  children,
}: {
  user: User | null
  children: React.ReactNode
}) => {
  const { setUser } = UserStore()
  const { setShowAuth } = AuthStore()
  useEffect(() => {
    if (!user) {
      setShowAuth(true)
    }
    setUser(user)
  }, [user, setUser])
  return children
}

export { ClientSideUserProvider }
