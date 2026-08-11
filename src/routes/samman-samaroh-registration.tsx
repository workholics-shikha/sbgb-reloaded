import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import type React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, FileText, GraduationCap, MapPin, Send } from "lucide-react";

import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/samman-samaroh-registration")({
  head: () => ({
    meta: [
      { title: "प्रतिभाशाली विद्यार्थी आवेदन फॉर्म | SBGBT" },
      {
        name: "description",
        content:
          "प्रतिभाशाली विद्यार्थी सम्मान समारोह के लिए आवेदन करें। फॉर्म dynamic options, validation और secure submission के साथ उपलब्ध है।",
      },
    ],
  }),
  component: SammanSamarohRegistrationPage,
});

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const MAX_FILE_SIZE = 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

type SelectOption = {
  id: string;
  label: string;
  value: string;
  state_id?: string;
  state_name?: string;
  city_name?: string;
};

type RegistrationConfig = {
  states: SelectOption[];
  cities: SelectOption[];
  academicSessionOptions: SelectOption[];
  classCourseOptions: SelectOption[];
};

const emptyConfig: RegistrationConfig = {
  states: [],
  cities: [],
  academicSessionOptions: [],
  classCourseOptions: [],
};

const registrationSchema = z.object({
  studentName: z.string().trim().min(2, "नाम कम से कम 2 अक्षरों का होना चाहिए।"),
  fatherName: z.string().trim().min(2, "पिता का नाम कम से कम 2 अक्षरों का होना चाहिए।"),
  permanentAddress: z.string().trim().min(10, "पूरा पता लिखें।"),
  stateId: z.string().min(1, "राज्य चुनें।"),
  cityId: z.string().min(1, "शहर चुनें।"),
  tehsil: z.string().trim().min(2, "तहसील दर्ज करें।"),
  district: z.string().trim().min(2, "जिला दर्ज करें।"),
  aadhaarNumber: z.string().regex(/^\d{12}$/, "आधार नंबर 12 अंकों का होना चाहिए।"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "सही 10 अंकों का मोबाइल नंबर दर्ज करें।"),
  email: z.union([z.string().trim().email("सही ईमेल दर्ज करें।"), z.literal("")]),
  academicSession: z.string().min(1, "Academic Session चुनें।"),
  classCourseDegree: z.string().min(1, "Class / Course / Degree चुनें।"),
  marksPercentage: z.coerce.number().min(0, "Marks 0 से कम नहीं हो सकते।").max(100, "Marks 100 से ज्यादा नहीं हो सकते।"),
  rollNumber: z.string().trim().min(2, "Roll number दर्ज करें।"),
  boardUniversity: z.string().trim().min(2, "Board / University दर्ज करें।"),
  schoolName: z.string().trim().optional(),
  schoolAddress: z.string().trim().optional(),
  currentStudyDetails: z.string().trim().optional(),
  resultDocument: z
    .custom<FileList>((value) => value instanceof FileList, "Result document required")
    .refine((files) => files.length === 1, "Result document upload करें।")
    .refine((files) => files[0].size <= MAX_FILE_SIZE, "File size 1 MB से कम होनी चाहिए।")
    .refine((files) => ALLOWED_FILE_TYPES.includes(files[0].type), "केवल JPG, PNG या PDF file allowed है।"),
  acceptedDeclaration: z.literal(true, {
    errorMap: () => ({ message: "घोषणा स्वीकार करना आवश्यक है।" }),
  }),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const defaultValues: RegistrationFormValues = {
  studentName: "",
  fatherName: "",
  permanentAddress: "",
  stateId: "",
  cityId: "",
  tehsil: "",
  district: "",
  aadhaarNumber: "",
  mobile: "",
  email: "",
  academicSession: "",
  classCourseDegree: "",
  marksPercentage: 0,
  rollNumber: "",
  boardUniversity: "",
  schoolName: "",
  schoolAddress: "",
  currentStudyDetails: "",
  resultDocument: undefined as unknown as FileList,
  acceptedDeclaration: false,
};

function SammanSamarohRegistrationPage() {
  const [config, setConfig] = useState<RegistrationConfig>(emptyConfig);
  const [configLoading, setConfigLoading] = useState(true);
  const [configError, setConfigError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues,
  });

  const selectedStateId = watch("stateId");
  const selectedCityId = watch("cityId");
  const resultDocument = watch("resultDocument");

  const availableCities = useMemo(
    () => config.cities.filter((city) => city.state_id === selectedStateId),
    [config.cities, selectedStateId],
  );

  useEffect(() => {
    let isMounted = true;

    async function loadConfig() {
      setConfigLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/samman-samaroh-registrations/config`);
        if (!response.ok) {
          throw new Error("Form config load नहीं हो पाया।");
        }

        const result = (await response.json()) as RegistrationConfig;
        if (!isMounted) return;

        setConfig(result);
        setConfigError("");

        reset({
          ...defaultValues,
          academicSession: result.academicSessionOptions[0]?.value || "",
          classCourseDegree: result.classCourseOptions[0]?.value || "",
        });
      } catch (error) {
        if (!isMounted) return;
        setConfig(emptyConfig);
        setConfigError(error instanceof Error ? error.message : "Form config load नहीं हो पाया।");
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
  }, [reset]);

  useEffect(() => {
    if (!selectedStateId) {
      if (selectedCityId) {
        setValue("cityId", "");
      }
      return;
    }

    const isCityValid = availableCities.some((city) => city.value === selectedCityId);
    if (!isCityValid) {
      setValue("cityId", availableCities[0]?.value || "");
    }
  }, [availableCities, selectedCityId, selectedStateId, setValue]);

  async function onSubmit(values: RegistrationFormValues) {
    setSubmitError("");
    setSent(false);

    const payload = new FormData();
    payload.set("studentName", values.studentName.trim());
    payload.set("fatherName", values.fatherName.trim());
    payload.set("permanentAddress", values.permanentAddress.trim());
    payload.set("stateId", values.stateId);
    payload.set("cityId", values.cityId);
    payload.set("tehsil", values.tehsil.trim());
    payload.set("district", values.district.trim());
    payload.set("aadhaarNumber", values.aadhaarNumber.trim());
    payload.set("mobile", values.mobile.trim());
    payload.set("email", values.email.trim());
    payload.set("academicSession", values.academicSession);
    payload.set("classCourseDegree", values.classCourseDegree);
    payload.set("marksPercentage", String(values.marksPercentage));
    payload.set("rollNumber", values.rollNumber.trim());
    payload.set("boardUniversity", values.boardUniversity.trim());
    payload.set("schoolName", values.schoolName?.trim() || "");
    payload.set("schoolAddress", values.schoolAddress?.trim() || "");
    payload.set("currentStudyDetails", values.currentStudyDetails?.trim() || "");
    payload.set("acceptedDeclaration", "true");
    payload.set("resultDocument", values.resultDocument[0]);

    const response = await fetch(`${API_BASE_URL}/samman-samaroh-registrations`, {
      method: "POST",
      body: payload,
    });

    if (!response.ok) {
      const result = (await response.json().catch(() => null)) as { message?: string } | null;
      throw new Error(result?.message || "फॉर्म submit नहीं हो पाया।");
    }

    setSent(true);
    reset({
      ...defaultValues,
      academicSession: config.academicSessionOptions[0]?.value || "",
      classCourseDegree: config.classCourseOptions[0]?.value || "",
    });
  }

  if (configLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <PageHero title="प्रतिभाशाली विद्यार्थी आवेदन फॉर्म" />
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
      <PageHero title="प्रतिभाशाली विद्यार्थी आवेदन फॉर्म" />

      <section className="border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-8 grid gap-4 lg:grid-cols-[1.05fr_2fr]">
            <div className="rounded-[2rem] border border-primary/15 bg-primary/[0.06] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/70">Dynamic Setup</p>
              <h2 className="mt-3 text-2xl font-bold text-primary">Frontend + Backend powered form</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Form options backend से load हो रहे हैं, frontend पर validation है, और submit होने पर entry admin में Brilliant Students list में दिखेगी।
              </p>
              <div className="mt-6 space-y-3">
                <InfoChip icon={GraduationCap} text="Dynamic sessions, class/course, state and city" />
                <InfoChip icon={FileText} text="JPG, PNG या PDF upload करें" />
                <InfoChip icon={MapPin} text="Validated submission with admin-ready entries" />
              </div>
            </div>

            <form
              onSubmit={handleSubmit(async (values) => {
                try {
                  await onSubmit(values);
                } catch (error) {
                  setSubmitError(error instanceof Error ? error.message : "फॉर्म submit नहीं हो पाया।");
                }
              })}
              className="space-y-6 rounded-[2rem] border border-border bg-card/95 p-5 shadow-xl sm:p-8"
              noValidate
            >
              <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-primary">आवेदन फॉर्म</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    जिन fields पर <span className="text-red-500">*</span> है, उन्हें भरना आवश्यक है।
                  </p>
                </div>
                <div className="rounded-2xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                  दस्तावेज़:{" "}
                  {resultDocument instanceof FileList && resultDocument.length > 0
                    ? resultDocument[0].name
                    : "अभी चयन नहीं किया गया"}
                </div>
              </div>

              {configError && <ErrorText message={configError} />}

              <FormSection title="1. व्यक्तिगत विवरण" description="नाम, पता और संपर्क जानकारी" icon={GraduationCap}>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <InputField label="Name" required placeholder="Enter Name" error={errors.studentName?.message} {...register("studentName")} />
                  <InputField label="Father's Name" required placeholder="Enter Father's Name" error={errors.fatherName?.message} {...register("fatherName")} />
                  <InputField label="Aadhaar Number" required placeholder="12 digit Aadhaar number" maxLength={12} error={errors.aadhaarNumber?.message} {...register("aadhaarNumber")} />
                  <InputField label="Mobile Number" required placeholder="10 digit mobile number" maxLength={10} error={errors.mobile?.message} {...register("mobile")} />
                  <InputField label="Email ID" type="email" placeholder="Enter Email ID" error={errors.email?.message} {...register("email")} />
                  <InputField label="Tehsil" required placeholder="Enter Tehsil" error={errors.tehsil?.message} {...register("tehsil")} />
                  <InputField label="District" required placeholder="Enter District" error={errors.district?.message} {...register("district")} />
                  <SelectField label="State" required error={errors.stateId?.message} {...register("stateId")}>
                    <option value="">Select State</option>
                    {config.states.map((option) => (
                      <option key={option.id} value={option.value}>{option.label}</option>
                    ))}
                  </SelectField>
                  <SelectField label="City" required error={errors.cityId?.message} {...register("cityId")}>
                    <option value="">Select City</option>
                    {availableCities.map((option) => (
                      <option key={option.id} value={option.value}>{option.label}</option>
                    ))}
                  </SelectField>
                </div>

                <TextAreaField label="Permanent Address" required placeholder="Enter complete permanent address" error={errors.permanentAddress?.message} {...register("permanentAddress")} />
              </FormSection>

              <FormSection title="2. शैक्षणिक विवरण" description="Academic session, class/course और result details" icon={FileText}>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <SelectField label="Academic Session" required error={errors.academicSession?.message} {...register("academicSession")}>
                    <option value="">Select Academic Session</option>
                    {config.academicSessionOptions.map((option) => (
                      <option key={option.id} value={option.value}>{option.label}</option>
                    ))}
                  </SelectField>

                  <SelectField label="Class / Course / Degree" required error={errors.classCourseDegree?.message} {...register("classCourseDegree")}>
                    <option value="">Choose</option>
                    {config.classCourseOptions.map((option) => (
                      <option key={option.id} value={option.value}>{option.label}</option>
                    ))}
                  </SelectField>

                  <InputField label="Marks Percentage %" type="number" step="0.01" min={0} max={100} required placeholder="Enter Marks Percentage" error={errors.marksPercentage?.message} {...register("marksPercentage", { valueAsNumber: true })} />
                  <InputField label="Roll Number" required placeholder="Enter Roll Number" error={errors.rollNumber?.message} {...register("rollNumber")} />
                  <InputField label="Board / University" required placeholder="Enter Board / University" error={errors.boardUniversity?.message} {...register("boardUniversity")} />
                  <InputField label="Name of School / Institution" placeholder="Enter School / Institution" error={errors.schoolName?.message} {...register("schoolName")} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <TextAreaField label="School / Institution Address" placeholder="Enter School / Institution Address" error={errors.schoolAddress?.message} {...register("schoolAddress")} />
                  <TextAreaField label="Current Study Details" placeholder="Enter Current Study Details" error={errors.currentStudyDetails?.message} {...register("currentStudyDetails")} />
                </div>

                <FileField
                  label="Upload Original Marksheet / Result Document"
                  required
                  helper="JPG, PNG या PDF, maximum 1 MB"
                  error={errors.resultDocument?.message as string | undefined}
                  {...register("resultDocument")}
                />
              </FormSection>

              <div className="rounded-[2rem] border border-green-200 bg-green-50 p-6">
                <h4 className="text-lg font-bold text-primary">स्व-प्रमाणित घोषणा-पत्र</h4>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  मैं यह घोषणा करता/करती हूं कि आवेदन पत्र में दिए गए विवरण मेरी जानकारी और विश्वास के अनुसार सही हैं। गलत जानकारी पाए जाने पर आवेदन निरस्त किया जा सकता है।
                </p>

                <label className="mt-5 flex items-start gap-3 rounded-2xl border border-green-200 bg-white/80 p-4">
                  <input type="checkbox" {...register("acceptedDeclaration")} className="mt-1 h-5 w-5 accent-green-600" />
                  <span className="text-sm leading-6 text-slate-700">
                    मैं उपरोक्त घोषणा को स्वीकार करता/करती हूं।
                  </span>
                </label>
                {errors.acceptedDeclaration && <ErrorText message={errors.acceptedDeclaration.message} />}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => {
                    reset({
                      ...defaultValues,
                      academicSession: config.academicSessionOptions[0]?.value || "",
                      classCourseDegree: config.classCourseOptions[0]?.value || "",
                    });
                    setSent(false);
                    setSubmitError("");
                  }}
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary"
                >
                  Form Reset करें
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Submit हो रहा है..." : "Submit Request"}
                </button>
              </div>

              {submitError && <ErrorText message={submitError} />}

              {sent && isSubmitSuccessful && (
                <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-semibold">आपका आवेदन सफलतापूर्वक जमा हो गया है।</p>
                    <p className="mt-1 text-sm text-green-600">
                      हमारी टीम जल्द ही आपके आवेदन की समीक्षा करेगी।
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

const InputField = ({ label, error, required, className = "", ...props }: InputFieldProps) => (
  <label className="block">
    <span className="mb-2 block text-sm font-medium text-foreground">
      {label} {required ? <span className="text-red-500">*</span> : null}
    </span>
    <input
      {...props}
      className={`w-full rounded-3xl border border-border bg-white px-5 py-3 outline-none transition focus:border-primary ${className}`}
    />
    {error ? <p className="mt-2 text-xs font-medium text-red-500">{error}</p> : null}
  </label>
);

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
};

const SelectField = ({ label, error, required, children, className = "", ...props }: SelectFieldProps) => (
  <label className="block">
    <span className="mb-2 block text-sm font-medium text-foreground">
      {label} {required ? <span className="text-red-500">*</span> : null}
    </span>
    <select
      {...props}
      className={`w-full rounded-3xl border border-border bg-white px-5 py-3 outline-none transition focus:border-primary ${className}`}
    >
      {children}
    </select>
    {error ? <p className="mt-2 text-xs font-medium text-red-500">{error}</p> : null}
  </label>
);

type TextAreaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  required?: boolean;
};

const TextAreaField = ({ label, error, required, className = "", ...props }: TextAreaFieldProps) => (
  <label className="block">
    <span className="mb-2 block text-sm font-medium text-foreground">
      {label} {required ? <span className="text-red-500">*</span> : null}
    </span>
    <textarea
      {...props}
      rows={4}
      className={`w-full rounded-[1.5rem] border border-border bg-white px-5 py-3 outline-none transition focus:border-primary ${className}`}
    />
    {error ? <p className="mt-2 text-xs font-medium text-red-500">{error}</p> : null}
  </label>
);

type FileFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helper?: string;
  required?: boolean;
};

const FileField = ({ label, error, helper, required, className = "", ...props }: FileFieldProps) => (
  <label className="block">
    <span className="mb-2 block text-sm font-medium text-foreground">
      {label} {required ? <span className="text-red-500">*</span> : null}
    </span>
    <input
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      {...props}
      className={`w-full rounded-3xl border border-border bg-white px-4 py-3 file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white ${className}`}
    />
    {helper ? <p className="mt-2 text-xs text-muted-foreground">{helper}</p> : null}
    {error ? <p className="mt-2 text-xs font-medium text-red-500">{error}</p> : null}
  </label>
);

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{message}</div>;
}
