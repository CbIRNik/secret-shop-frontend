import { LoaderCircle } from "lucide-react"
import clsx from "clsx"

const Loader = ({className}: {className?: string}) => {
  return <LoaderCircle className={clsx("animate-spin text-muted-foreground", className)} />
}

export { Loader }
