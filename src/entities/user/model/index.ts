import { httpClient } from "@/shared/api/http-client"
import cookie from "js-cookie"
import { create } from "zustand"

type User = {
  id: string
  authIds: string[]
	username: string
  avatar: string
}

type UserState = {
  user: User | null,
  setUser: (user: User) => void,
  getUser: (authToken: string | null) => void,
  logout: () => void,
}

const initialStore = {
	user: null
}

const UserStore = create<UserState>()((set) => ({
	...initialStore,
	setUser: (user) => set(() => ({ user })),
	getUser: async (authToken) => {
		if (!authToken) return
		try {
			const { data } = await httpClient.get<{ user: User }>("/user/profile")
			set({ user: data.user })
		} catch {}
	},
	logout: async () => {
		cookie.remove("authToken")
		set(initialStore)
	}
}))

export { 
  type User,
  UserStore
}