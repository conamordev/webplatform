import { v2 as cloudinary } from "cloudinary";

// Parse optional CLOUDINARY_URL (cloudinary://api_key:api_secret@cloud_name)
function parseCloudinaryUrl(rawUrl?: string) {
  if (!rawUrl || !rawUrl.startsWith("cloudinary://")) return null;
  try {
    const parsed = new URL(rawUrl);
    return {
      cloudName: parsed.hostname,
      apiKey: decodeURIComponent(parsed.username),
      apiSecret: decodeURIComponent(parsed.password),
    };
  } catch {
    return null;
  }
}

const fromUrl = parseCloudinaryUrl(process.env.CLOUDINARY_URL);

const cloudName =
  fromUrl?.cloudName ||
  process.env.CLOUDINARY_CLOUD_NAME ||
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  "";
const apiKey = fromUrl?.apiKey || process.env.CLOUDINARY_API_KEY || "";
const apiSecret = fromUrl?.apiSecret || process.env.CLOUDINARY_API_SECRET || "";
const uploadPreset =
  process.env.CLOUDINARY_UPLOAD_PRESET ||
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
  "conamor_uploads";

export const isCloudinarySignedConfigured = Boolean(
  cloudName &&
    apiKey &&
    apiSecret &&
    !cloudName.includes("your-cloud-name") &&
    !apiKey.includes("your-api-key")
);

export const isCloudinaryConfigured = Boolean(
  cloudName &&
    !cloudName.includes("your-cloud-name") &&
    (isCloudinarySignedConfigured || Boolean(uploadPreset))
);

if (isCloudinarySignedConfigured) {
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
 * Builds an optimized Cloudinary delivery URL following Cloudinary transformation rules:
 * - Separate components with `/`, placing `f_auto/q_auto` as final components
 * - Explicit crop mode (`c_scale` for single dimension, `c_fill,g_auto` for exact dimensions)
 */
export function getOptimizedImageUrl(
  imagePath: string,
  options: {
    width?: number;
    height?: number;
    crop?: "fill" | "fit" | "scale" | "thumb" | "limit";
    gravity?: "auto" | "face" | "center";
    quality?: "auto" | number;
    format?: "auto" | "webp" | "avif" | "jpg" | "png";
  } = {}
): string {
  if (!imagePath) return "";

  if (!imagePath.includes("res.cloudinary.com") && imagePath.startsWith("http")) {
    return imagePath;
  }

  const {
    width,
    height,
    crop = width && height ? "fill" : "scale",
    gravity = "auto",
    quality = "auto",
    format = "auto",
  } = options;

  const components: string[] = [];

  if (width && height) {
    const qualifiers = [`c_${crop}`];
    if (crop === "fill" || crop === "thumb") {
      qualifiers.push(`g_${gravity}`);
    }
    qualifiers.push(`h_${height}`, `w_${width}`);
    components.push(qualifiers.join(","));
  } else if (width) {
    const singleCrop = crop === "limit" ? "limit" : "scale";
    components.push(`c_${singleCrop},w_${width}`);
  } else if (height) {
    const singleCrop = crop === "limit" ? "limit" : "scale";
    components.push(`c_${singleCrop},h_${height}`);
  }

  components.push(`f_${format}`, `q_${quality}`);
  const transformChain = components.join("/");

  if (imagePath.includes("res.cloudinary.com")) {
    if (imagePath.includes("/f_auto/q_auto/") && !width && !height) {
      return imagePath;
    }
    const uploadIndex = imagePath.indexOf("/image/upload/");
    if (uploadIndex !== -1) {
      const prefix = imagePath.slice(0, uploadIndex + "/image/upload/".length);
      const rest = imagePath
        .slice(uploadIndex + "/image/upload/".length)
        .replace(/^f_auto\/q_auto\//, "");
      return `${prefix}${transformChain}/${rest}`;
    }
    return imagePath;
  }

  if (cloudName) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformChain}/${imagePath}`;
  }

  return imagePath;
}

/**
 * Uploads an image (base64 data URI) to Cloudinary:
 * - Uses signed Node SDK upload when API key + secret are configured
 * - Uses locked-down `conamor_uploads` preset over REST when only cloud_name + preset are set
 * - Stores original once (no incoming f_auto) and returns optimized delivery URL
 */
export async function uploadToCloudinary(
  fileData: string,
  folder: "events" | "gifts" | "kyc" | "avatars" = "events"
): Promise<CloudinaryUploadResult> {
  if (!isCloudinaryConfigured) {
    throw new Error(
      "Cloudinary no está configurado. Configura NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME en tus variables de entorno."
    );
  }

  if (isCloudinarySignedConfigured) {
    const result = await cloudinary.uploader.upload(fileData, {
      upload_preset: uploadPreset || undefined,
      asset_folder: `conamor/${folder}`,
      public_id_prefix: `conamor/${folder}`,
      resource_type: "image",
      tags: ["conamor", folder],
    });

    const optimizedUrl = getOptimizedImageUrl(result.secure_url);

    return {
      publicId: result.public_id,
      url: optimizedUrl,
      secureUrl: optimizedUrl,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  }

  // Unsigned preset upload (works without exposing or requiring API secret)
  const form = new FormData();
  form.append("file", fileData);
  form.append("upload_preset", uploadPreset);
  form.append("tags", `conamor,${folder}`);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: form,
    }
  );

  const result = await response.json();
  if (!response.ok || result.error) {
    throw new Error(
      result?.error?.message || "Error al subir la imagen a Cloudinary"
    );
  }

  const optimizedUrl = getOptimizedImageUrl(result.secure_url);

  return {
    publicId: result.public_id,
    url: optimizedUrl,
    secureUrl: optimizedUrl,
    width: result.width,
    height: result.height,
    format: result.format,
  };
}
