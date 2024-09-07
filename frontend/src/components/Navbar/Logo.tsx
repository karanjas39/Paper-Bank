"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import LogoImage from "/public/logo.png";

function Logo() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="cursor-pointer flex items-center gap-2"
    >
      <Image src={LogoImage} alt="Logo image" width={40} />
      <p className="font-bold text-lg sm:text-2xl">Paper Bank</p>
    </div>
  );
}

export default Logo;
