import { signOut } from "@/auth"
import { Button } from "./ui/button"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({
          redirectTo: "/",
        })
      }}
    >
      <Button className="border bg-white text-black hover:text-white" type="submit">Sign Out</Button>
    </form>
  )
}