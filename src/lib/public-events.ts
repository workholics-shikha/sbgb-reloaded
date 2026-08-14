import { PUBLIC_API_BASE_URL } from "@/lib/public-activities";

export type PublicEventRecord = {
  id: string;
  category_id: string;
  category: string | null;
  title: string;
  from_date: string | null;
  to_date: string | null;
  description: string | null;
  image: string | null;
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

export function getPlainEventText(value?: string | null) {
  if (!value) {
    return "";
  }

  return decodeHtmlEntities(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getEventHtml(value?: string | null) {
  return value?.trim() || "";
}

function getUploadsOrigin() {
  try {
    const apiUrl = new URL(PUBLIC_API_BASE_URL, window.location.origin);
    return apiUrl.origin;
  } catch {
    return window.location.origin;
  }
}

export function resolveEventImage(imagePath?: string | null) {
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

  return `${uploadsOrigin}/uploads/events/${imagePath}`;
}

export async function fetchPublicEvents() {
  const response = await fetch(`${PUBLIC_API_BASE_URL}/events`);

  if (!response.ok) {
    throw new Error("Unable to load events");
  }

  const rows = (await response.json()) as PublicEventRecord[];

  return rows
    .filter((row) => row.is_active && row.status === 1)
    .sort((left, right) => Number(right.id) - Number(left.id));
}
