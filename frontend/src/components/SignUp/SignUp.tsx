"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z_signup, z_signup_type } from "@singhjaskaran/paperbank-common";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "../ui/input";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import Link from "next/link";
import ButtonLoader from "../Loaders/ButtonLoader";
import { authApi } from "@/store/api/authApi";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { programApi } from "@/store/api/programApi";
import Loader from "../Loaders/Loader";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

function SignUp() {
  const { data, isFetching } = programApi.useGetProgramsQuery();
  const form = useForm<z_signup_type>({
    resolver: zodResolver(z_signup),
    defaultValues: {
      name: "",
      programId: 0,
      email: "",
      password: "",
    },
  });
  const [SignUp, { isLoading }] = authApi.useSignUpMutation();
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(values: z_signup_type) {
    try {
      const response = await SignUp(values).unwrap();
      if (response.success) {
        toast({ description: response.message });
        router.push("/signin");
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      toast({ description: err.message, variant: "destructive" });
    }
  }

  if (isFetching) return <Loader />;

  return (
    <div className="sm:w-[35%] w-[80%] mx-auto sm:rounded-2xl rounded-lg p-8 shadow-input my-5">
      <div className="my-7 flex flex-col gap-2">
        <TextGenerateEffect
          words={"Join Paper Bank Today!"}
          className="text-3xl"
        />
        <TextGenerateEffect
          words={"Ace your exams with ease — let's get started!"}
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" type="text" {...field} />
                </FormControl>
                <FormDescription>Enter your full name here</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="programId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Program</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-fu justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value && data?.success
                          ? data.programs.find(
                              (program) => program.id === field.value
                            )?.name
                          : "Select your program"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search programs..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No program found.</CommandEmpty>
                        <CommandGroup>
                          {data?.programs.map((program) => (
                            <CommandItem
                              value={program.name}
                              key={program.id}
                              onSelect={() => {
                                form.setValue("programId", Number(program.id));
                              }}
                            >
                              {program.name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  program.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select the program you are pursuing
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-1">
            {isLoading ? (
              <>
                <span>Submitting...</span>
                <ButtonLoader />
              </>
            ) : (
              "Submit"
            )}
          </Button>
          <p className="mt-6 text-sm text-center">
            Already have an account?{" "}
            <Link href="/signin" className="text-muted-foreground">
              Signin now
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}

export default SignUp;
