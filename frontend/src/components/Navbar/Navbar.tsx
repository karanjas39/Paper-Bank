import Logo from "./Logo";
import { Button } from "../ui/button";
import { ThemeToggler } from "../Theme/ThemeToggler";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Navbar() {
  const path = usePathname();

  return (
    <div className="pt-2 px-2 w-full flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-3">
        <ThemeToggler />
        {path !== "/signin" ? (
          <Button>SignIn</Button>
        ) : (
          <Link href="/signup">
            <Button>Signup</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
