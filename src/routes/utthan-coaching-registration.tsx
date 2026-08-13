import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, FileText, GraduationCap, MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter } from "@/components/site/SiteFooter";

const maxUploadSize = 5 * 1024 * 1024;
const allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"] as const;
const currentYear = new Date().getFullYear();

type SelectOption = {
  id: string;
  label: string;
  value: string;
};

type CityOption = SelectOption & {
  state_id: string;
  state_name: string;
};

type RegistrationConfig = {
  organizations: SelectOption[];
  states: SelectOption[];
  cities: CityOption[];
  categoryOptions: string[];
  courseDurationOptions: string[];
  bloodGroupOptions: string[];
  genderOptions: string[];
};

type RegistrationFormValues = {
  organization: string;
  studentName: string;
  gender: string;
  dateOfBirth: string;
  qualification: string;
  mobile: string;
  email: string;
  studentIdNumber: string;
  studentIdPhoto: FileList | undefined;
  fatherName: string;
  fatherIdNumber: string;
  fatherIdPhoto: FileList | undefined;
  category: string;
  currentAddress: string;
  permanentAddress: string;
  state: string;
  city: string;
  courseName: string;
  courseAdmissionDate: string;
  courseAdmissionYear: number;
  courseDuration: string;
  studentPhoto: FileList | undefined;
  bloodGroup: string;
  aadhaarNumber: string;
  acceptedTerms: boolean;
};

const optionalUploadSchema = z
  .any()
  .refine(
    (value) =>
      !value ||
      !(value instanceof FileList) ||
      value.length === 0 ||
      value[0].size <= maxUploadSize,
    "फ़ाइल 5 MB से छोटी होनी चाहिए।",
  )
  .refine(
    (value) =>
      !value ||
      !(value instanceof FileList) ||
      value.length === 0 ||
      allowedFileTypes.includes(value[0].type as (typeof allowedFileTypes)[number]),
    "केवल JPG, PNG या PDF फ़ाइल स्वीकार की जाएगी।",
  );

const requiredUploadSchema = optionalUploadSchema.refine(
  (value) => value instanceof FileList && value.length > 0,
  "कृपया फ़ाइल अपलोड करें।",
);

const registrationSchema = z.object({
  organization: z.string().trim().min(1, "कृपया कोचिंग संस्थान चुनें।"),
  studentName: z.string().trim().min(2, "कृपया विद्यार्थी का नाम लिखें।"),
  gender: z.string().trim().min(1, "कृपया लिंग चुनें।"),
  dateOfBirth: z.string().min(1, "जन्म दिनांक आवश्यक है।"),
  qualification: z.string().trim().min(2, "योग्यता लिखें।"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "10 अंकों का सही मोबाइल नंबर लिखें।"),
  email: z.string().trim().email("सही ईमेल आईडी लिखें।"),
  studentIdNumber: z.string().trim().min(4, "पहचान पत्र नंबर लिखें।"),
  studentIdPhoto: optionalUploadSchema,
  fatherName: z.string().trim().min(2, "पिता का नाम लिखें।"),
  fatherIdNumber: z.string().trim().optional(),
  fatherIdPhoto: optionalUploadSchema,
  category: z.string().trim().min(1, "कृपया वर्ग चुनें।"),
  currentAddress: z.string().trim().min(8, "वर्तमान पता पूरा लिखें।"),
  permanentAddress: z.string().trim().min(8, "स्थायी पता पूरा लिखें।"),
  state: z.string().trim().min(1, "कृपया राज्य चुनें।"),
  city: z.string().trim().min(1, "कृपया शहर चुनें।"),
  courseName: z.string().trim().min(2, "कोर्स का नाम लिखें।"),
  courseAdmissionDate: z.string().min(1, "प्रवेश तिथि चुनें।"),
  courseAdmissionYear: z.coerce
    .number()
    .int("सही वर्ष लिखें।")
    .min(2000, "वर्ष 2000 या उसके बाद का होना चाहिए।")
    .max(currentYear + 1, `वर्ष ${currentYear + 1} से अधिक नहीं हो सकता।`),
  courseDuration: z.string().trim().min(1, "कृपया कोर्स अवधि चुनें।"),
  studentPhoto: requiredUploadSchema,
  bloodGroup: z.string().trim().optional(),
  aadhaarNumber: z
    .string()
    .trim()
    .refine((value) => value === "" || /^\d{12}$/.test(value), "आधार नंबर 12 अंकों का होना चाहिए।"),
  acceptedTerms: z.literal(true, {
    errorMap: () => ({ message: "कृपया नियम एवं शर्तें स्वीकार करें।" }),
  }),
});

