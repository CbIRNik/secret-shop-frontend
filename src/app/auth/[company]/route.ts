import { cookies } from "next/headers"
import { auth } from "@/features/auth/api"
import { routes } from "@/shared/config/routes"
import type { Company } from "@/entities/company/model"
import { redirect } from "next/navigation"

type Params = {
  company: Company
}

const GET = async (
  request: Request,
  { params }: { params: Promise<Params> },
) => {
  const { company } = await params
  const code = new URL(request.url).searchParams.get("code") as string | null
  const cookieStore = await cookies()
  const redirectTo = cookieStore.get("redirectTo")?.value ?? routes.rootRoute
  cookieStore.delete("redirectTo")
  await auth(code, company)
  return redirect(redirectTo)
}

export { GET }
