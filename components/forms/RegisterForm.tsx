"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { UserFormValidation, type UserFormValues } from "@/lib/validation";
import SubmitButton from "@/components/SubmitButton";
import CustomFormField from "../ui/CustomFormField";
import { Controller, useForm } from "react-hook-form";
import { RegisterFormValidation } from "@/lib/validation";
import { RegisterFormValues } from "@/lib/validation";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import PhoneInput from "react-phone-number-input";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

type RegisterFormProps = React.ComponentProps<"form"> & {
  user: User;
};

export function RegisterForm({ user, className, ...props }: RegisterFormProps) {
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormValidation),

    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      birthDate: new Date(),
      gender: "male",
      address: "",
      occupation: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
      primaryPhysician: "",
      insuranceProvider: "",
      insurancePolicyNumber: "",
      allergies: "",
      currentMedication: "",
      familyMedicalHistory: "",
      pastMedicalHistory: "",
      identificationType: "",
      identificationNumber: "",
      identificationDocument: undefined,
      privacyConsent: false,
    },

    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  return (
    <form
      className={className}
      onSubmit={form.handleSubmit(() => {})}
      noValidate
      {...props}
    >
      <section className="mb-12 space-y-6">
        <h1 className="header">Welcome 👋</h1>
        <p className="text-dark-700">Let us know more about yourself.</p>
      </section>

      <section className="mb-12 space-y-6">
        <h2 className="sub-header">Personal Information</h2>
        <CustomFormField
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="User"
        />
      </section>

      <section className="mb-12 space-y-6">
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="john@example.com"
            type="email"
            iconSrc="/assets/icons/email.svg"
            iconAlt="Email"
          />

          <Controller
            control={form.control}
            name="phone"
            rules={{ required: "Please enter your phone number." }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phone">Phone number</FieldLabel>

                <PhoneInput
                  id="phone"
                  defaultCountry="IT"
                  international
                  placeholder="Enter your phone number"
                  className="input-phone"
                  value={field.value || undefined}
                  onChange={(value) => field.onChange(value ?? "")}
                  onBlur={field.onBlur}
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-6 xl:flex-row">
          <Controller
            control={form.control}
            name="birthDate"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="birthDate">Birth Date</FieldLabel>

                <div className="flex h-11 items-center rounded-md border border-dark-500 bg-dark-400 focus-within:border-dark-600">
                  <label
                    htmlFor="birthDate"
                    className="flex h-full cursor-pointer items-center pl-3"
                  >
                    <Image
                      src="/assets/icons/calendar.svg"
                      width={24}
                      height={24}
                      alt="Calendar"
                      className="size-5"
                    />
                  </label>

                  <input
                    id="birthDate"
                    type="date"
                    value={
                      field.value &&
                      !Number.isNaN(new Date(field.value).getTime())
                        ? new Date(
                            field.value.getTime() -
                              field.value.getTimezoneOffset() * 60000,
                          )
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={(event) =>
                      field.onChange(new Date(event.target.value))
                    }
                    onBlur={field.onBlur}
                    aria-invalid={fieldState.invalid}
                    className="h-full w-full border-0 appearance-none border-0 bg-transparent px-3 text-sm font-medium text-white outline-none [-webkit-appearance:none] [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:hidden"
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="gender"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Gender</FieldLabel>

                <div className="flex h-11 w-full items-center gap-5">
                  <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-white">
                    <input
                      type="radio"
                      name={field.name}
                      value="male"
                      checked={field.value === "male"}
                      onChange={() => field.onChange("male")}
                      className="sr-only"
                    />
                    <span
                      className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${
                        field.value === "male"
                          ? "border-green-500"
                          : "border-dark-600"
                      }`}
                    >
                      <span
                        className={`block size-2 rounded-full ${
                          field.value === "male"
                            ? "bg-green-500"
                            : "bg-transparent"
                        }`}
                      />
                    </span>
                    Male
                  </label>

                  <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-white">
                    <input
                      type="radio"
                      name={field.name}
                      value="female"
                      checked={field.value === "female"}
                      onChange={() => field.onChange("female")}
                      className="sr-only"
                    />
                    <span
                      className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${
                        field.value === "female"
                          ? "border-green-500"
                          : "border-dark-600"
                      }`}
                    >
                      <span
                        className={`block size-2 rounded-full ${
                          field.value === "female"
                            ? "bg-green-500"
                            : "bg-transparent"
                        }`}
                      />
                    </span>
                    Female
                  </label>

                  <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-white">
                    <input
                      type="radio"
                      name={field.name}
                      value="other"
                      checked={field.value === "other"}
                      onChange={() => field.onChange("other")}
                      className="sr-only"
                    />
                    <span
                      className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${
                        field.value === "other"
                          ? "border-green-500"
                          : "border-dark-600"
                      }`}
                    >
                      <span
                        className={`block size-2 rounded-full ${
                          field.value === "other"
                            ? "bg-green-500"
                            : "bg-transparent"
                        }`}
                      />
                    </span>
                    Other
                  </label>
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            name="address"
            label="Address"
            placeholder="14th Street, New York, NY"
          />

          <CustomFormField
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
          />
        </div>
      </section>

      <section className="mt-16 mb-12 space-y-6">
        <h2 className="sub-header">Medical Information</h2>

        <div className="space-y-6">
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              name="primaryPhysician"
              label="Primary Physician"
              placeholder="Dr. Cameron Williamson"
            />

            <CustomFormField
              control={form.control}
              name="insuranceProvider"
              label="Insurance Provider"
              placeholder="BlueCross BlueShield"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance Policy Number"
              placeholder="Enter your policy number"
            />

            <CustomFormField
              control={form.control}
              name="emergencyContactName"
              label="Emergency Contact Name"
              placeholder="Jane Doe"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency Contact Number"
              placeholder="+1 234 567 890"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <Controller
              control={form.control}
              name="allergies"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="allergies">Allergies</FieldLabel>

                  <Textarea
                    {...field}
                    id="allergies"
                    placeholder="Peanuts, shellfish, penicillin"
                    aria-invalid={fieldState.invalid}
                    value={field.value ?? ""}
                    className="shad-textArea min-h-24 resize-none border-dark-500 bg-dark-400 px-3 py-3 text-white focus-visible:border-dark-600 focus-visible:ring-0"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="currentMedication"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="currentMedication">
                    Current medication
                  </FieldLabel>

                  <Textarea
                    {...field}
                    id="currentMedication"
                    placeholder="Ibuprofen 200mg, Vitamin D"
                    aria-invalid={fieldState.invalid}
                    value={field.value ?? ""}
                    className="shad-textArea min-h-24 resize-none border-dark-500 bg-dark-400 px-3 py-3 text-white focus-visible:border-dark-600 focus-visible:ring-0"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <Controller
              control={form.control}
              name="familyMedicalHistory"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="familyMedicalHistory">
                    Family medical history
                  </FieldLabel>

                  <Textarea
                    {...field}
                    id="familyMedicalHistory"
                    placeholder="Diabetes, hypertension, heart disease"
                    aria-invalid={fieldState.invalid}
                    value={field.value ?? ""}
                    className="shad-textArea min-h-24 resize-none border-dark-500 bg-dark-400 px-3 py-3 text-white focus-visible:border-dark-600 focus-visible:ring-0"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="pastMedicalHistory"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="pastMedicalHistory">
                    Past medical history
                  </FieldLabel>

                  <Textarea
                    {...field}
                    id="pastMedicalHistory"
                    placeholder="Surgeries, hospitalizations, chronic conditions"
                    aria-invalid={fieldState.invalid}
                    value={field.value ?? ""}
                    className="shad-textArea min-h-24 resize-none border-dark-500 bg-dark-400 px-3 py-3 text-white focus-visible:border-dark-600 focus-visible:ring-0"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </div>
      </section>

      <section className="mt-16 mb-12 space-y-6">
        <h2 className="sub-header">Identification and Verification</h2>

        <div className="space-y-6">
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              name="identificationType"
              label="Identification Type"
              placeholder="Passport, ID card, driver's license"
            />

            <CustomFormField
              control={form.control}
              name="identificationNumber"
              label="Identification Number"
              placeholder="Enter your document number"
            />
          </div>

          <Controller
            control={form.control}
            name="identificationDocument"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="identificationDocument">
                  Identification Document
                </FieldLabel>

                <label
                  htmlFor="identificationDocument"
                  className="file-upload rounded-2xl border-dark-500 bg-dark-400 text-white"
                >
                  <Image
                    src="/assets/icons/upload.svg"
                    width={24}
                    height={24}
                    alt="Upload"
                    className="size-6"
                  />

                  <div className="file-upload_label">
                    <p className="text-white">
                      {field.value?.name ?? "Upload a scanned copy of your ID"}
                    </p>
                    <p className="text-dark-600">
                      PDF, JPG or PNG up to 10MB
                    </p>
                  </div>
                </label>

                <input
                  id="identificationDocument"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="sr-only"
                  onChange={(event) =>
                    field.onChange(event.target.files?.[0] ?? undefined)
                  }
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </section>

      <section className="mt-16 mb-8 space-y-6">
        <h2 className="sub-header">Privacy Consent</h2>

        <Controller
          control={form.control}
          name="privacyConsent"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="privacyConsent">
                Consent & Authorization
              </FieldLabel>

              <label
                htmlFor="privacyConsent"
                className="flex cursor-pointer items-start gap-4 rounded-2xl border border-dark-500 bg-dark-400 p-5"
              >
                <input
                  id="privacyConsent"
                  type="checkbox"
                  checked={field.value}
                  onChange={(event) => field.onChange(event.target.checked)}
                  onBlur={field.onBlur}
                  className="mt-0.5 size-5 accent-green-500"
                />

                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">
                    I consent to the collection and processing of my personal
                    and medical information.
                  </p>
                  <p className="text-sm text-dark-700">
                    This information will only be used for patient registration,
                    appointment scheduling and healthcare administration.
                  </p>
                </div>
              </label>

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </section>

      <SubmitButton
        isLoading={form.formState.isSubmitting}
        className="shad-primary-btn mt-10 h-12 w-full cursor-pointer text-base font-semibold"
      >
        Submit and Continue
      </SubmitButton>
    </form>
  );
}
