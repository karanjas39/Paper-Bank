import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function addWatermarkToPDF(
  pdfBuffer: ArrayBuffer,
  contributedBy: string
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pages = pdfDoc.getPages();
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  for (const page of pages) {
    const { width, height } = page.getSize();
    const fontSize = 30;
    const text = `By ${contributedBy} at Paper Bank`;

    page.drawText(text, {
      x: width / 2 - font.widthOfTextAtSize(text, fontSize) / 2,
      y: height / 2,
      size: fontSize,
      font: font,
      color: rgb(0.5, 0.5, 0.5),
      opacity: 0.6,
    });
  }

  return await pdfDoc.save();
}
