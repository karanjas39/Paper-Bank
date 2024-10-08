"use client";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import ButtonLoader from "../Loaders/ButtonLoader";
import { useToast } from "@/hooks/use-toast";
import { programApi } from "@/store/api/programApi";
import Loader from "../Loaders/Loader";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  z_updateUser,
  z_updateUser_type,
} from "@singhjaskaran/paperbank-common";
import { userApi } from "@/store/api/userApi";

function EditDetails() {
  const { data: programsData, isFetching: isFetchingPrograms } =
    programApi.useGetProgramsQuery();
  const { data: userData, isFetching: isFetchingUser } =
    userApi.useGetUserDetailQuery();

  const form = useForm<z_updateUser_type>({
    resolver: zodResolver(z_updateUser),
    defaultValues: {
      name: userData?.user.name,
      programId: userData?.user.program.id,
      email: userData?.user.email,
    },
  });
  const [UpdateUser, { isLoading }] = userApi.useUpdateUserMutation();

  const { toast } = useToast();

  if (isFetchingPrograms && isFetchingUser) return <Loader />;

  async function onSubmit(values: z_updateUser_type) {
    try {
      const response = await UpdateUser(values).unwrap();
      if (response.success) {
        toast({ description: response.message });
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      if (err?.message?.split(" ")[0] === "\nInvalid")
        err.message = "Unable to edit details right now.";
      toast({ description: err.message, variant: "destructive" });
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Edit User Details</CardTitle>
        <CardDescription>Manage and edit user information</CardDescription>
      </CardHeader>
      <CardContent>
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
                          {field.value && programsData?.success
                            ? programsData.programs.find(
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
                            {programsData &&
                              programsData?.programs?.map((program) => (
                                <CommandItem
                                  value={program.name}
                                  key={program.id}
                                  onSelect={() => {
                                    form.setValue(
                                      "programId",
                                      Number(program.id)
                                    );
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

export default EditDetails;
