"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useToast } from "@/hooks/use-toast";
import { contactApi } from "@/store/api/contactApi";
import { useState } from "react";

function ContactUsForm() {
  const placeholders = [
    "How many uploads can I make this month?",
    "Can you upload the 2023 MSE ADA question paper?",
    "Is there a limit on paper downloads?",
    "How long does it take for my papers to get approved?",
    "How do I earn more upload slots?",
  ];

  const [ContactAdmin, { isLoading }] = contactApi.useContactAdminMutation();
  const [message, setMessage] = useState<string>("");
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await ContactAdmin({ message }).unwrap();
      if (response.success) {
        toast({ description: response.message });
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      if (err?.message?.split(" ")[0] === "\nInvalid")
        err.message = "Unable to contact right now.";
      toast({ description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="mt-6">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
        disable={isLoading}
      />
    </div>
  );
}

export default ContactUsForm;
