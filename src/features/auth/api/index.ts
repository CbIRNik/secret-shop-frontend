import { Company } from "@/entities/company/model"
import { httpClient } from "@/shared/api/http-client"
import { cookies } from "next/headers"
import { toast } from "sonner"
import { handlers } from "@/shared/config/handlers"

const auth = async (code: string | null, company: Company) => {
  if (!code) return null
  const cookieStore = await cookies()
  try {
    const { data } = await httpClient.post<{ authToken: string }>(
      handlers.post.user.auth.company(company),
      { code },
    )
    cookieStore.set("authToken", data.authToken)
    return data.authToken
  } catch (error) {
    toast.error((error as { message: string }).message)
  }
  return null
}

export { auth }