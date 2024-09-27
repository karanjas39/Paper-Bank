import { FlipWords } from "@/components/ui/flip-words";

import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import Link from "next/link";

const people = [
  {
    id: 1,
    name: "Rohan Verma",
    designation: "B.Tech CSE",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Varandeep Singh",
    designation: "B.Tech CSE",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Sara Malik",
    designation: "MBA",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Priya Shah",
    designation: "BBA",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Ayush Katoch",
    designation: "B.Tech CSE",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Sneha Patil",
    designation: "M.A. English",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];
function HeroSection() {
  const words = ["faster", "easier", "smarter"];

  return (
    <div className="w-full px-7 h-screen dark:bg-background bg-background  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="text-5xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 flex flex-col gap-2 text-wrap">
        <div className="text-5xl sm:text-7xl font-light text-neutral-600 dark:text-neutral-400 flex flex-col gap-4">
          <p className="flex sm:items-center items-start flex-col sm:flex-row gap-2">
            <span>Study</span>
            <span className="inline-block">
              <FlipWords words={words} className="px-0" />
            </span>
          </p>
          <p>
            with <span className="text-col1 font-bold">Paper Bank</span>
          </p>
        </div>
        <div className="mt-4 md:text-lg text-base font-medium text-neutral-500 dark:text-neutral-300 flex flex-col gap-3">
          <p>
            Contribute question papers to earn honor, access a wealth of study
            materials, and help others excel.
          </p>
          <Link href="/question-papers">
            <Button variant="primary" className="max-w-min" size="lg">
              Explore Papers now
            </Button>
          </Link>
        </div>
        <div className="flex items-start sm:items-center sm:flex-row flex-col sm:gap-7 gap-3 mt-6">
          <div className="flex flex-row items-center justify-center">
            <AnimatedTooltip items={people} />
          </div>
          <div className="text-sm text-muted-foreground flex flex-col gap-1">
            <div className="flex items-center">
              <StarFilledIcon className="text-col1" />
              <StarFilledIcon className="text-col1" />
              <StarFilledIcon className="text-col1" />
              <StarFilledIcon className="text-col1" />
              <StarFilledIcon className="text-col1" />
            </div>
            <p>100+ happy students</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
