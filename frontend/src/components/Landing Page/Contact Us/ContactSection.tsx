import React from "react";
import { BackgroundBeams } from "../../ui/background-beams";
import ContactUsForm from "./ContactUsForm";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

function ContactSection() {
  const words = [
    {
      text: "Ask",
    },
    {
      text: "Paper",
      className: "text-col1 dark:text-col1",
    },
    {
      text: "Bank",
      className: "text-col1 dark:text-col1",
    },
    {
      text: "Anything.",
    },
  ];

  return (
    <div className="min-h-[30rem] w-full bg-neutral-900 relative flex flex-col items-center justify-center antialiased">
      <div className="sm:w-[60%] w-[95%] mx-auto p-4 flex items-center justify-center sm:gap-6 gap-2 flex-col">
        <h1 className="text-white  relative z-10 text-4xl sm:text-7xl text-center font-sans font-bold">
          <TypewriterEffectSmooth words={words} />
        </h1>
      </div>
      <ContactUsForm />
      <BackgroundBeams />
    </div>
  );
}

export default ContactSection;
