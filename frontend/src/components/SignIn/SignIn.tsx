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
import { authApi } from "@/store/api/authApi";
import ButtonLoader from "../Loaders/ButtonLoader";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "@/store/slices/authSlice";
import Link from "next/link";

export default function SignIn() {
  const form = useForm<z_signin_type>({
    resolver: zodResolver(z_signin),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [SignIn, { isLoading }] = authApi.useSignInMutation();
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  async function onSubmit(values: z_signin_type) {
    try {
      const response = await SignIn(values).unwrap();
      if (response.success) {
        toast({ description: response.message });
        dispatch(setToken(response.token));
        router.push("/dashboard");
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      if (err?.message?.split(" ")[0] === "\nInvalid")
        err.message = "Unable to signin right now.";
      toast({
        description: err.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="sm:w-[35%] w-[90%] mx-auto sm:rounded-2xl rounded-lg p-8 shadow-input mt-10 mb-2">
      <div className="my-7 flex flex-col gap-2">
        <TextGenerateEffect
          words={"Welcome to Paper Bank"}
          className="text-3xl"
        />
        <TextGenerateEffect
          words={"Your Ultimate Study Buddy for Exam Success"}
          className="text-sm font-normal text-muted-foreground"
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
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
          <Button
            type="submit"
            disabled={isLoading}
            variant="primary"
            className="mt-1"
          >
            {isLoading ? (
              <>
                <span className="mr-1">Submitting</span>
                <ButtonLoader />
              </>
            ) : (
              "Submit"
            )}
          </Button>
          <p className="mt-6 text-sm text-center">
            New on our platform?{" "}
            <Link href="/signup" className="text-muted-foreground">
              Create an account
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