const personalFields: Array<{
  name:
    | "studentName"
    | "dateOfBirth"
    | "qualification"
    | "mobile"
    | "email"
    | "studentIdNumber"
    | "fatherName"
    | "fatherIdNumber"
    | "aadhaarNumber";
  label: string;
  placeholder: string;
  type?: "text" | "date" | "tel" | "email";
}> = [
  { name: "studentName", label: "विद्यार्थी का नाम", placeholder: "पूरा नाम लिखें" },
  { name: "dateOfBirth", label: "जन्म दिनांक", placeholder: "", type: "date" },
  { name: "qualification", label: "योग्यता", placeholder: "जैसे 12वीं / स्नातक" },
  { name: "mobile", label: "मोबाइल नंबर", placeholder: "10 अंकों का मोबाइल", type: "tel" },
  { name: "email", label: "ईमेल आईडी", placeholder: "name@example.com", type: "email" },
  { name: "studentIdNumber", label: "विद्यार्थी पहचान पत्र नंबर", placeholder: "UID / DL / Ration Card" },
  { name: "fatherName", label: "पिता का नाम", placeholder: "पिता का पूरा नाम" },
  { name: "fatherIdNumber", label: "पिता का पहचान पत्र नंबर", placeholder: "यदि उपलब्ध हो" },
  { name: "aadhaarNumber", label: "आधार नंबर", placeholder: "12 अंकों का आधार नंबर" },
];

const initialConfig: RegistrationConfig = {
  organizations: [],
  states: [],
  cities: [],
  categoryOptions: [],
  courseDurationOptions: [],
  bloodGroupOptions: [],
  genderOptions: [],
};

