"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signinType, userType } from "@/lib/ApiTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { clearToken } from "@/store/slices/authSlice";
import { ExitIcon } from "@radix-ui/react-icons";
import { ThemeToggler } from "@/components/Theme/ThemeToggler";

function SideBarBottom() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <UserAvatar user={user} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">{user.name || "John Doe"}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-max">
          <DropdownMenuItem className="flex items-center gap-1">
            <ThemeToggler button={false} />
            <span>Theme</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              dispatch(clearToken());
              router.push("/");
            }}
            className="flex items-center gap-1"
          >
            <span>
              <ExitIcon />
            </span>
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default SideBarBottom;

function UserAvatar({ user }: { user: userType }) {
  const getInitials = (name: string) => {
    const nameParts = name.trim().split(" ");
    if (nameParts.length > 1) {
      return nameParts[0][0] + nameParts[1][0];
    }

    return nameParts[0].slice(0, 2);
  };

  return (
    <Avatar>
      <AvatarFallback className="uppercase">
        {getInitials(user.name) || "IN"}
      </AvatarFallback>
    </Avatar>
  );
}
