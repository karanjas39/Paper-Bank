export function createPdfKey(kvNamespace: string) {
  const uniqueId = crypto.randomUUID();
  const key = `${kvNamespace}-${uniqueId}`;
  return key;
}

export default async function uploadData(file: File, kvName: string) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const key = createPdfKey(kvName);

    return { key, data: uint8Array, error: null };
  } catch (error) {
    return { key: null, data: null, error: "Failed to prepare upload data." };
  }
}
