"use client";

import { useTheme } from "next-themes";
import BlackLoader from "/public/loader_black.svg";
import WhiteLoader from "/public/loader_white.svg";
import Image from "next/image";

function ButtonLoader() {
  const { resolvedTheme } = useTheme();
  if (resolvedTheme === "light") {
    return <Image src={WhiteLoader} alt="White Loader" width={25} />;
  }

  return <Image src={BlackLoader} alt="White Loader" width={25} />;
}

export default ButtonLoader;
