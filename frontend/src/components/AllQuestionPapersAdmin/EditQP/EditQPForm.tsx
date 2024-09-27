"use client";

import Loader from "@/components/Loaders/Loader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

import { useToast } from "@/hooks/use-toast";
import {
  z_editQuestionPaper,
  z_editQuestionPaper_type,
} from "@singhjaskaran/paperbank-common";
import { programApi } from "@/store/api/programApi";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import ButtonLoader from "@/components/Loaders/ButtonLoader";
import { qpApi } from "@/store/api/qpApi";

function EditQPForm({ qpInfo }: { qpInfo: z_editQuestionPaper_type }) {
  const form = useForm<z_editQuestionPaper_type>({
    resolver: zodResolver(z_editQuestionPaper),
    defaultValues: {
      id: qpInfo.id,
      courseCode: qpInfo.courseCode,
      courseName: qpInfo.courseName,
      examType: qpInfo.examType,
      programId: qpInfo.programId,
      year: qpInfo.year,
    },
  });
  const { toast } = useToast();
  const { data, isFetching: isFetchingPrograms } =
    programApi.useGetProgramsQuery();
  const [updateQP, { isLoading }] = qpApi.useEditQPMutation();

  async function onSubmit(values: z_editQuestionPaper_type) {
    try {
      const response = await updateQP(values).unwrap();
      if (response.success) {
        toast({ description: response.message });
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      if (err?.message?.split(" ")[0] === "\nInvalid")
        err.message = "Unable to update question paper right now.";
      toast({ description: err.message, variant: "destructive" });
    }
  }

  if (isFetchingPrograms) return <Loader />;

  return (
    <Dialog>
      <DialogTrigger className="h-8 rounded-md px-3 pl-2 text-sm hover:bg-accent hover:text-accent-foreground text-start w-full">
        Edit Question Paper
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Question Paper</DialogTitle>
          <DialogDescription>
            Here you can update the question paper details incase of incorrect
            info.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[350px] overflow-scroll p-1">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 w-full"
            >
              <FormField
                control={form.control}
                name="courseName"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Advanced Database Systems"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the full name of the course as it appears on the
                      question paper
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="courseCode"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Code</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. CS6015" type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the official course code (letters and numbers)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="examType"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select exam type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MSE">
                          Mid-Semester Exam (MSE)
                        </SelectItem>
                        <SelectItem value="ESE">
                          End-Semester Exam (ESE)
                        </SelectItem>
                        <SelectItem value="REAPPEAR">Re-appear Exam</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the type of examination
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="programId"
                disabled={isLoading}
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
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? data?.success &&
                                data.programs.find(
                                  (program) => program.id === field.value
                                )?.name
                              : "Select a program"}
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
                              {data?.success &&
                                data.programs?.map((program) => (
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
                      Select the academic program associated with this question
                      paper
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 2024" type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the year when this exam was conducted
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
                    <span className="mr-1">Updating</span>
                    <ButtonLoader />
                  </>
                ) : (
                  "Update Question Paper"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditQPForm;
