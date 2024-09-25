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
  z_editProgram,
  z_editProgram_type,
} from "@singhjaskaran/paperbank-common";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { programApi } from "@/store/api/programApi";
import ButtonLoader from "@/components/Loaders/ButtonLoader";

function EditProgram({ id, name }: { id: number; name: string }) {
  const form = useForm<z_editProgram_type>({
    resolver: zodResolver(z_editProgram),
    defaultValues: {
      id,
      name,
    },
  });
  const { toast } = useToast();
  const [UpdateProgram, { isLoading }] = programApi.useUpdateProgramMutation();

  async function onSubmit(values: z_editProgram_type) {
    try {
      const response = await UpdateProgram(values).unwrap();
      if (response.success) {
        toast({ description: response.message });
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      if (err?.message?.split(" ")[0] === "\nInvalid")
        err.message = "Unable to update program right now.";
      toast({ description: err.message, variant: "destructive" });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          Edit Program
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Program Name</DialogTitle>
          <DialogDescription>
            Use the form below to update a program for the Paper Bank.
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
                    reflects the program&lsquo;s purpose or content.
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
                "Update"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProgram;
