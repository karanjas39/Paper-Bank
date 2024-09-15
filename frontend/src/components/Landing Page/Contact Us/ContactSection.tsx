import React from "react";
import { BackgroundBeams } from "../../ui/background-beams";
import ContactUsForm from "./ContactUsForm";

function ContactSection() {
  return (
    <div className="h-[40rem] w-full bg-neutral-900 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-4xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Contact Us
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-xs md:text-sm text-center relative z-10">
          Have a question or need help? Reach out to us and we&lsquo;ll get back
          to you as soon as possible.
        </p>
        <ContactUsForm />
      </div>
      <BackgroundBeams />
    </div>
  );
}

export default ContactSection;
