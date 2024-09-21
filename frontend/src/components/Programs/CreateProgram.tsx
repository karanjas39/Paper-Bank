import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  z_createProgram,
  z_createProgram_type,
} from "@singhjaskaran/paperbank-common";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { programApi } from "@/store/api/programApi";
import ButtonLoader from "../Loaders/ButtonLoader";

function CreateProgram() {
  const form = useForm<z_createProgram_type>({
    resolver: zodResolver(z_createProgram),
    defaultValues: {
      name: "",
    },
  });
  const { toast } = useToast();
  const [CreateProgram, { isLoading }] = programApi.useCreateProgramMutation();

  async function onSubmit(values: z_createProgram_type) {
    try {
      const response = await CreateProgram(values).unwrap();
      if (response.success) {
        toast({ description: response.message });
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      if (err?.message?.split(" ")[0] === "\nInvalid")
        err.message = "Unable to create program right now.";
      toast({ description: err.message, variant: "destructive" });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">New Program</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new program</DialogTitle>
          <DialogDescription>
            Use the form below to create a new program for the Paper Bank.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-full"
          >
            <FormField
              control={form.control}
              name="name"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    This should be a unique, descriptive name that accurately
                    reflects the program's purpose or content.
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
                  <span className="mr-1">Submitting</span>
                  <ButtonLoader />
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateProgram;
