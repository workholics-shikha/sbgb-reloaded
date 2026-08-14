import { PUBLIC_API_BASE_URL } from "@/lib/public-activities";

export type PublicGalleryRecord = {
  id: string;
  category_id: string;
  category: string | null;
  title: string;
  image: string | null;
  year: string | null;
  updated_at?: string | null;
  status: number;
  is_active: boolean;
  created_at: string;
};

function getUploadsOrigin() {
  try {
    const apiUrl = new URL(PUBLIC_API_BASE_URL, window.location.origin);
    return apiUrl.origin;
  } catch {
    return window.location.origin;
  }
}

export function resolveGalleryImage(imagePath?: string | null) {
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

  return `${uploadsOrigin}/uploads/galleries/${imagePath}`;
}

export async function fetchPublicGalleries() {
  const response = await fetch(`${PUBLIC_API_BASE_URL}/galleries`);

  if (!response.ok) {
    throw new Error("Unable to load galleries");
  }

  const rows = (await response.json()) as PublicGalleryRecord[];

  return rows
    .filter((row) => row.is_active && row.status === 1)
    .sort((left, right) => Number(right.id) - Number(left.id));
}
