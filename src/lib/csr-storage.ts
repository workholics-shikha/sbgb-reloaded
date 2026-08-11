export const CSR_SUBMISSIONS_STORAGE_KEY = "sbgbt-csr-submissions";
export const ADMIN_SESSION_STORAGE_KEY = "sbgbt-admin-session";

export type CsrSubmission = {
  id: string;
  companyName: string;
  concernPerson: string;
  mobileNumber: string;
  email: string;
  city: string;
  tehsilBlock: string;
  district: string;
  state: string;
  address: string;
  aboutPartnership: string;
  submittedAt: string;
};

export function readCsrSubmissions(): CsrSubmission[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CSR_SUBMISSIONS_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as CsrSubmission[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCsrSubmission(submission: CsrSubmission) {
  if (typeof window === "undefined") {
    return;
  }

  const current = readCsrSubmissions();
  window.localStorage.setItem(
    CSR_SUBMISSIONS_STORAGE_KEY,
    JSON.stringify([submission, ...current]),
  );
}
