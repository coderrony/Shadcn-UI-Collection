import { PersonStandingIcon } from "lucide-react";
import MenuItem from "./menu-item";
import { Avatar, AvatarFallback } from "../ui/avatar";

import Link from "next/link";
import LightDarkToggle from "./light-dark-toggle";

function MainMenu() {
  return (
    <nav className="overflow-auto flex flex-col bg-muted p-4">
      <header className="flex items-center justify-center border-b dark:border-b-black pb-2">
        <PersonStandingIcon size={40} className="text-primary" />
        <Link href={"/"}>
          <h5>Support Me</h5>
        </Link>
      </header>
      <ul className="flex flex-col space-y-1 mt-4 grow">
        <MenuItem href="/dashboard">My Dashboard</MenuItem>
        <MenuItem href="/dashboard/employees">Employees</MenuItem>
        <MenuItem href="/dashboard/teams">Teams</MenuItem>
        <MenuItem href="/dashboard/account">Account</MenuItem>
        <MenuItem href="/dashboard/settings">Settings</MenuItem>
      </ul>
      <footer className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback className="bg-pink-100 dark:bg-pink-700">
            RD
          </AvatarFallback>
        </Avatar>
        <Link href={"/logout"}>Logout</Link>
        <LightDarkToggle className={"mx-auto cursor-pointer"} />
      </footer>
    </nav>
  );
}

export default MainMenu;
