import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Paper Bank",
    short_name: "Paper Bank",
    description:
      "Discover and share university question papers with ease. Our platform allows students to upload, review, and access question papers for various courses, with admin-approved content ensuring quality. Built for DAV University students, this resource helps you prepare for exams by offering MSE and ESE papers categorized by programs.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
