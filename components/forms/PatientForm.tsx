"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { UserFormValidation, type UserFormValues } from "@/lib/validation";
import SubmitButton from "@/components/SubmitButton";
import CustomFormField from "../ui/CustomFormField";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import PhoneInput from "react-phone-number-input";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

export function PatientForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserFormValidation),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },

    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = async ({ name, email, phone }: UserFormValues) => {
    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);

      if (user) {
        router.push(`/patients/${user.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className={cn("space-y-6", className)}
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      {...props}
    >
      <section className="mb-8 space-y-4">
        <h1 className="header">Hi There 👋</h1>

        <p className="text-dark-700">Schedule your first appointment.</p>
      </section>

      <CustomFormField
        control={form.control}
        name="name"
        label="Full name"
        placeholder="John Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="User"
      />

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

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <SubmitButton isLoading={form.formState.isSubmitting}>
        Get Started
      </SubmitButton>
    </form>
  );
}
