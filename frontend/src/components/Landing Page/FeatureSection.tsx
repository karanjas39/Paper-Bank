import { HoverEffect } from "../ui/card-hover-effect";

export function FeatureSection() {
  const content = [
    {
      title: "SignUp",
      description:
        "Create an account on Paper Bank to access a wide range of previous year question papers.",
    },
    {
      title: "Upload Papers",
      description:
        "Upload your own question papers to contribute to the community and earn additional upload credits.",
    },
    {
      title: "Search Papers",
      description:
        "Use advanced filters to easily search for the exact question papers you need for your studies.",
    },
    {
      title: "Download Papers",
      description:
        "Quickly download any available question papers to aid in your exam preparation and revision.",
    },
    {
      title: "Track Contributions",
      description:
        "Monitor your paper contributions and see how you’re helping other students in the Paper Bank community.",
    },
    {
      title: "Request Papers",
      description:
        "Can't find what you're looking for? Submit a request, and our community will help locate the paper.",
    },
  ];

  return (
    <div className="sm:w-[70%] w-[90%] mx-auto flex flex-col mt-3">
      <p className="text-4xl  font-bold text-center">
        Unlock the Full Potential of{"  "}
        <span className="bg-col1 text-foreground sm:p-2 p-[2px] w-max">
          Paper Bank
        </span>
      </p>
      <HoverEffect items={content} />
    </div>
  );
}
