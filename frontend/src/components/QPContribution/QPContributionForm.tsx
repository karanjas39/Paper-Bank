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
import { qpApi } from "@/store/api/qpApi";
import ButtonLoader from "../Loaders/ButtonLoader";
import { userApi } from "@/store/api/userApi";
import { useDispatch } from "react-redux";
import { USER_TAG } from "@/lib/ApiTags";

function ContributeForm() {
  const form = useForm<z_createQuestionPaper_type>({
    resolver: zodResolver(z_createQuestionPaper),
    defaultValues: {
      courseCode: "",
      courseName: "",
      examType: "",
      programId: undefined,
      year: undefined,
      pdf: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const { data, isFetching: isFetchingPrograms } =
    programApi.useGetProgramsQuery();
  const [uploadQP, { isLoading }] = qpApi.useUploadQPMutation();
  const [, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();

  const handleFileUpload = (uploadedFile: File | null) => {
    setFile(uploadedFile);
    if (uploadedFile) {
      form.setValue("pdf", uploadedFile);
    } else {
      form.setValue("pdf", null);
    }
  };

  async function onSubmit(values: z_createQuestionPaper_type) {
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key === "pdf" && value instanceof File) {
          formData.append("file", value);
        } else {
          formData.append(key, String(value));
        }
      });

      const response = await uploadQP(formData).unwrap();
      if (response.success) {
        toast({ description: response.message });
        dispatch(userApi.util.invalidateTags([USER_TAG]));
        router.replace("/dashboard/my-uploads");
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      if (err?.message?.split(" ")[0] === "\nInvalid")
        err.message = "Unable to upload question paper right now.";
      toast({ description: err.message, variant: "destructive" });
    }
  }

  if (isFetchingPrograms) return <Loader />;

  return (
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
                Enter the full name of the course as it appears on the question
                paper
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MSE">Mid-Semester Exam (MSE)</SelectItem>
                  <SelectItem value="ESE">End-Semester Exam (ESE)</SelectItem>
                  <SelectItem value="REAPPEAR">Re-appear Exam</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Choose the type of examination</FormDescription>
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
                Select the academic program associated with this question paper
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
        <FileUpload onChange={handleFileUpload} isLoading={isLoading} />
        <Button
          type="submit"
          disabled={isLoading}
          variant="primary"
          className="mt-1"
        >
          {isLoading ? (
            <>
              <span className="mr-1">Uploading</span>
              <ButtonLoader />
            </>
          ) : (
            "Upload Question Paper"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default ContributeForm;
