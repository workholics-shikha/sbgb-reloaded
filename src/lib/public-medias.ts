import { PUBLIC_API_BASE_URL } from "@/lib/public-activities";

export type PublicMediaRecord = {
  category_id: string;
  category: string | null;
  type: string;
  image: string | null;
  id: string;
  title: string;
  published_date: string | null;
  publisher_name: string | null;
  description: string | null;
  updated_at?: string | null;
  status: number;
  is_active: boolean;
  created_at: string;
};

export type MediaTabType = "सभी" | "प्रिंट मीडिया" | "इलेक्ट्रॉनिक मीडिया";

function getUploadsOrigin() {
  try {
    const apiUrl = new URL(PUBLIC_API_BASE_URL, window.location.origin);
    return apiUrl.origin;
  } catch {
    return window.location.origin;
  }
}

export function resolveMediaImage(imagePath?: string | null) {
  if (!imagePath) {
    return "";
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  const uploadsOrigin = getUploadsOrigin();

  if (imagePath.startsWith("/")) {
    return `${uploadsOrigin}${imagePath}`;
  }

  return `${uploadsOrigin}/uploads/medias/${imagePath}`;
}

export function normalizeMediaType(type?: string | null): Exclude<MediaTabType, "सभी"> {
  const normalized = String(type || "")
    .trim()
    .toLowerCase();

  if (
    normalized.includes("electronic") ||
    normalized.includes("video") ||
    normalized.includes("इलेक्ट्रॉनिक")
  ) {
    return "इलेक्ट्रॉनिक मीडिया";
  }

  return "प्रिंट मीडिया";
}

export async function fetchPublicMedias() {
  const response = await fetch(`${PUBLIC_API_BASE_URL}/medias`);

  if (!response.ok) {
    throw new Error("Unable to load medias");
  }

  const rows = (await response.json()) as PublicMediaRecord[];

  return rows
    .filter((row) => row.is_active && row.status === 1)
    .sort((left, right) => {
      const leftDate = left.published_date ? new Date(left.published_date).getTime() : 0;
      const rightDate = right.published_date ? new Date(right.published_date).getTime() : 0;
      return rightDate - leftDate || Number(right.id) - Number(left.id);
    });
}
