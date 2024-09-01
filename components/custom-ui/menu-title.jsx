import { PersonStandingIcon } from "lucide-react";
import Link from "next/link";

export default function MenuTitle() {
  return (
    <h4 className="flex items-center">
      <PersonStandingIcon size={40} className="text-primary" />
      <Link href={"/"}>SupportMe</Link>
    </h4>
  );
}
