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
import { Input } from "@/components/ui/input";
import { authApi } from "@/store/api/authApi";
import ButtonLoader from "@/components/Loaders/ButtonLoader";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

function ContactUsForm() {
  const form = useForm<z_signin_type>({
    resolver: zodResolver(z_signin),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [SignIn, { isLoading }] = authApi.useSignInMutation();
  const { toast } = useToast();

  async function onSubmit(values: z_signin_type) {
    try {
      const response = await SignIn(values).unwrap();
      if (response.success) {
        toast({ description: response.message });
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      toast({ description: err.message, variant: "destructive" });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mx-auto z-30 sm:w-[35%] w-[90%] mt-5"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Your Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hello, could you please upload the 2023 MSE question paper for CSE?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          variant="secondary"
          className="mt-1"
        >
          {isLoading ? (
            <>
              <span>Sending...</span>
              <ButtonLoader />
            </>
          ) : (
            "Send message"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default ContactUsForm;
