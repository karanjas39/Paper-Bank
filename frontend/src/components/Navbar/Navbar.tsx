import Logo from "./Logo";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

function Navbar() {
  return (
    <div className="pt-2 px-2 w-full flex items-center justify-between">
      <Logo />
      <Button onClick={() => signIn()}>SignIn</Button>
    </div>
  );
}

export default Navbar;
