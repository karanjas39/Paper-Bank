import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { emailApi } from "@/store/api/emailApi";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ButtonLoader from "../Loaders/ButtonLoader";

function VerifyEmail() {
  const [open, setOpen] = useState<boolean>(false);
  const [sendOTP, { isLoading: isSending }] = emailApi.useSendOTPMutation();
  const { toast } = useToast();

  async function sendCode() {
    try {
      const response = await sendOTP().unwrap();
      if (response && response.success) {
        toast({ description: response.message });
        setOpen(true);
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      if (err.message.split(" ")[0] === "\nInvalid")
        err.message = "Unable to send otp right now.";
      toast({
        description: err.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          className="self-end mt-3"
          disabled={isSending}
          onClick={sendCode}
        >
          {isSending ? (
            <>
              <span>Sending</span> <ButtonLoader />
            </>
          ) : (
            " Verify Email"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default VerifyEmail;
