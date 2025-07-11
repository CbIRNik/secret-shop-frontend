"use client"

import { Separator } from "@/shared/ui/separator"
import { AuthDialog } from "@/features/auth/ui/dialog"
import Link from "next/link"
import { routes } from "@/shared/config/routes"
import { AuthStore } from "@/entities/auth/model"
import { UserStore } from "@/entities/user/model"
import { Loader } from "@/shared/ui/loader"
import dynamic from "next/dynamic"
import { Suspense } from "react"

const UserInfo = dynamic(() =>
  import("@/features/user/ui/info").then(({ UserInfo }) => UserInfo),
)

const Header = () => {
  const { showAuth } = AuthStore()
  const { user } = UserStore()

  return (
    <header className={"border-b"}>
      <div className={"p-4 flex items-center justify-between"}>
        <Link
          href={routes.rootRoute}
          className={"select-none font-bold text-md"}
        >
          Secret Shop
        </Link>
        <div className={"flex items-center gap-3.5"}>
          <Separator orientation={"vertical"} className={"!h-8"} />
          {!showAuth && (
            <Suspense
              fallback={
                <div className={"size-9 flex items-center justify-center"}>
                  <Loader />
                </div>
              }
            >
              {user && <UserInfo />}
              {!user && <div className={"size-9"}></div>}
            </Suspense>
          )}
          {showAuth && <AuthDialog />}
        </div>
      </div>
    </header>
  )
}

export { Header }
