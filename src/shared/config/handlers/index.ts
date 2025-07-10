const handlers = {
  get: {
    user: {
      root: "/user",
      profile: "/user/profile",
    },
  },
  post: {
    user: {
      root: "/user",
      auth: {
        root: "/auth",
        company: (company: string) => `/user/auth/${company}`,
      },
    },
  },
}
export { handlers }
