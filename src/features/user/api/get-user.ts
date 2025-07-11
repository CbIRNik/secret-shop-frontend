import { httpClient } from "@/shared/api/http-client"
import { User } from "@/entities/user/model"
import { handlers } from "@/shared/config/handlers"

const getUser = async () => {
  try {
    const { data } = await httpClient.get<{ user: User }>(handlers.get.user.profile)
    return data.user
  } catch {}
  return null
}

export { getUser }