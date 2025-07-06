"use client"

import { authVariants } from "@/entities/company/model"
import { Button } from "@/shared/ui/button"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/dialog"
import { redirect } from "next/navigation"

const AuthDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button variant={"outline"}>Get Started</Button>
      </DialogTrigger>
      <DialogContent className={"w-auto max-w-lg md:max-w-96"}>
        <DialogHeader className={"items-center p-4"}>
          <DialogTitle>Log in or create an account</DialogTitle>
          <DialogDescription>
            We’ll create your account if it doesn’t exist.
          </DialogDescription>
        </DialogHeader>
        <div className={"flex flex-col gap-4 p-6 pt-4"}>
          {authVariants.map((variant, index) => (
            <Button
              key={index}
              variant={"outline"}
              className={"w-full px-8"}
              onClick={() => redirect(variant.url)}
            >
              <Image src={variant.icon} alt="" width={16} height={16} />
              Continue with {variant.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { AuthDialog }
