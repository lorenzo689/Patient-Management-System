"use client";
import Image from "next/image";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

interface CustomFormFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: React.ComponentProps<typeof Input>["type"];
  iconSrc?: string;
  iconAlt?: string;
}

const CustomFormField = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  iconSrc,
  iconAlt = "",
}: CustomFormFieldProps<TFieldValues>) => {
  const inputId = `form-field-${name}`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={inputId}>{label}</FieldLabel>

          <div
            className="flex h-11 items-center rounded-md border 
          border-dark-500 bg-dark-400 focus-within:border-dark-600"
          >
            {iconSrc && (
              <Image
                src={iconSrc}
                width={24}
                height={24}
                alt={iconAlt}
                className="ml-3 size-5"
              />
            )}

            <Input
              {...field}
              id={inputId}
              type={type}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              value={field.value ?? ""}
              className="h-full border-0 bg-transparent px-3 focus-visible:border-0 
              focus-visible:ring-0 dark:bg-transparent"
            />
          </div>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default CustomFormField;
