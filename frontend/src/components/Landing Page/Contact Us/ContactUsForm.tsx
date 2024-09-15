"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

function ContactUsForm() {
  const placeholders = [
    "How many uploads can I make this month?",
    "Can you upload the 2023 MSE ADA question paper?",
    "Is there a limit on paper downloads?",
    "How long does it take for my papers to get approved?",
    "How do I earn more upload slots?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="mt-6">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default ContactUsForm;
