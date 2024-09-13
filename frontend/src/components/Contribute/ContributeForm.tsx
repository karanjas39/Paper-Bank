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
import { Input } from "../ui/input";
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
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  z_createQuestionPaper,
  z_createQuestionPaper_type,
} from "@singhjaskaran/paperbank-common";
import { programApi } from "@/store/api/programApi";
import Loader from "../Loaders/Loader";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { FileUpload } from "../ui/file-upload";

function ContributeForm() {
  const form = useForm<z_createQuestionPaper_type>({
    resolver: zodResolver(z_createQuestionPaper),
    defaultValues: {
      courseCode: "",
      courseName: "",
      examType: "",
      programId: 1,
      year: new Date().getFullYear(),
      pdf: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isFetching: isFetchingPrograms } =
    programApi.useGetProgramsQuery();
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (uploadedFile: File | null) => {
    setFile(uploadedFile);
    if (uploadedFile) {
      form.setValue("pdf", uploadedFile);
      console.log(uploadedFile);
    } else {
      form.setValue("pdf", null);
    }
  };

  async function onSubmit(values: z_createQuestionPaper_type) {
    console.log(values);
  }

  if (isFetchingPrograms) return <Loader />;

  return (
    <div className="flex flex-col gap-4 md:w-[50%] w-[90%] mx-auto">
      <div className="text-center font-bold text-2xl">
        <h1>Contribute Question Paper</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <FormField
            control={form.control}
            name="courseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Name</FormLabel>
                <FormControl>
                  <Input placeholder="Expert System" type="text" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the course name of the question paper
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courseCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Code</FormLabel>
                <FormControl>
                  <Input placeholder="CSE451" type="text" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the course code of question paper
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="examType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exam Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="MSE, ESE or REAPPEAR" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MSE">MSE</SelectItem>
                    <SelectItem value="ESE">ESE</SelectItem>
                    <SelectItem value="REAPPEAR">REAPPEAR</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select the exam type here</FormDescription>
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
                          : "Btech CSE"}
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
                          {data &&
                            data?.programs?.map((program) => (
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
                  Select the program of Question Paper
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input placeholder="2024" type="text" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the year of question paper
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FileUpload onChange={handleFileUpload} />
          <Button type="submit" variant="primary" className="mt-1">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ContributeForm;
