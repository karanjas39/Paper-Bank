import React from "react";
import Logo from "../../Navbar/Logo";
import SideBarBottom from "./UserAvatar";

function SideBar() {
  return (
    <div className="w-[20%] h-screen md:block hidden dark:bg-neutral-900 bg-neutral-200">
      <SideItems />
    </div>
  );
}

export default SideBar;

export function SideItems() {
  return (
    <div className="flex flex-col justify-between md:min-h-screen flex-1 md:p-4">
      <div>
        <Logo />
      </div>
      <SideBarBottom />
    </div>
  );
}
