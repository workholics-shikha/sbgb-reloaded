import { PUBLIC_API_BASE_URL } from "@/lib/public-activities";

export type PublicStoryRecord = {
  id: string;
  title: string;
  image: string | null;
  story_place: string | null;
  story_date: string | null;
  description: string | null;
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

export function getPlainStoryText(value?: string | null) {
  if (!value) {
    return "";
  }

  return decodeHtmlEntities(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getStoryHtml(value?: string | null) {
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

export function resolveStoryImage(imagePath?: string | null) {
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

  return `${uploadsOrigin}/uploads/stories/${imagePath}`;
}

export function buildStorySlug(story: Pick<PublicStoryRecord, "id" | "title">) {
  const normalizedTitle = story.title
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\u0900-\u097f]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return normalizedTitle ? `${story.id}-${normalizedTitle}` : String(story.id);
}

export async function fetchPublicStories() {
  const response = await fetch(`${PUBLIC_API_BASE_URL}/stories`);

  if (!response.ok) {
    throw new Error("Unable to load stories");
  }

  const rows = (await response.json()) as PublicStoryRecord[];

  return rows
    .filter((row) => row.is_active && row.status === 1)
    .sort((left, right) => {
      const leftDate = left.story_date ? new Date(left.story_date).getTime() : 0;
      const rightDate = right.story_date ? new Date(right.story_date).getTime() : 0;
      return rightDate - leftDate || Number(right.id) - Number(left.id);
    });
}

export async function fetchPublicStoryBySlug(storySlug: string) {
  const stories = await fetchPublicStories();
  return stories.find((story) => buildStorySlug(story) === storySlug) || null;
}
