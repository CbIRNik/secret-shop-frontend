"use client"
import { type User, UserStore } from "@/entities/user/model"
import { routes } from "@/shared/config/routes"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Button } from "@/shared/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/shared/ui/dropdown-menu"
import { LogOut, BadgeCheck } from "lucide-react"
import Link from "next/link"
import { logout } from "@/features/user/model/logout"

const UserInfo = () => {
  const user = UserStore().user as User

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true}>
        <Button className={"rounded-full"} size={"icon"} variant={"ghost"}>
          <UserAvatar user={user} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={"w-56"}
        role={"menu"}
        side={"bottom"}
        align={"end"}
      >
        <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link href={routes.accountRoute}>
            <DropdownMenuItem>
              <BadgeCheck />
              Account
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={logout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const UserAvatar = ({ user }: { user: User }) => {
  const getFallback = () => {
    const [firstName, lastName] = user.username.split(" ")
    if (!lastName) return firstName[0]
    const fallback = `${firstName[0]}${lastName[0]}`
    return fallback
  }
  return (
    <Avatar>
      <AvatarFallback>{getFallback()}</AvatarFallback>
      <AvatarImage src={user.avatar} />
    </Avatar>
  )
}

export { UserInfo }
