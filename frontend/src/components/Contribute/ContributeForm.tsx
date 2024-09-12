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

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import {
  z_createQuestionPaper,
  z_createQuestionPaper_type,
} from "@singhjaskaran/paperbank-common";

function ContributeForm() {
  const form = useForm<z_createQuestionPaper_type>({
    resolver: zodResolver(z_createQuestionPaper),
    defaultValues: {
      courseCode: "",
      courseName: "",
      examType: "",
      year: new Date().getFullYear(),
      pdf: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  async function onSubmit(values: z_createQuestionPaper_type) {
    console.log(values);
  }

  return (
    <div className="flex flex-col gap-4 w-[50%] mx-auto">
      <div className="text-center font-bold text-2xl">
        <h1>Upload Question Paper</h1>
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
                  <Input
                    placeholder="eg: Expert System"
                    type="text"
                    {...field}
                  />
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
                  <Input placeholder="eg: CSE451" type="text" {...field} />
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
                      <SelectValue placeholder="eg: MSE or ESE" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MSE">MSE</SelectItem>
                    <SelectItem value="ESE">ESE</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select the exam type here</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="primary" className="mt-1">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ContributeForm;
