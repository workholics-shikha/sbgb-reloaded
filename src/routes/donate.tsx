import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, HandCoins, HandHeart } from "lucide-react";

import qrCode from "@/assets/qr-code.png";
import { SiteHeader } from "@/components/site/SiteHeader";
import { CTASection, PageHero, SiteFooter } from "@/components/site/SiteFooter";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

type SelectOption = {
  id: string;
  label: string;
  value: string;
  state_id?: string;
  state_name?: string;
  city_name?: string;
};

type DonationConfig = {
  states: SelectOption[];
  cities: SelectOption[];
  paymentModeOptions: SelectOption[];
  purposeOptions: SelectOption[];
};

type DonationFormValues = {
  donorName: string;
  mobile: string;
  email: string;
  stateId: string;
  cityId: string;
  tehsil: string;
  district: string;
  paymentMode: string;
  donationAmount: string;
  donationDate: string;
  purpose: string;
  donorIdentity: string;
  paymentReceipt: File | null;
};

const emptyConfig: DonationConfig = {
  states: [],
  cities: [],
  paymentModeOptions: [],
  purposeOptions: [],
};

const initialFormValues: DonationFormValues = {
  donorName: "",
  mobile: "",
  email: "",
  stateId: "",
  cityId: "",
  tehsil: "",
  district: "",
  paymentMode: "",
  donationAmount: "",
  donationDate: "",
  purpose: "",
  donorIdentity: "",
  paymentReceipt: null,
};

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "दान करें | SBGBT" },
      {
        name: "description",
        content:
          "SBGBT की शिक्षा, पर्यावरण, महिला सशक्तिकरण और जन स्वास्थ्य पहलों को सहयोग दें। आपका योगदान गाँवों में वास्तविक बदलाव ला सकता है।",
      },
      { property: "og:title", content: "दान करें | SBGBT" },
      {
        property: "og:description",
        content:
          "आपका सहयोग एक छात्रवृत्ति, एक पौधारोपण अभियान या एक स्वास्थ्य शिविर को संभव बना सकता है।",
      },
    ],
  }),
  component: DonatePage,
});

