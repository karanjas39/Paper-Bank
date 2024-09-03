export default async function uploadData(file: File, userId: number) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const base64Data = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    );
    const key = `pdf-${userId}-${Date.now()}-${Math.floor(
      1 + Math.random() * 20
    )}`;

    return { key, data: base64Data, error: null };
  } catch (error) {
    return { key: null, data: null, error: "Failed to prepare upload data." };
  }
}
