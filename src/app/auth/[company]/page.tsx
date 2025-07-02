"use client"
import { httpClient } from "@/shared/api/http-client"
import { type Company } from "@/entities/company/model"
import cookie from "js-cookie"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

const AuthCallback = () => {
  const searchParams = useSearchParams()
  const { company } = useParams() as { company: Company }
  const code = searchParams.get("code")
  const router = useRouter()
	useEffect(() => {
		(async () => {
      try {
        const { data } = await httpClient.post<{ authToken: string }>(`/user/auth/${company}`, { code })
        cookie.set("authToken", data.authToken)
      } catch {
        toast.error("Failed to authenticate")
      }
      router.push("/")
		})()
	}, [router, code, company])
	return (
		<main className={"flex w-dvw h-dvh justify-center items-center"}>
			<div className={"flex flex-col gap-4"}>
				<span>Loading your profile...</span>
			</div>
		</main>
	)
}

export default AuthCallback
