"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z_signup, z_signup_type } from "@singhjaskaran/paperbank-common";

export default function SignIn() {
  const form = useForm<z_signup_type>({
    resolver: zodResolver(z_signup),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      programId: 1,
    },
  });
  return <div></div>;
}
