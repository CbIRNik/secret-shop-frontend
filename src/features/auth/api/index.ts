import { Company } from "@/entities/company/model";
import { httpClient } from "@/shared/api/http-client";
import cookie from "js-cookie";
import { toast } from "sonner";

const auth = async (code: string | null, company: Company) => {
  if (!code) return null
  try {
    const { data } = await httpClient.post<{ authToken: string }>(`/user/auth/${company}`, { code })
    cookie.set("authToken", data.authToken)
    return data.authToken
  } catch (error: any) {
    toast.error(error.message)
  }
  return null
}

export { auth }