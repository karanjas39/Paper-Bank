"use client";

import { useTheme } from "next-themes";
import BlackLoader from "/public/loader_black.svg";
import WhiteLoader from "/public/loader_white.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

function Loader() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full flex items-center justify-center">
      <Image
        src={resolvedTheme === "dark" ? WhiteLoader : BlackLoader}
        alt="Loader"
        width={100}
      />
    </div>
  );
}

export default Loader;
