export default async function uploadData(file: File, userId: number) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const data = new Uint8Array(arrayBuffer).toString();
    const key = `pdf-${userId}-${Date.now()}-${Math.floor(
      1 + Math.random() * 20
    )}`;

    return { key, data, error: null };
  } catch (error) {
    return { key: null, data: null, error: "Failed to prepare upload data." };
  }
}
