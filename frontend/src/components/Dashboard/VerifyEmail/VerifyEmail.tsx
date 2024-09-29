"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z_verifyOTP, z_verifyOTP_type } from "@singhjaskaran/paperbank-common";

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useToast } from "@/hooks/use-toast";
import { emailApi } from "@/store/api/emailApi";
import ButtonLoader from "@/components/Loaders/ButtonLoader";

export default function VerifyEmail() {
  const form = useForm<z_verifyOTP_type>({
    resolver: zodResolver(z_verifyOTP),
    defaultValues: {
      otp: "",
    },
  });
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sendEmail, { isLoading: isSendingOTP }] =
    emailApi.useSendEmailMutation();
  const [verifyEmail, { isLoading: isVerifyingOTP }] =
    emailApi.useVerifyEmailMutation();

  async function onSubmit(values: z_verifyOTP_type) {
    try {
      const response = await verifyEmail(values).unwrap();
      if (response.success) {
        toast({ description: response.message });
        setDialogOpen(false);
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      if (err?.message?.split(" ")[0] === "\nInvalid")
        err.message = "Unable to verify OTP now.";
      toast({ description: err.message, variant: "destructive" });
    }
  }

  async function handleSendEmail() {
    try {
      await sendEmail().unwrap();
      setDialogOpen(true);
      toast({
        description: "An OTP has been sent to your email.",
      });
    } catch (error) {
      toast({
        description: "Failed to send OTP.",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={handleSendEmail}
        disabled={isSendingOTP}
      >
        {isSendingOTP ? (
          <>
            <span>Sending</span> <ButtonLoader />
          </>
        ) : (
          "Verify Email"
        )}
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify OTP</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full mt-2 flex flex-col gap-2"
                >
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>One-Time Password</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup className="w-full">
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormDescription>
                          Please enter the one-time password sent to your email.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isVerifyingOTP}>
                    {isVerifyingOTP ? (
                      <>
                        <span>Verifying</span> <ButtonLoader />
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
