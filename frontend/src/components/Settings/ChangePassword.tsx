"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import ButtonLoader from "../Loaders/ButtonLoader";
import { useToast } from "@/hooks/use-toast";
import {
  z_updatePassword,
  z_updatePassword_type,
} from "@singhjaskaran/paperbank-common";
import { userApi } from "@/store/api/userApi";

function ChangePassword() {
  const form = useForm<z_updatePassword_type>({
    resolver: zodResolver(z_updatePassword),
    defaultValues: {
      confirmNewPassword: "",
      newPassword: "",
      previousPassword: "",
    },
  });
  const { toast } = useToast();
  const [UpdatePassword, { isLoading }] = userApi.useUpdatePasswordMutation();

  async function onSubmit(values: z_updatePassword_type) {
    try {
      if (values.confirmNewPassword !== values.newPassword)
        throw new Error("Confirmed password does not match.");
      const response = await UpdatePassword(values).unwrap();
      if (response.success) {
        toast({ description: response.message });
        form.reset();
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      if (err.message.split(" ")[0] === "\nInvalid")
        err.message = "Unable to update password right now.";
      toast({ description: err.message, variant: "destructive" });
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Update account password here</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full"
          >
            <FormField
              control={form.control}
              name="previousPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="previous password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter previous account password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="new password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter new account password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="confirm new password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Confirm new account password
                  </FormDescription>
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
                  <span className="mr-1">Updating...</span>
                  <ButtonLoader />
                </>
              ) : (
                "Update"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ChangePassword;
