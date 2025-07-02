"use client"

import { UserStore } from "@/entities/user/model"
import { useEffect } from "react"
import cookie from "js-cookie"

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const authToken = cookie.get("authToken") || null

  const { getUser } = UserStore()
  useEffect(() => {
    getUser(authToken)
  }, [getUser, authToken])

  return children
}

export { UserProvider }
