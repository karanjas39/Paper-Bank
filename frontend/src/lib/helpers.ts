export function formatDate(isoString: string): string {
  const date = new Date(isoString);

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
}