function DonatePage() {
  const [config, setConfig] = useState<DonationConfig>(emptyConfig);
  const [configLoading, setConfigLoading] = useState(true);
  const [configError, setConfigError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formValues, setFormValues] = useState<DonationFormValues>(initialFormValues);

  useEffect(() => {
    let isMounted = true;

    async function loadConfig() {
      setConfigLoading(true);
      setConfigError("");

      try {
        const response = await fetch(`${API_BASE_URL}/donations/config`);
        if (!response.ok) {
          throw new Error("दान फॉर्म कॉन्फ़िगरेशन लोड नहीं हो पाई।");
        }

        const result = (await response.json()) as DonationConfig;
        if (!isMounted) return;

        setConfig(result);
        setFormValues((current) => ({
          ...current,
          paymentMode: result.paymentModeOptions[0]?.value || "",
          purpose: result.purposeOptions[0]?.value || "",
        }));
      } catch (error) {
        if (!isMounted) return;
        setConfig(emptyConfig);
        setConfigError(error instanceof Error ? error.message : "दान फॉर्म कॉन्फ़िगरेशन लोड नहीं हो पाई।");
      } finally {
        if (isMounted) {
          setConfigLoading(false);
        }
      }
    }

    loadConfig();

    return () => {
      isMounted = false;
    };
  }, []);

  const availableCities = useMemo(
    () => config.cities.filter((city) => city.state_id === formValues.stateId),
    [config.cities, formValues.stateId],
  );

  useEffect(() => {
    if (!formValues.stateId) {
      if (formValues.cityId) {
        setFormValues((current) => ({ ...current, cityId: "" }));
      }
      return;
    }

    const cityExists = availableCities.some((city) => city.value === formValues.cityId);
    if (!cityExists) {
      setFormValues((current) => ({ ...current, cityId: availableCities[0]?.value || "" }));
    }
  }, [availableCities, formValues.cityId, formValues.stateId]);

  function updateField<K extends keyof DonationFormValues>(field: K, value: DonationFormValues[K]) {
    setFormValues((current) => ({ ...current, [field]: value }));
    if (submitError) setSubmitError("");
    if (sent) setSent(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");
    setSent(false);
    setSubmitting(true);

    try {
      const selectedState = config.states.find((state) => state.value === formValues.stateId);
      const selectedCity = config.cities.find((city) => city.value === formValues.cityId);

      const payload = new FormData();
      payload.set("donorName", formValues.donorName.trim());
      payload.set("mobile", formValues.mobile.trim());
      payload.set("email", formValues.email.trim());
      payload.set("stateId", formValues.stateId);
      payload.set("stateName", selectedState?.label || "");
      payload.set("cityId", formValues.cityId);
      payload.set("cityName", selectedCity?.label || "");
      payload.set("tehsil", formValues.tehsil.trim());
      payload.set("district", formValues.district.trim());
      payload.set("paymentMode", formValues.paymentMode);
      payload.set("donationAmount", formValues.donationAmount.trim());
      payload.set("donationDate", formValues.donationDate);
      payload.set("purpose", formValues.purpose);
      payload.set("donorIdentity", formValues.donorIdentity.trim());

      if (formValues.paymentReceipt) {
        payload.set("paymentReceipt", formValues.paymentReceipt);
      }

      const response = await fetch(`${API_BASE_URL}/donations`, {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(result?.message || "दान फॉर्म सबमिट नहीं हो पाया।");
      }

      setSent(true);
      setFormValues({
        ...initialFormValues,
        paymentMode: config.paymentModeOptions[0]?.value || "",
        purpose: config.purposeOptions[0]?.value || "",
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "दान फॉर्म सबमिट नहीं हो पाया।");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f0de] text-[#1f1a14]">
      <SiteHeader />
      <PageHero title="दान करें" />

      <section className="pb-16 pt-8 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-[36px] bg-gradient-to-r from-sky-50 via-cyan-50 to-sky-100 shadow-md">
            <div className="grid items-center gap-8 p-8 lg:grid-cols-[140px_1fr_300px]">
              <div className="flex justify-center">
                <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-md">
                  <HandCoins className="h-20 w-20 text-primary" />
                </div>
              </div>

              <div>
                <p className="text-xl font-semibold leading-relaxed text-foreground">
                  इस QR कोड को स्कैन करके आप SBGBT को दान राशि जमा कर सकते हैं। इसकी प्रति
                  (स्क्रीनशॉट / रसीद) फॉर्म भरते समय अपलोड करें।
                </p>

                <div className="mt-6 space-y-3">
                  <p className="text-3xl font-bold text-primary">Bank Name - ICICI Bank</p>
                  <p className="text-3xl font-bold text-primary">Bank Account - 720801001079</p>
                  <p className="text-3xl font-bold text-primary">IFSC Code - ICIC0007208</p>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="rounded-3xl bg-white p-3 shadow-xl">
                  <img src={qrCode} alt="QR Code" className="h-72 w-72 rounded-2xl object-cover" />
                  <p className="mt-3 text-center text-lg font-bold">UPI ID : 9314408609@icici</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-border bg-card/95 p-6 shadow-lg sm:p-8"
            >
              <h2 className="font-display text-3xl font-bold text-primary">दान फॉर्म</h2>

              {configLoading ? (
                <div className="mt-6 rounded-2xl border border-border bg-white/80 p-4 text-sm text-muted-foreground">
                  फॉर्म कॉन्फ़िगरेशन लोड हो रही है...
                </div>
              ) : null}

              {configError ? (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {configError}
                </div>
              ) : null}

              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <Field label="दानदाता का पूरा नाम" required>
                  <input
                    required
                    value={formValues.donorName}
                    onChange={(event) => updateField("donorName", event.target.value)}
                    placeholder="दानदाता का पूरा नाम"
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </Field>

                <Field label="मोबाइल नंबर" required>
                  <input
                    required
                    value={formValues.mobile}
                    onChange={(event) => updateField("mobile", event.target.value)}
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="मोबाइल नंबर"
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </Field>

                <Field label="मेल आईडी" required>
                  <input
                    required
                    type="email"
                    value={formValues.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="Mail ID"
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </Field>

                <Field label="राज्य" required>
                  <select
                    required
                    value={formValues.stateId}
                    onChange={(event) => updateField("stateId", event.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  >
                    <option value="">राज्य चुनें</option>
                    {config.states.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="शहर" required>
                  <select
                    required
                    value={formValues.cityId}
                    onChange={(event) => updateField("cityId", event.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  >
                    <option value="">शहर चुनें</option>
                    {availableCities.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="तहसील" required>
                  <input
                    required
                    value={formValues.tehsil}
                    onChange={(event) => updateField("tehsil", event.target.value)}
                    placeholder="तहसील"
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </Field>

                <Field label="जिला" required>
                  <input
                    required
                    value={formValues.district}
                    onChange={(event) => updateField("district", event.target.value)}
                    placeholder="जिला"
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </Field>

                <Field label="भुगतान का माध्यम" required={false}>
                  <select
                    value={formValues.paymentMode}
                    onChange={(event) => updateField("paymentMode", event.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  >
                    <option value="">भुगतान माध्यम चुनें</option>
                    {config.paymentModeOptions.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="दान की राशि" required>
                  <input
                    required
                    value={formValues.donationAmount}
                    onChange={(event) => updateField("donationAmount", event.target.value)}
                    inputMode="numeric"
                    placeholder="दान की राशि"
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </Field>

                <Field label="दान की दिनांक" required>
                  <div className="relative">
                    <input
                      required
                      type="date"
                      value={formValues.donationDate}
                      onChange={(event) => updateField("donationDate", event.target.value)}
                      className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                    />
                    <CalendarDays className="pointer-events-none absolute right-5 top-1/2 size-5 -translate-y-1/2 text-[#343434]" />
                  </div>
                </Field>

                <Field label="दान का उद्देश्य" required>
                  <select
                    required
                    value={formValues.purpose}
                    onChange={(event) => updateField("purpose", event.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  >
                    <option value="">उद्देश्य चुनें</option>
                    {config.purposeOptions.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="पहचान पत्र - दाता आधार या पैन आईडी" required>
                  <input
                    required
                    value={formValues.donorIdentity}
                    onChange={(event) => updateField("donorIdentity", event.target.value)}
                    placeholder="दाता आधार या पैन आईडी"
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </Field>

                <Field label="भुगतान रसीद" required className="md:col-span-2">
                  <input
                    required
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(event) => updateField("paymentReceipt", event.target.files?.[0] || null)}
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white focus:border-primary"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">JPG, PNG या PDF, अधिकतम 5 MB</p>
                </Field>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={submitting || configLoading}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0a6b43] px-7 py-3 text-base font-bold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <HandHeart className="size-4" />
                  {submitting ? "फॉर्म सबमिट हो रहा है..." : "फॉर्म सबमिट करें"}
                </button>

                {sent ? (
                  <span className="text-sm font-medium text-[#0a6b43]">
                    फॉर्म सफलतापूर्वक जमा हो गया।
                  </span>
                ) : null}
              </div>

              {submitError ? (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {submitError}
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </section>

      <CTASection />
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-3 block text-[1.05rem] font-medium text-[#1a202c]">
        {label}
        {required ? <span className="text-red-500">*</span> : null}
      </span>
      {children}
    </label>
  );
}
