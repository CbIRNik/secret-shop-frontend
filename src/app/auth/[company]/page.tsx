"use client"

import { type Company } from "@/entities/company/model"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { routes } from "@/shared/config/routes"
import { auth } from "@/features/auth/api"
import { UserStore } from "@/entities/user/model"

const AuthCallback = () => {
  const searchParams = useSearchParams()
  const { company } = useParams() as { company: Company }
  const code = searchParams.get("code")
  const router = useRouter()
  const { getUser } = UserStore()
	useEffect(() => {
		auth(code, company).then((authToken) => {
      getUser(authToken)
    })
    router.push(routes.rootRoute)
	}, [router, code, company])
	return null
}

export default AuthCallback
