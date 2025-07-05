"use client"
import { type User, UserStore } from "@/entities/user/model"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Button } from "@/shared/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/shared/ui/dropdown-menu"
import { LogOut, BadgeCheck } from "lucide-react"

const UserInfo = () => {
  const { logout } = UserStore()
  const user = UserStore().user as User

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true}>
        <Button className={"rounded-full"} size={"icon"} variant={"ghost"}>
          <UserAvatar user={user} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="p-0 font-normal">
          {user.username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck />
            Account
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const UserAvatar = ({ user }: { user: User }) => {
  return (
    <Avatar>
      <AvatarFallback>SH</AvatarFallback>
      <AvatarImage src={user.avatar} />
    </Avatar>
  )
}

export { UserInfo }
