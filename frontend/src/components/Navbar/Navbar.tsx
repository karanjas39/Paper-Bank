import Logo from "./Logo";
import { Button } from "../ui/button";
import { ThemeToggler } from "../Theme/ThemeToggler";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function Navbar() {
  const path = usePathname();
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <div className="px-6 py-4 flex items-center justify-between bg-white dark:bg-black">
      <Logo />
      <div className="flex items-center gap-3">
        {token ? (
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        ) : path === "/signin" ? (
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        ) : (
          <Link href="signin">
            <Button variant="col">Sign In</Button>
          </Link>
        )}
        <ThemeToggler />
      </div>
    </div>
  );
}

export default Navbar;
