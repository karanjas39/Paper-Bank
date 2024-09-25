import {
  LucideProps,
  HomeIcon,
  UploadIcon,
  SettingsIcon,
  PaperclipIcon,
  BellIcon,
  UsersIcon,
  SchoolIcon,
  CircleCheckBigIcon,
  BookIcon,
} from "lucide-react";

// export const BACKEND_URL = "http://127.0.0.1:8787/api/v1";
export const BACKEND_URL =
  "https://paper_bank_backend.beautifulbooth8.workers.dev/api/v1";

export const links: {
  name: string;
  link: string;
  icon?: React.FC<LucideProps>;
}[] = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Notifications",
    link: "/dashboard/notifications",
    icon: BellIcon,
  },
  {
    name: "My Uploads",
    link: "/dashboard/my-uploads",
    icon: UploadIcon,
  },
  {
    name: "Contribute",
    link: "/dashboard/contribute",
    icon: PaperclipIcon,
  },
  {
    name: "Users",
    link: "/dashboard/users",
    icon: UsersIcon,
  },
  {
    name: "Programs",
    link: "/dashboard/programs",
    icon: SchoolIcon,
  },
  {
    name: "Explore Papers",
    link: "/question-papers",
    icon: BookIcon,
  },
  {
    name: "Question Papers",
    link: "/dashboard/qp",
    icon: CircleCheckBigIcon,
  },
  {
    name: "Settings",
    link: "/dashboard/setting",
    icon: SettingsIcon,
  },
];
