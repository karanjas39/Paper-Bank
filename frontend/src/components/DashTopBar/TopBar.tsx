import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SideNavLinks from "@/components/DashSideBar/SideNavLinks";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Logo from "@/components/Navbar/Logo";

function TopBar() {
  return (
    <div className="flex items-center justify-between p-2 md:hidden">
      <div>
        <div className="md:hidden block">
          <Logo />
        </div>
      </div>
      <NavMenuBar />
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
      <SheetContent className="flex flex-col min-h-screen">
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
