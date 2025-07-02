"use server"

import { httpClient } from "@/shared/api/http-client"

const MainPage = async () => {
  await httpClient.post("/user/auth/github", { code: "123" })
  return (
    <>
      main
    </>
  )
}

export default MainPage