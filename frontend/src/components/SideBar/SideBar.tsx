import SideNavLinks from "./SideNavLinks";

function SideBar() {
  return (
    <div className="w-[20%] md:block hidden dark:bg-neutral-900 bg-neutral-200">
      <SideNavLinks />
    </div>
  );
}

export default SideBar;