function normalizeOrganizationName(value: string) {
  return value
    .normalize("NFKC")
    .replace(/["'`]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*-\s*/g, "-")
    .trim()
    .toLowerCase();
}

export const Route = createFileRoute("/utthan-coaching-registration")({
  validateSearch: z.object({
    organization: z.string().optional(),
  }),
  head: () => ({
    meta: [
      { title: "उत्थान कोचिंग रजिस्ट्रेशन | SBGBT" },
      {
        name: "description",
        content: "उत्थान कोचिंग संस्थान में विद्यार्थी पंजीकरण के लिए dynamic frontend और backend वाला आवेदन फॉर्म।",
      },
    ],
  }),
  component: UtthanCoachingRegistrationPage,
});

function UtthanCoachingRegistrationPage() {
  const [sent, setSent] = useState(false);
  const [config, setConfig] = useState<RegistrationConfig>(initialConfig);
  const [configLoading, setConfigLoading] = useState(true);
  const [configError, setConfigError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const search = Route.useSearch();

  const defaultValues = useMemo<RegistrationFormValues>(
    () => ({
      organization: search.organization ?? "",
      studentName: "",
      gender: "",
      dateOfBirth: "",
      qualification: "",
      mobile: "",
      email: "",
      studentIdNumber: "",
      studentIdPhoto: undefined,
      fatherName: "",
      fatherIdNumber: "",
      fatherIdPhoto: undefined,
      category: "",
      currentAddress: "",
      permanentAddress: "",
      state: "",
      city: "",
      courseName: "",
      courseAdmissionDate: "",
      courseAdmissionYear: currentYear,
      courseDuration: "",
      studentPhoto: undefined,
      bloodGroup: "",
      aadhaarNumber: "",
      acceptedTerms: false,
    }),
    [search.organization],
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    async function loadConfig() {
      setConfigLoading(true);
      setConfigError("");

      try {
        const response = await fetch("/api/utthan-coaching-registrations/config");
        if (!response.ok) {
          throw new Error("Form configuration load नहीं हो पाई।");
        }

        const result = (await response.json()) as RegistrationConfig;
        setConfig(result);

        if (search.organization) {
          const requestedOrganization = normalizeOrganizationName(search.organization);
          const matchedOrganization = result.organizations.find((organization) =>
            [organization.id, organization.label, organization.value].some(
              (candidate) => normalizeOrganizationName(candidate) === requestedOrganization,
            ),
          );

          setValue("organization", matchedOrganization?.value || search.organization, { shouldValidate: true });
        } else if (result.organizations[0]) {
          setValue("organization", result.organizations[0].value);
        }

        if (result.genderOptions[0]) {
          setValue("gender", result.genderOptions[0]);
        }
        if (result.categoryOptions[0]) {
          setValue("category", result.categoryOptions[0]);
        }
        if (result.courseDurationOptions[0]) {
          setValue("courseDuration", result.courseDurationOptions[0]);
        }
        if (result.states[0]) {
          setValue("state", result.states[0].value);
        }
      } catch (error) {
        setConfigError(
          error instanceof Error ? error.message : "Form configuration load नहीं हो पाई।",
        );
      } finally {
        setConfigLoading(false);
      }
    }

    loadConfig();
  }, [search.organization, setValue]);

  const selectedOrganization = watch("organization");
  const selectedState = watch("state");
  const studentPhoto = watch("studentPhoto");

  const availableCities = useMemo(
    () => config.cities.filter((city) => city.state_name === selectedState),
    [config.cities, selectedState],
  );

  useEffect(() => {
    const selectedCity = watch("city");
    if (availableCities.length === 0) {
      setValue("city", "");
      return;
    }

    if (!availableCities.some((city) => city.value === selectedCity)) {
      setValue("city", availableCities[0].value);
    }
  }, [availableCities, setValue, watch]);

  const onSubmit = async (values: RegistrationFormValues) => {
    setSubmitError("");
    setSent(false);

    const formData = new FormData();
    const entries = Object.entries(values) as Array<[keyof RegistrationFormValues, RegistrationFormValues[keyof RegistrationFormValues]]>;
    for (const [key, value] of entries) {
      if (value instanceof FileList) {
        if (value.length > 0) {
          formData.append(key, value[0]);
        }
      } else if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false");
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    }

    const response = await fetch("/api/utthan-coaching-registrations", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const result = (await response.json().catch(() => null)) as { message?: string } | null;
      throw new Error(result?.message || "आवेदन सबमिट नहीं हो पाया।");
    }

    setSent(true);
    reset({
      ...defaultValues,
      organization: selectedOrganization || defaultValues.organization,
      gender: config.genderOptions[0] || "",
      category: config.categoryOptions[0] || "",
      courseDuration: config.courseDurationOptions[0] || "",
      state: selectedState || defaultValues.state,
      city: availableCities[0]?.value || "",
      courseAdmissionYear: currentYear,
      acceptedTerms: false,
    });
  };

  if (configLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <PageHero title="उत्थान कोचिंग रजिस्ट्रेशन" />
        <section className="border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center text-muted-foreground">
            Form loading...
          </div>
        </section>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="उत्थान कोचिंग रजिस्ट्रेशन" />

      <section className="border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-8 grid gap-4">
            
            <form
              onSubmit={handleSubmit(async (values) => {
                try {
                  await onSubmit(values);
                } catch (error) {
                  setSubmitError(
                    error instanceof Error ? error.message : "आवेदन सबमिट नहीं हो पाया।",
                  );
                }
              })}
              className="space-y-6 rounded-[2rem] border border-border bg-card/95 p-5 shadow-xl sm:p-8"
              noValidate
            >
              <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-primary">आवेदन फॉर्म</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    जिन फ़ील्ड्स पर <span className="text-red-500">*</span> है, उन्हें भरना अनिवार्य है।
                  </p>
                </div>

                <div className="rounded-2xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                  फ़ोटो अपलोड:{" "}
                  {studentPhoto instanceof FileList && studentPhoto.length > 0
                    ? studentPhoto[0].name
                    : "अभी चयन नहीं किया गया"}
                </div>
              </div>

              {configError && <ErrorText message={configError} />}

              <FormSection
                title="1. छात्र विवरण"
                icon={GraduationCap}
                description="बेसिक प्रोफ़ाइल और संपर्क जानकारी"
              >
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <SelectField
                    label="कोचिंग संस्थान"
                    error={errors.organization?.message}
                    required
                    {...register("organization")}
                  >
                    <option value="">संस्थान चुनें</option>
                    {config.organizations.map((organization) => (
                      <option key={organization.id} value={organization.value}>
                        {organization.label}
                      </option>
                    ))}
                  </SelectField>

                  {personalFields.slice(0, 6).map((field) => (
                    <InputField
                      key={field.name}
                      label={field.label}
                      type={field.type ?? "text"}
                      placeholder={field.placeholder}
                      required={field.name !== "aadhaarNumber" && field.name !== "fatherIdNumber"}
                      error={errors[field.name]?.message}
                      {...register(field.name)}
                    />
                  ))}

                  <div className="rounded-3xl border border-border bg-background/70 p-4">
                    <p className="mb-3 text-sm font-semibold text-foreground">
                      लिंग <span className="text-red-500">*</span>
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {config.genderOptions.map((option) => (
                        <label
                          key={option}
                          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition hover:border-primary"
                        >
                          <input type="radio" value={option} {...register("gender")} className="h-4 w-4 accent-primary" />
                          {option}
                        </label>
                      ))}
                    </div>
                    {errors.gender && <ErrorText message={errors.gender.message} />}
                  </div>

                  {personalFields.slice(6).map((field) => (
                    <InputField
                      key={field.name}
                      label={field.label}
                      type={field.type ?? "text"}
                      placeholder={field.placeholder}
                      required={field.name !== "aadhaarNumber" && field.name !== "fatherIdNumber"}
                      error={errors[field.name]?.message}
                      maxLength={field.name === "aadhaarNumber" ? 12 : undefined}
                      {...register(field.name)}
                    />
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <FileField label="विद्यार्थी पहचान पत्र फ़ोटो" error={errors.studentIdPhoto?.message as string | undefined} helper="वैकल्पिक, अधिकतम 5 MB" {...register("studentIdPhoto")} />
                  <FileField label="पिता के पहचान पत्र की फ़ोटो" error={errors.fatherIdPhoto?.message as string | undefined} helper="वैकल्पिक, अधिकतम 5 MB" {...register("fatherIdPhoto")} />
                  <FileField label="विद्यार्थी का फ़ोटो" required error={errors.studentPhoto?.message as string | undefined} helper="JPG, PNG या PDF, अधिकतम 5 MB" {...register("studentPhoto")} />
                </div>
              </FormSection>

              <FormSection
                title="2. पता और श्रेणी"
                icon={MapPin}
                description="संपूर्ण पता और आरक्षण श्रेणी"
              >
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <SelectField label="वर्ग (Category)" required error={errors.category?.message} {...register("category")}>
                    <option value="">चुनें</option>
                    {config.categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </SelectField>

                  <SelectField label="राज्य" required error={errors.state?.message} {...register("state")}>
                    <option value="">चुनें</option>
                    {config.states.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </SelectField>

                  <SelectField label="शहर" required error={errors.city?.message} {...register("city")}>
                    <option value="">चुनें</option>
                    {availableCities.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </SelectField>

                  <SelectField label="ब्लड ग्रुप" error={errors.bloodGroup?.message} {...register("bloodGroup")}>
                    <option value="">चुनें</option>
                    {config.bloodGroupOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </SelectField>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <TextAreaField label="वर्तमान पता" required placeholder="मकान नंबर, गांव/शहर, पोस्ट, तहसील, जिला" error={errors.currentAddress?.message} {...register("currentAddress")} />
                  <TextAreaField label="स्थायी पता" required placeholder="यदि अलग हो तो पूरा स्थायी पता लिखें" error={errors.permanentAddress?.message} {...register("permanentAddress")} />
                </div>
              </FormSection>

              <FormSection
                title="3. कोर्स विवरण"
                icon={FileText}
                description="कोर्स, प्रवेश वर्ष और अवधि"
              >
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <InputField label="कोर्स का नाम" required placeholder="जैसे कंप्यूटर कोर्स" error={errors.courseName?.message} {...register("courseName")} />
                  <InputField label="प्रवेश तिथि" type="date" required placeholder="" error={errors.courseAdmissionDate?.message} {...register("courseAdmissionDate")} />
                  <InputField label="प्रवेश वर्ष" type="number" required placeholder={`${currentYear}`} min={2000} max={currentYear + 1} error={errors.courseAdmissionYear?.message} {...register("courseAdmissionYear", { valueAsNumber: true })} />
                  <SelectField label="कोर्स अवधि" required error={errors.courseDuration?.message} {...register("courseDuration")}>
                    <option value="">चुनें</option>
                    {config.courseDurationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </SelectField>
                </div>
              </FormSection>

              <div className="rounded-[2rem] border border-green-200 bg-green-50 p-6">
                <h4 className="text-lg font-bold text-primary">नियम एवं शर्तें</h4>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
                  <li>विद्यार्थी द्वारा दी गई जानकारी सही और सत्य होना अनिवार्य है।</li>
                  <li>ज़रूरी दस्तावेज़ मांगने पर मूल प्रतियाँ प्रस्तुत करनी होंगी।</li>
                  <li>ग़लत जानकारी पाए जाने पर आवेदन निरस्त किया जा सकता है।</li>
                  <li>संस्थान के नियम, अनुशासन और समय-सारणी का पालन करना आवश्यक होगा।</li>
                </ul>

                <label className="mt-5 flex items-start gap-3 rounded-2xl border border-green-200 bg-white/80 p-4">
                  <input type="checkbox" {...register("acceptedTerms")} className="mt-1 h-5 w-5 accent-green-600" />
                  <span className="text-sm leading-6 text-slate-700">
                    मैं घोषणा करता/करती हूँ कि मेरे द्वारा दी गई जानकारी सत्य है और मैं संस्थान के नियमों का पालन करूँगा/करूँगी।
                  </span>
                </label>
                {errors.acceptedTerms && <ErrorText message={errors.acceptedTerms.message} />}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => {
                    reset({
                      ...defaultValues,
                      organization: selectedOrganization,
                      gender: config.genderOptions[0] || "",
                      category: config.categoryOptions[0] || "",
                      courseDuration: config.courseDurationOptions[0] || "",
                      state: selectedState,
                      city: availableCities[0]?.value || "",
                      courseAdmissionYear: currentYear,
                    });
                    setSent(false);
                    setSubmitError("");
                  }}
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary"
                >
                  फॉर्म रीसेट करें
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "सबमिट हो रहा है..." : "आवेदन सबमिट करें"}
                </button>
              </div>

              {submitError && <ErrorText message={submitError} />}

              {sent && isSubmitSuccessful && (
                <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-semibold">आपका आवेदन सफलतापूर्वक जमा हो गया है।</p>
                    <p className="mt-1 text-sm text-green-600">
                      हमारी टीम जल्द ही आपके दिए गए संपर्क विवरण पर आपसे संपर्क करेगी।
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function FormSection({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: typeof GraduationCap;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.75rem] border border-border bg-background/60 p-4 sm:p-5">
      <div className="mb-4 flex items-start gap-3">
        <div className="rounded-2xl bg-primary/10 p-3 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function InfoChip({
  icon: Icon,
  text,
}: {
  icon: typeof GraduationCap;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-primary/15 bg-white/70 px-4 py-3 text-sm text-slate-700">
      <Icon className="h-4 w-4 text-primary" />
      <span>{text}</span>
    </div>
  );
}

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  required?: boolean;
};

const inputBaseClassName =
  "mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";

function InputField({ label, error, required, className, ...props }: InputFieldProps) {
  return (
    <label className="block text-sm font-medium text-foreground">
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
      <input
        {...props}
        className={`${inputBaseClassName} ${error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""} ${className ?? ""}`}
      />
      {error && <ErrorText message={error} />}
    </label>
  );
}

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
};

function SelectField({ label, error, required, className, children, ...props }: SelectFieldProps) {
  return (
    <label className="block text-sm font-medium text-foreground">
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
      <select
        {...props}
        className={`${inputBaseClassName} ${error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""} ${className ?? ""}`}
      >
        {children}
      </select>
      {error && <ErrorText message={error} />}
    </label>
  );
}

type TextAreaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  required?: boolean;
};

function TextAreaField({ label, error, required, className, ...props }: TextAreaFieldProps) {
  return (
    <label className="block text-sm font-medium text-foreground">
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
      <textarea
        rows={4}
        {...props}
        className={`${inputBaseClassName} resize-none ${error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""} ${className ?? ""}`}
      />
      {error && <ErrorText message={error} />}
    </label>
  );
}

type FileFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helper?: string;
  required?: boolean;
};

function FileField({ label, error, helper, required, className, ...props }: FileFieldProps) {
  return (
    <label className="block text-sm font-medium text-foreground">
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        {...props}
        className={`mt-2 block w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white ${error ? "border-red-400" : ""} ${className ?? ""}`}
      />
      {helper && <p className="mt-2 text-xs text-muted-foreground">{helper}</p>}
      {error && <ErrorText message={error} />}
    </label>
  );
}

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-xs font-medium text-red-600">{message}</p>;
}
