import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, CreditCard, FileText, Landmark, ReceiptIndianRupee } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import qrCode from "@/assets/qr-code.png";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter } from "@/components/site/SiteFooter";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const maxUploadSize = 5 * 1024 * 1024;
const imageTypes = ["image/jpeg", "image/png"] as const;
const receiptTypes = ["image/jpeg", "image/png", "application/pdf"] as const;

type SelectOption = {
  id: string;
  label: string;
  value: string;
};

type CircleOption = SelectOption & {
  circle_code: number | null;
  exam_centre: string;
};

type RegistrationConfig = {
  regYearOptions: SelectOption[];
  circles: CircleOption[];
  contestTypeOptions: SelectOption[];
  classOptions: SelectOption[];
  categoryOptions: SelectOption[];
  paymentAmountOptions: SelectOption[];
  paymentStatusOptions: SelectOption[];
};

type SbgbpFormValues = {
  regYear: string;
  circle: string;
  contestType: string;
  className: string;
  userCategory: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  schoolName: string;
  address: string;
  mobile: string;
  mobileGuardian: string;
  email: string;
  uid: string;
  rollNo: string;
  examTime: string;
  examDate: string;
  examCentre: string;
  paymentAmount: string;
  paymentStatus: string;
  transactionId: string;
  studentImage: FileList | undefined;
  payReceipt: FileList | undefined;
  termAndCondition: boolean;
};

const optionalFileSchema = (allowedTypes: readonly string[]) =>
  z
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
        allowedTypes.includes(value[0].type as (typeof allowedTypes)[number]),
      "फ़ाइल फॉर्मेट मान्य नहीं है।",
    );

const requiredFileSchema = (allowedTypes: readonly string[]) =>
  optionalFileSchema(allowedTypes).refine(
    (value) => value instanceof FileList && value.length > 0,
    "कृपया फ़ाइल अपलोड करें।",
  );

const formSchema = z.object({
  regYear: z.string().min(1, "Registration year चुनें।"),
  circle: z.string().min(1, "Circle चुनें।"),
  contestType: z.string().min(1, "Contest type चुनें।"),
  className: z.string().min(1, "Class चुनें।"),
  userCategory: z.string().min(1, "Category चुनें।"),
  studentName: z.string().trim().min(2, "विद्यार्थी का नाम लिखें।"),
  fatherName: z.string().trim().min(2, "पिता का नाम लिखें।"),
  motherName: z.string().trim().min(2, "माता का नाम लिखें।"),
  schoolName: z.string().trim().min(2, "School name लिखें।"),
  address: z.string().trim().min(8, "पूरा पता लिखें।"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "10 अंकों का सही मोबाइल नंबर लिखें।"),
  mobileGuardian: z.string().regex(/^[6-9]\d{9}$/, "Guardian mobile number सही लिखें।"),
  email: z.union([z.string().trim().email("सही ईमेल लिखें।"), z.literal("")]),
  uid: z.string().trim().optional(),
  rollNo: z.string().trim().optional(),
  examTime: z.string().trim().optional(),
  examDate: z.string().trim().optional(),
  examCentre: z.string().trim().optional(),
  paymentAmount: z.string().min(1, "Payment amount चुनें।"),
  paymentStatus: z.string().min(1, "Payment status चुनें।"),
  transactionId: z.string().trim().optional(),
  studentImage: requiredFileSchema(imageTypes),
  payReceipt: requiredFileSchema(receiptTypes),
  termAndCondition: z.literal(true, {
    errorMap: () => ({ message: "कृपया नियम एवं शर्तें स्वीकार करें।" }),
  }),
});

const initialConfig: RegistrationConfig = {
  regYearOptions: [],
  circles: [],
  contestTypeOptions: [],
  classOptions: [],
  categoryOptions: [],
  paymentAmountOptions: [],
  paymentStatusOptions: [],
};

export const Route = createFileRoute("/aavedan-form")({
  head: () => ({
    meta: [
      { title: "SBGBP Registration Form | SBGBT" },
      {
        name: "description",
        content:
          "शिक्षा पाओ ज्ञान बढ़ाओ प्रतियोगिता (SBGBP) के लिए dynamic frontend और backend powered registration form।",
      },
    ],
  }),
  component: AavedanFormPage,
});

