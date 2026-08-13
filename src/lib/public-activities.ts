export const PUBLIC_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export type PublicActivityRecord = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  cat_id: string;
  type: string;
  updated_at?: string | null;
  status: number;
  is_active: boolean;
  created_at: string;
};

function decodeHtmlEntities(value: string) {
  if (typeof document === "undefined") {
    return value
      .replace(/&nbsp;/g, " ")
      .replace(/&ldquo;/g, '"')
      .replace(/&rdquo;/g, '"')
      .replace(/&lsquo;/g, "'")
      .replace(/&rsquo;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&");
  }

  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
}

export function getPlainActivityText(value?: string | null) {
  if (!value) {
    return "";
  }

  return decodeHtmlEntities(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getActivityHtml(value?: string | null) {
  return value?.trim() || "";
}

export function getUploadsOrigin() {
  try {
    const apiUrl = new URL(PUBLIC_API_BASE_URL, window.location.origin);
    return apiUrl.origin;
  } catch {
    return window.location.origin;
  }
}

export function resolveActivityImage(imagePath?: string | null) {
  if (!imagePath) {
    return "";
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  const uploadsOrigin = getUploadsOrigin();
  if (!uploadsOrigin) {
    return imagePath;
  }

  if (imagePath.startsWith("/")) {
    return `${uploadsOrigin}${imagePath}`;
  }

  return `${uploadsOrigin}/uploads/activities/${imagePath}`;
}

export async function fetchPublicActivities() {
  const response = await fetch(`${PUBLIC_API_BASE_URL}/activities`);

  if (!response.ok) {
    throw new Error("Unable to load activities");
  }

  const rows = (await response.json()) as PublicActivityRecord[];

  return rows
    .filter((row) => row.is_active && row.status === 1)
    .sort((left, right) => Number(left.id) - Number(right.id));
}

export async function fetchPublicActivityById(activityId: string) {
  const rows = await fetchPublicActivities();
  return rows.find((row) => String(row.id) === String(activityId)) || null;
}
