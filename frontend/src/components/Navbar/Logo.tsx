"use client";

import { Playpen_Sans } from "next/font/google";
import { useRouter } from "next/navigation";

const fontStyle = Playpen_Sans({ subsets: ["latin"], weight: ["700"] });

function Logo() {
  const router = useRouter();

  return (
    <p
      className={`${fontStyle.className} font-bold text-lg sm:text-2xl cursor-pointer`}
      onClick={() => router.push("/")}
    >
      Paper Bank
    </p>
  );
}

export default Logo;
