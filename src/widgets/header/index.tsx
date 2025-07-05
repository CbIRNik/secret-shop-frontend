"use client"

import { UserStore } from "@/entities/user/model"
import { Separator } from "@/shared/ui/separator"
import { UserInfo } from "@/features/user/ui/info"
import { AuthDialog } from "@/features/auth/ui/dialog"

const Header = () => {

  const { user } = UserStore()

  return (
    <header className={"border-b"}>
      <div className={"p-4 flex items-center justify-between"}>
        <div></div>
        <div className={"flex items-center gap-3.5"}>
          <Separator orientation={"vertical"}/>
          { user && <UserInfo /> }
          { !user && <AuthDialog /> }
        </div>
      </div>
    </header>
  )
}

export { Header }