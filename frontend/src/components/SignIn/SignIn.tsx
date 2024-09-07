"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z_signin, z_signin_type } from "@singhjaskaran/paperbank-common";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export default function SignIn() {
  const form = useForm<z_signin_type>({
    resolver: zodResolver(z_signin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z_signin_type) {
    console.log(values);
  }

  return (
    <div className="sm:w-[40%] w-[80%] mx-auto sm:rounded-2xl rounded-lg p-8 shadow-input mt-10">
      <div className="my-7 flex flex-col gap-2">
        <TextGenerateEffect
          duration={2}
          words={"Welcome to Paper Bank"}
          className="text-3xl"
        />
        <TextGenerateEffect
          duration={2}
          words={"Signin to paper bank if you already have an account"}
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" type="email" {...field} />
                </FormControl>
                <FormDescription>Enter your email here</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormDescription>Enter your password here</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