function AavedanFormPage() {
  const [config, setConfig] = useState<RegistrationConfig>(initialConfig);
  const [configLoading, setConfigLoading] = useState(true);
  const [configError, setConfigError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [sent, setSent] = useState(false);

  const defaultValues = useMemo<SbgbpFormValues>(
    () => ({
      regYear: "",
      circle: "",
      contestType: "",
      className: "",
      userCategory: "",
      studentName: "",
      fatherName: "",
      motherName: "",
      schoolName: "",
      address: "",
      mobile: "",
      mobileGuardian: "",
      email: "",
      uid: "",
      rollNo: "",
      examTime: "",
      examDate: "",
      examCentre: "",
      paymentAmount: "",
      paymentStatus: "",
      transactionId: "",
      studentImage: undefined,
      payReceipt: undefined,
      termAndCondition: false,
    }),
    [],
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SbgbpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onBlur",
  });

  const selectedCircle = watch("circle");
  const selectedStudentImage = watch("studentImage");
  const selectedReceipt = watch("payReceipt");

  const selectedCircleMeta = useMemo(
    () => config.circles.find((circle) => circle.value === selectedCircle) ?? null,
    [config.circles, selectedCircle],
  );

  useEffect(() => {
    async function loadConfig() {
      setConfigLoading(true);
      setConfigError("");

      try {
        const response = await fetch(`${API_BASE_URL}/sbgbp-registrations/config`);
        if (!response.ok) {
          throw new Error("Form configuration load नहीं हो पाई।");
        }

        const result = (await response.json()) as RegistrationConfig;
        setConfig(result);
        reset({
          ...defaultValues,
          regYear: result.regYearOptions[0]?.value || "",
          circle: result.circles[0]?.value || "",
          contestType: result.contestTypeOptions[0]?.value || "",
          className: result.classOptions[0]?.value || "",
          userCategory: result.categoryOptions[0]?.value || "",
          paymentAmount: result.paymentAmountOptions[0]?.value || "",
          paymentStatus: result.paymentStatusOptions[0]?.value || "pending",
          examCentre: result.circles[0]?.exam_centre || "",
        });
      } catch (error) {
        setConfig(initialConfig);
        setConfigError(
          error instanceof Error ? error.message : "Form configuration load नहीं हो पाई।",
        );
      } finally {
        setConfigLoading(false);
      }
    }

    loadConfig();
  }, [defaultValues, reset]);

  useEffect(() => {
    if (selectedCircleMeta) {
      setValue("examCentre", selectedCircleMeta.exam_centre || "");
    }
  }, [selectedCircleMeta, setValue]);

  async function onSubmit(values: SbgbpFormValues) {
    setSubmitError("");
    setSent(false);

    const payload = new FormData();
    payload.set("regYear", values.regYear);
    payload.set("circle", values.circle);
    payload.set("circleCode", String(selectedCircleMeta?.circle_code ?? ""));
    payload.set("contestType", values.contestType);
    payload.set("className", values.className);
    payload.set("userCategory", values.userCategory);
    payload.set("studentName", values.studentName.trim());
    payload.set("fatherName", values.fatherName.trim());
    payload.set("motherName", values.motherName.trim());
    payload.set("schoolName", values.schoolName.trim());
    payload.set("address", values.address.trim());
    payload.set("mobile", values.mobile.trim());
    payload.set("mobileGuardian", values.mobileGuardian.trim());
    payload.set("email", values.email.trim());
    payload.set("uid", values.uid.trim());
    payload.set("rollNo", values.rollNo.trim());
    payload.set("examTime", values.examTime.trim());
    payload.set("examDate", values.examDate);
    payload.set("examCentre", values.examCentre.trim());
    payload.set("paymentAmount", values.paymentAmount);
    payload.set("paymentStatus", values.paymentStatus);
    payload.set("transactionId", values.transactionId.trim());
    payload.set("termAndCondition", "true");
    payload.set("studentImage", values.studentImage![0]);
    payload.set("payReceipt", values.payReceipt![0]);

    const response = await fetch(`${API_BASE_URL}/sbgbp-registrations`, {
      method: "POST",
      body: payload,
    });

    if (!response.ok) {
      const result = (await response.json().catch(() => null)) as { message?: string } | null;
      throw new Error(result?.message || "Registration submit नहीं हो पाया।");
    }

    setSent(true);
    reset({
      ...defaultValues,
      regYear: config.regYearOptions[0]?.value || "",
      circle: config.circles[0]?.value || "",
      contestType: config.contestTypeOptions[0]?.value || "",
      className: config.classOptions[0]?.value || "",
      userCategory: config.categoryOptions[0]?.value || "",
      paymentAmount: config.paymentAmountOptions[0]?.value || "",
      paymentStatus: config.paymentStatusOptions[0]?.value || "pending",
      examCentre: config.circles[0]?.exam_centre || "",
    });
  }

  if (configLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <PageHero title="SBGBP आवेदन फॉर्म" />
        <section className="border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center text-muted-foreground">
            फॉर्म लोड हो रहा है...
          </div>
        </section>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="शिक्षा पाओ ज्ञान बढ़ाओ प्रतियोगिता (SBGBP) Registration" />

      <section className="pt-6 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-[36px] bg-gradient-to-r from-sky-50 via-cyan-50 to-sky-100 shadow-md">
            <div className="grid items-center gap-8 p-8 lg:grid-cols-[140px_1fr_300px]">
              <div className="flex justify-center">
                <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-md">
                  <ReceiptIndianRupee className="h-20 w-20 text-primary" />
                </div>
              </div>

              <div>
                <p className="text-xl font-semibold leading-relaxed text-foreground">
                  QR code scan karke registration fee जमा करें और receipt upload करें।
                </p>
                <div className="mt-6 space-y-3">
                  <p className="text-2xl font-bold text-primary">Bank Name - ICICI Bank</p>
                  <p className="text-2xl font-bold text-primary">Bank Account - 720801001079</p>
                  <p className="text-2xl font-bold text-primary">IFSC Code - ICIC0007208</p>
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
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-8 grid gap-4">
             

            <form
              onSubmit={handleSubmit(async (values) => {
                try {
                  await onSubmit(values);
                } catch (error) {
                  setSubmitError(
                    error instanceof Error ? error.message : "Registration submit नहीं हो पाया।",
                  );
                }
              })}
              className="space-y-6 rounded-[2rem] border border-border bg-card/95 p-5 shadow-xl sm:p-8"
              noValidate
            >
              <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-primary">SBGBP आवेदन फॉर्म</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    जिन fields पर <span className="text-red-500">*</span> है, उन्हें भरना आवश्यक है।
                  </p>
                </div>
                <div className="rounded-2xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                  रसीद:{" "}
                  {selectedReceipt instanceof FileList && selectedReceipt.length > 0
                    ? selectedReceipt[0].name
                    : "अभी चयन नहीं किया गया"}
                </div>
              </div>

              {configError && <ErrorText message={configError} />}

              <FormSection title="1. पंजीकरण विवरण" description="वर्ष, सर्किल और प्रतियोगिता की जानकारी" icon={Landmark}>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <SelectField label="पंजीकरण वर्ष" required error={errors.regYear?.message} {...register("regYear")}>
                    <option value="">वर्ष चुनें</option>
                    {config.regYearOptions.map((option) => (
                      <option key={option.id} value={option.value}>{option.label}</option>
                    ))}
                  </SelectField>
                  <SelectField label="सर्किल" required error={errors.circle?.message} {...register("circle")}>
                    <option value="">सर्किल चुनें</option>
                    {config.circles.map((option) => (
                      <option key={option.id} value={option.value}>{option.label}</option>
                    ))}
                  </SelectField>
                  <SelectField label="प्रतियोगिता प्रकार" required error={errors.contestType?.message} {...register("contestType")}>
                    <option value="">प्रतियोगिता प्रकार चुनें</option>
                    {config.contestTypeOptions.map((option) => (
                      <option key={option.id} value={option.value}>{option.label}</option>
                    ))}
                  </SelectField>
                  <SelectField label="कक्षा" required error={errors.className?.message} {...register("className")}>
                    <option value="">कक्षा चुनें</option>
                    {config.classOptions.map((option) => (
                      <option key={option.id} value={option.value}>{option.label}</option>
                    ))}
                  </SelectField>
                  <SelectField label="श्रेणी" required error={errors.userCategory?.message} {...register("userCategory")}>
                    <option value="">श्रेणी चुनें</option>
                    {config.categoryOptions.map((option) => (
                      <option key={option.id} value={option.value}>{option.label}</option>
                    ))}
                  </SelectField>
                  <InputField label="परीक्षा केंद्र" placeholder="उपलब्ध होने पर स्वतः भर जाएगा" error={errors.examCentre?.message} {...register("examCentre")} />
                </div>
              </FormSection>

              <FormSection title="2. विद्यार्थी विवरण" description="विद्यार्थी और अभिभावक की मुख्य जानकारी" icon={FileText}>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <InputField label="विद्यार्थी का नाम" required placeholder="पूरा नाम लिखें" error={errors.studentName?.message} {...register("studentName")} />
                  <InputField label="पिता का नाम" required placeholder="पिता का नाम" error={errors.fatherName?.message} {...register("fatherName")} />
                  <InputField label="माता का नाम" required placeholder="माता का नाम" error={errors.motherName?.message} {...register("motherName")} />
                  <InputField label="विद्यालय का नाम" required placeholder="विद्यालय / संस्थान का नाम" error={errors.schoolName?.message} {...register("schoolName")} />
                  <InputField label="मोबाइल नंबर" required placeholder="10 अंकों का मोबाइल" maxLength={10} error={errors.mobile?.message} {...register("mobile")} />
                  <InputField label="अभिभावक का मोबाइल" required placeholder="अभिभावक का मोबाइल" maxLength={10} error={errors.mobileGuardian?.message} {...register("mobileGuardian")} />
                  <InputField label="ईमेल आईडी" type="email" placeholder="name@example.com" error={errors.email?.message} {...register("email")} />
                  <InputField label="यूआईडी / आधार (वैकल्पिक)" placeholder="यूआईडी / आधार" error={errors.uid?.message} {...register("uid")} />
                  <InputField label="रोल नंबर (वैकल्पिक)" placeholder="रोल नंबर" error={errors.rollNo?.message} {...register("rollNo")} />
                </div>
                <TextAreaField label="स्थायी पता" required placeholder="पूरा पता लिखें" error={errors.address?.message} {...register("address")} />
                <FileField
                  label="विद्यार्थी का फोटो"
                  required
                  accept=".jpg,.jpeg,.png"
                  helper="JPG या PNG, अधिकतम 5 MB"
                  error={errors.studentImage?.message as string | undefined}
                  {...register("studentImage")}
                />
              </FormSection>

              <FormSection title="3. भुगतान विवरण" description="शुल्क, ट्रांजैक्शन और रसीद अपलोड" icon={CreditCard}>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <SelectField label="भुगतान राशि" required error={errors.paymentAmount?.message} {...register("paymentAmount")}>
                    <option value="">राशि चुनें</option>
                    {config.paymentAmountOptions.map((option) => (
                      <option key={option.id} value={option.value}>{option.label}</option>
                    ))}
                  </SelectField>
                  <SelectField label="भुगतान स्थिति" required error={errors.paymentStatus?.message} {...register("paymentStatus")}>
                    <option value="">स्थिति चुनें</option>
                    {config.paymentStatusOptions.map((option) => (
                      <option key={option.id} value={option.value}>{option.label}</option>
                    ))}
                  </SelectField>
                  <InputField label="ट्रांजैक्शन आईडी" placeholder="ट्रांजैक्शन / रेफरेंस नंबर" error={errors.transactionId?.message} {...register("transactionId")} />
                  <InputField label="परीक्षा तिथि (वैकल्पिक)" type="date" error={errors.examDate?.message} {...register("examDate")} />
                  <InputField label="परीक्षा समय (वैकल्पिक)" placeholder="जैसे 10:00 AM - 12:00 PM" error={errors.examTime?.message} {...register("examTime")} />
                </div>
                <FileField
                  label="भुगतान रसीद"
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  helper="JPG, PNG या PDF, अधिकतम 5 MB"
                  error={errors.payReceipt?.message as string | undefined}
                  {...register("payReceipt")}
                />
                <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-800">
                  भुगतान का प्रमाण upload करना अनिवार्य है। Registration number submit के बाद system generate करेगा।
                </div>
              </FormSection>

              <div className="rounded-[2rem] border border-green-200 bg-green-50 p-6">
                <h4 className="text-lg font-bold text-primary">घोषणा</h4>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  मैं घोषणा करता/करती हूँ कि आवेदन में दी गई जानकारी मेरे ज्ञान और विश्वास के अनुसार सही है।
                </p>
                <label className="mt-5 flex items-start gap-3 rounded-2xl border border-green-200 bg-white/80 p-4">
                  <input type="checkbox" {...register("termAndCondition")} className="mt-1 h-5 w-5 accent-green-600" />
                  <span className="text-sm leading-6 text-slate-700">
                    मैं नियम एवं शर्तें स्वीकार करता/करती हूँ।
                  </span>
                </label>
                {errors.termAndCondition && <ErrorText message={errors.termAndCondition.message} />}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => {
                    reset({
                      ...defaultValues,
                      regYear: config.regYearOptions[0]?.value || "",
                      circle: config.circles[0]?.value || "",
                      contestType: config.contestTypeOptions[0]?.value || "",
                      className: config.classOptions[0]?.value || "",
                      userCategory: config.categoryOptions[0]?.value || "",
                      paymentAmount: config.paymentAmountOptions[0]?.value || "",
                      paymentStatus: config.paymentStatusOptions[0]?.value || "pending",
                      examCentre: config.circles[0]?.exam_centre || "",
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
                    <p className="font-semibold">आपका SBGBP registration सफलतापूर्वक जमा हो गया है।</p>
                    <p className="mt-1 text-sm text-green-600">
                      Admin panel में आपकी entry registered SPGBP list में दिखाई देगी।
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
  icon: typeof Landmark;
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
  icon: typeof Landmark;
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
