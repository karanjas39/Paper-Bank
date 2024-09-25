"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { userApi } from "@/store/api/userApi";

function ResetUploads({ id, count }: { id: number; count: number }) {
  const [ResetUpload, { isLoading }] = userApi.useResetUploadsMutation();
  const { toast } = useToast();

  async function handleContinue() {
    try {
      if (count === 0) throw new Error("Upload count is already reset.");
      const response = await ResetUpload({ userId: id }).unwrap();
      if (response.success) {
        toast({ description: response.message });
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      if (err?.message?.split(" ")[0] === "\nInvalid")
        err.message = "Unable to reset uploads right now.";
      toast({ description: err.message, variant: "destructive" });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          Reset Uploads
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently reset the upload
            count.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ResetUploads;
