import { create } from "zustand"

type User = {
  id: string
  authIds: string[]
  username: string
  avatar: string
}

type UserState = {
  user: User | null
  setUser: (user: User | null) => void
  reset: () => void
}

const initialStore = {
  user: null
}

const UserStore = create<UserState>()((set) => ({
  ...initialStore,
  setUser: (user) => {
    if (!user) return set(() => initialStore)
    set(() => ({ user }))
  },
  reset: async () => {
    set(initialStore)
  },
}))

export { type User, UserStore }
