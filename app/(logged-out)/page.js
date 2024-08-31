import { Button } from "@/components/ui/button";
import { PersonStandingIcon } from "lucide-react";
import Link from "next/link";

function LandingPage() {
  return (
    <>
      <h1 className="flex gap-2 items-center">
        {" "}
        <PersonStandingIcon size={50} className="text-primary" /> Support Me{" "}
      </h1>
      <p> The Best Dashboard to manage customer support</p>

      <div className="flex gap-2 items-center">
        <Button asChild>
          <Link href={"/login"}>Log in</Link>
        </Button>
        <small> or</small>
        <Button variant={"outline"} asChild>
          <Link href={"/sign-up"}>Sign up</Link>
        </Button>
        <small> or</small>
        <Button asChild>
          <Link href={"/dashboard"}>Dashboard</Link>
        </Button>
      </div>
    </>
  );
}

export default LandingPage;
