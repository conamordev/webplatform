import { v2 as cloudinary } from "cloudinary";

const cloudName =
  process.env.CLOUDINARY_CLOUD_NAME ||
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  "";
const apiKey = process.env.CLOUDINARY_API_KEY || "";
const apiSecret = process.env.CLOUDINARY_API_SECRET || "";

export const isCloudinaryConfigured = Boolean(
  cloudName &&
    apiKey &&
    apiSecret &&
    !cloudName.includes("your-cloud-name") &&
    !apiKey.includes("your-api-key")
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export { cloudinary };

export interface CloudinaryUploadResult {
  publicId: string;
  url: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
}

/**
 * Optimizes an existing Cloudinary URL or public ID with auto-format and auto-quality
 */
export function getOptimizedImageUrl(
  imagePath: string,
  options: {
    width?: number;
    height?: number;
    crop?: "fill" | "fit" | "scale" | "thumb";
    quality?: "auto" | number;
    format?: "auto" | "webp" | "avif";
  } = {}
): string {
  if (!imagePath) return "";

  // If it's already an external non-cloudinary URL (e.g. Unsplash), return as is
  if (!imagePath.includes("res.cloudinary.com") && imagePath.startsWith("http")) {
    return imagePath;
  }

  const {
    width,
    height,
    crop = "fill",
    quality = "auto",
    format = "auto",
  } = options;

  // Build transformation string
  const transformations: string[] = [`f_${format}`, `q_${quality}`];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width && height) transformations.push(`c_${crop}`);

  const transformString = transformations.join(",");

  if (imagePath.includes("res.cloudinary.com")) {
    // Inject transformations into existing Cloudinary URL
    const uploadIndex = imagePath.indexOf("/upload/");
    if (uploadIndex !== -1) {
      return `${imagePath.slice(0, uploadIndex)}/upload/${transformString}/${imagePath.slice(
        uploadIndex + 8
      )}`;
    }
    return imagePath;
  }

  // Treat as public ID
  if (cloudName) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${imagePath}`;
  }

  return imagePath;
}

/**
 * Uploads a base64 string or buffer to Cloudinary with secure server-side execution
 */
export async function uploadToCloudinary(
  fileData: string,
  folder: "events" | "gifts" | "kyc" | "avatars" = "events"
): Promise<CloudinaryUploadResult> {
  if (!isCloudinaryConfigured) {
    throw new Error(
      "Cloudinary no está configurado. Configura CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET en tus variables de entorno."
    );
  }

  const result = await cloudinary.uploader.upload(fileData, {
    folder: `conamor/${folder}`,
    resource_type: "image",
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  });

  return {
    publicId: result.public_id,
    url: result.url,
    secureUrl: result.secure_url,
    width: result.width,
    height: result.height,
    format: result.format,
  };
}
