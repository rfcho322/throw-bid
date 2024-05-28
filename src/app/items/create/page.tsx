import { auth } from "@/auth";
import CreateForm from "@/components/create-form";
import { redirect } from "next/navigation";

export default async function CreatePage() {

    const session = await auth();
    if (!session || !session.user) {
      redirect("/");
      // throw new Error("Unauthorized");
    }

    return (
        <CreateForm />
    );
}
