import { Hono } from "hono";
import { createZip } from "littlezipper";

type FileItem = {
  name: string;
  base64: string;
};

const app = new Hono();

app.post("/zip", async (c) => {
  const files: FileItem[] = await c.req.json();

  if (!files?.length) {
    return c.json({ error: "No files provided" }, 400);
  }

  try {
    const zipEntries = files.map((file) => ({
      path: file.name,
      data: Uint8Array.from(atob(file.base64.replace(/^data:.*;base64,/, "")), (c) => c.charCodeAt(0)),
      lastModified: new Date(),
    }));

    const zipData = await createZip(zipEntries);
    const filename = `files_${new Date().toISOString().replace(/[:.]/g, "-")}.zip`;

    return new Response(zipData, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": zipData.length.toString(),
      },
    });
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Failed to process files" }, 500);
  }
});

export default app;
