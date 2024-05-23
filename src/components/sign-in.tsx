import { signIn } from "@/auth"
import { Button } from "./ui/button"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <Button className="border bg-white text-black hover:text-white" type="submit">Sign In with Google</Button>
    </form>
  )
} 