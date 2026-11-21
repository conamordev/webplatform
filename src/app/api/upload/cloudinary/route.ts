import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/jpg",
];

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB max

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as "events" | "gifts" | "kyc" | "avatars") || "events";

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo para subir" },
        { status: 400 }
      );
    }

    // Security check 1: File size validation
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "El archivo excede el límite máximo permitido de 10 MB" },
        { status: 400 }
      );
    }

    // Security check 2: MIME type validation
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Formato de archivo no válido. Se permiten únicamente imágenes JPG, PNG, WEBP o AVIF",
        },
        { status: 400 }
      );
    }

    // Fallback if Cloudinary is not yet configured with real API keys
    if (!isCloudinaryConfigured) {
      // Return a simulated high-fidelity mock URL or local base64 for development continuity
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      return NextResponse.json({
        success: true,
        isMock: true,
        url: base64,
        secureUrl: base64,
        publicId: `mock_${Date.now()}`,
        format: file.type.split("/")[1] || "png",
        message:
          "Cloudinary no está configurado con credenciales reales en .env.local. Se utilizó almacenamiento temporal base64.",
      });
    }

    // Convert file to base64 data URI for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await uploadToCloudinary(base64, folder);

    return NextResponse.json({
      success: true,
      url: result.secureUrl,
      secureUrl: result.secureUrl,
      publicId: result.publicId,
      width: result.width,
      height: result.height,
      format: result.format,
    });
  } catch (error: any) {
    console.error("Error al subir imagen a Cloudinary:", error);
    return NextResponse.json(
      {
        error:
          error?.message || "Ocurrió un error inesperado al procesar la imagen",
      },
      { status: 500 }
    );
  }
}

