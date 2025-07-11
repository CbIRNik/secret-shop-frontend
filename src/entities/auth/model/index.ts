import { create } from "zustand"

type AuthState = {
  showAuth: boolean
  setShowAuth: (showAuth: boolean) => void
}

const initialStore = {
  showAuth: false,
}

const AuthStore = create<AuthState>()((set) => ({
  ...initialStore,
  setShowAuth: (showAuth) => set(() => ({ showAuth })),
}))

export { AuthStore }
