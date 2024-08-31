import LightDarkToggle from "@/components/custom-ui/light-dark-toggle";
import "../globals.css";

export default function LoggedOutLayout({ children }) {
  return (
    <>
      <div className="flex flex-col gap-4 min-h-screen items-center justify-center p-24">
        {children}
      </div>
      <LightDarkToggle className={"fixed top-1/2 right-5"} />
    </>
  );
}
