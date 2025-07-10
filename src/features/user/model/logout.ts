import { AuthStore } from "@/entities/auth/model"
import { UserStore } from "@/entities/user/model"
import cookies from "js-cookie"

const logout = async () => {
  cookies.remove("authToken")
  UserStore.getState().reset()
  AuthStore.getState().setShowAuth(true)
}

export { logout }
