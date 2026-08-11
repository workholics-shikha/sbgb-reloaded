import { createFileRoute } from "@tanstack/react-router";
import { ChangeEvent, FormEvent, useState } from "react";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";

import { SiteHeader } from "@/components/site/SiteHeader";
import { CTASection, PageHero, SiteFooter, socialLinks } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "संपर्क करें | SBGBT" },
      {
        name: "description",
        content:
          "SBGBT टीम से ईमेल, फोन या कार्यालय पते के माध्यम से जुड़ें। स्वयंसेवा, साझेदारी, मीडिया और कार्यक्रमों से जुड़े प्रश्न यहाँ भेजें।",
      },
      { property: "og:title", content: "संपर्क करें | SBGBT" },
      {
        property: "og:description",
        content:
          "स्वयंसेवा, साझेदारी, मीडिया या छात्रवृत्ति कार्यक्रमों के लिए SBGBT टीम से सीधे संपर्क करें।",
      },
    ],
  }),
  component: Contact,
});

type ContactFormData = {
  name: string;
  email: string;
  state: string;
  city: string;
  subject: string;
  message: string;
};

type ContactFormErrors = ContactFormData;

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  state: "",
  city: "",
  subject: "",
  message: "",
};

const initialErrors: ContactFormErrors = {
  name: "",
  email: "",
  state: "",
  city: "",
  subject: "",
  message: "",
};

function Contact() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const validateForm = () => {
    const nextErrors: ContactFormErrors = {
      name: "",
      email: "",
      state: "",
      city: "",
      subject: "",
      message: "",
    };

    if (!formData.name.trim()) {
      nextErrors.name = "कृपया अपना नाम दर्ज करें।";
    } else if (formData.name.trim().length < 2) {
      nextErrors.name = "नाम कम से कम 2 अक्षरों का होना चाहिए।";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "कृपया ईमेल दर्ज करें।";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "कृपया सही ईमेल पता दर्ज करें।";
    }

    if (!formData.state.trim()) {
      nextErrors.state = "कृपया राज्य लिखें।";
    }

    if (!formData.city.trim()) {
      nextErrors.city = "कृपया शहर लिखें।";
    }

    if (formData.subject.trim() && formData.subject.trim().length < 3) {
      nextErrors.subject = "विषय कम से कम 3 अक्षरों का रखें।";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "कृपया अपना संदेश लिखें।";
    } else if (formData.message.trim().length < 10) {
      nextErrors.message = "संदेश कम से कम 10 अक्षरों का होना चाहिए।";
    }

    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const fieldName = name as keyof ContactFormData;

    setFormData((current) => ({
      ...current,
      [fieldName]: value,
    }));

    if (errors[fieldName]) {
      setErrors((current) => ({
        ...current,
        [fieldName]: "",
      }));
    }

    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          state: formData.state.trim(),
          city: formData.city.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        let errorMessage = "संदेश भेजने में दिक्कत हुई। कृपया थोड़ी देर बाद फिर कोशिश करें।";

        try {
          const result = (await response.json()) as { message?: string };
          if (result.message) {
            errorMessage = result.message;
          }
        } catch {
          // Keep fallback message.
        }

        throw new Error(errorMessage);
      }

      setSubmitStatus({
        type: "success",
        message: "आपका संदेश दर्ज कर लिया गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।",
      });
      setFormData(initialFormData);
      setErrors(initialErrors);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "संदेश भेजने में दिक्कत हुई। कृपया फिर कोशिश करें।",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="संपर्क करें" />

      <section className="border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.15fr]">
          <div className="space-y-4">
            {[
              {
                icon: Mail,
                label: "ईमेल",
                value: "sbgbteam@gmail.com",
                href: "mailto:sbgbteam@gmail.com",
              },
              {
                icon: Phone,
                label: "फोन",
                value: "+91 93144 08609",
                href: "tel:+919314408609",
              },
              {
                icon: MapPin,
                label: "कार्यालय",
                value: "उत्थान भवन, सरमथुरा, धौलपुर, राजस्थान - 328024",
              },
              {
                icon: Clock,
                label: "समय",
                value: "सोमवार से शनिवार · सुबह 10:00 बजे से शाम 6:00 बजे तक",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href ?? "#"}
                className="flex items-start gap-4 rounded-[1.75rem] border border-border bg-card/90 p-5 shadow-sm transition hover:border-primary/35"
              >
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {item.label}
                  </div>
                  <div className="mt-1 break-words font-semibold text-foreground">{item.value}</div>
                </div>
              </a>
            ))}

            <div className="rounded-[1.75rem] border border-border bg-card/90 p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                सोशल मीडिया
              </div>
              <div className="mt-3 flex gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary transition hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-[2rem] border border-border bg-card/95 p-6 shadow-sm sm:p-8"
          >
            <h2 className="font-display text-2xl font-black sm:text-3xl">संदेश भेजें</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              हम सामान्यतः 48 घंटों के भीतर उत्तर देने का प्रयास करते हैं।
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <FormInput
                label="नाम"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="अपना नाम लिखें"
              />

              <FormInput
                label="ईमेल"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com"
              />

              <FormInput
                label="राज्य"
                name="state"
                value={formData.state}
                onChange={handleChange}
                error={errors.state}
                placeholder="राज्य लिखें"
              />

              <FormInput
                label="शहर"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
                placeholder="शहर लिखें"
              />

              <FormInput
                label="विषय"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
                placeholder="स्वयंसेवा, साझेदारी, मीडिया..."
                className="sm:col-span-2"
              />

              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  संदेश
                </span>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`mt-1.5 w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:border-primary ${
                    errors.message ? "border-red-500" : "border-border"
                  }`}
                  placeholder="हमें बताइए कि आप कैसे जुड़ना चाहते हैं।"
                />
                {errors.message && (
                  <p className="mt-1 text-xs font-medium text-red-600">{errors.message}</p>
                )}
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Send className="size-4" />
              {isSubmitting ? "संदेश भेजा जा रहा है..." : "संदेश भेजें"}
            </button>

            {submitStatus && (
              <p
                className={`mt-4 text-sm font-semibold ${
                  submitStatus.type === "success" ? "text-primary" : "text-red-600"
                }`}
              >
                {submitStatus.message}
              </p>
            )}
          </form>
        </div>
      </section>

      <CTASection />
      <SiteFooter />
    </div>
  );
}

type FormInputProps = {
  label: string;
  name: keyof ContactFormData;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: string;
  placeholder: string;
  type?: string;
  className?: string;
};

function FormInput({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  className = "",
}: FormInputProps) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:border-primary ${
          error ? "border-red-500" : "border-border"
        }`}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </label>
  );
}
