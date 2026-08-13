import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useMemo, useState } from "react";
import { Building2, Handshake, MapPin, Send } from "lucide-react";

import { SiteHeader } from "@/components/site/SiteHeader";
import { CTASection, PageHero, SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/csr-partnership")({
  head: () => ({
    meta: [
      { title: "CSR Partnership | SBGBT" },
      {
        name: "description",
        content: "SBGBT के साथ CSR partnership के लिए अपनी संस्था की जानकारी और सहयोग प्रस्ताव साझा करें।",
      },
    ],
  }),
  component: CsrPartnershipPage,
});

type CsrFormData = {
  companyName: string;
  concernPerson: string;
  mobileNumber: string;
  email: string;
  city: string;
  tehsilBlock: string;
  district: string;
  state: string;
};

type CsrFieldConfig = {
  name: keyof CsrFormData;
  label: string;
  placeholder: string;
  type: "text" | "tel" | "email";
  required?: boolean;
  apiKey: string;
};

const csrFieldSections: Array<{
  title: string;
  description: string;
  fields: CsrFieldConfig[];
}> = [
  {
    title: "Organization Details",
    description: "Company aur primary contact details",
    fields: [
      {
        name: "companyName",
        label: "Company Name",
        placeholder: "Enter Company Name",
        type: "text",
        required: true,
        apiKey: "name_of_company",
      },
      {
        name: "concernPerson",
        label: "Concern Person",
        placeholder: "Enter Contact Person",
        type: "text",
        required: true,
        apiKey: "name_of_concern_person",
      },
      {
        name: "mobileNumber",
        label: "Mobile Number",
        placeholder: "Enter Mobile Number",
        type: "tel",
        required: true,
        apiKey: "mobile",
      },
      {
        name: "email",
        label: "E-Mail ID",
        placeholder: "Enter Email ID",
        type: "email",
        required: true,
        apiKey: "email",
      },
    ],
  },
  {
    title: "Location Details",
    description: "Project area aur operational geography",
    fields: [
      {
        name: "city",
        label: "City",
        placeholder: "Enter City",
        type: "text",
        required: true,
        apiKey: "city",
      },
      {
        name: "tehsilBlock",
        label: "Tehsil / Block",
        placeholder: "Enter Tehsil / Block",
        type: "text",
        required: true,
        apiKey: "tehsil_block",
      },
      {
        name: "district",
        label: "District",
        placeholder: "Enter District",
        type: "text",
        required: true,
        apiKey: "district",
      },
      {
        name: "state",
        label: "State",
        placeholder: "Enter State",
        type: "text",
        required: true,
        apiKey: "state",
      },
    ],
  },
];

const initialFormData: CsrFormData = {
  companyName: "",
  concernPerson: "",
  mobileNumber: "",
  email: "",
  city: "",
  tehsilBlock: "",
  district: "",
  state: "",
};

function CsrPartnershipPage() {
  const [formData, setFormData] = useState<CsrFormData>(initialFormData);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const flatFields = useMemo(
    () => csrFieldSections.flatMap((section) => section.fields),
    [],
  );

  const payload = useMemo(
    () =>
      flatFields.reduce<Record<string, string>>((current, field) => {
        current[field.apiKey] = formData[field.name].trim();
        return current;
      }, {}),
    [flatFields, formData],
  );

  const handleFieldChange = (name: keyof CsrFormData, value: string) => {
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSent(false);

    try {
      const response = await fetch("/api/csr-forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(result?.message || "CSR form submit नहीं हो पाया।");
      }

      setSent(true);
      setFormData(initialFormData);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "CSR form submit नहीं हो पाया।",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="CSR Partnership" />

      <section className="border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20">
           
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-border bg-card/95 p-6 shadow-lg sm:p-8"
          >
            <h2 className="font-display text-3xl font-bold text-primary">CSR Partnership</h2>
            <p className="mt-2 text-muted-foreground">Join hands with SBGBT to create a positive social impact.</p>

            <div className="mt-8 space-y-6">
              {csrFieldSections.map((section) => (
                <section key={section.title} className="rounded-[1.5rem] border border-border bg-background/40 p-5">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-foreground">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    {section.fields.map((field) => (
                      <label key={field.name}>
                        <span className="mb-2 block text-sm font-medium">
                          {field.label}
                          {field.required && <span className="text-red-500"> *</span>}
                        </span>
                        <input
                          required={field.required}
                          type={field.type}
                          value={formData[field.name]}
                          onChange={(event) => handleFieldChange(field.name, event.target.value)}
                          placeholder={field.placeholder}
                          className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                        />
                      </label>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-white shadow-lg transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Send className="h-5 w-5" />
              {isSubmitting ? "Submitting..." : "Submit Partnership Request"}
            </button>

            {sent && (
              <p className="mt-4 text-center font-medium text-green-600">
                ✅ Thank you! Your CSR partnership request has been submitted successfully.
              </p>
            )}

            {errorMessage && (
              <p className="mt-4 text-center font-medium text-red-600">{errorMessage}</p>
            )}
          </form>
        </div>
      </section>

      <CTASection />
      <SiteFooter />
    </div>
  );
}
