import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SideNavLinks from "@/components/SideBar/SideNavLinks";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Logo from "@/components/Navbar/Logo";
import { ThemeToggler } from "../Theme/ThemeToggler";

function TopBar() {
  return (
    <div className="flex items-center justify-between p-2 md:hidden">
      <div>
        <div className="md:hidden block">
          <Logo />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <NavMenuBar />
        <ThemeToggler />
      </div>
    </div>
  );
}

export default TopBar;

function NavMenuBar() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden block">
        <HamburgerMenuIcon className="w-6 h-6" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Paper Bank</SheetTitle>
          <SheetDescription>
            Manage your uploads, view approved question papers, and update your
            account settings.
          </SheetDescription>
        </SheetHeader>
        <SideNavLinks />
      </SheetContent>
    </Sheet>
  );
}
