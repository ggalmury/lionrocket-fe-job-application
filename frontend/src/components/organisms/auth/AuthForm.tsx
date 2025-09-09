import type { FormEvent, HTMLInputTypeAttribute } from "react";
import { Link } from "react-router-dom";

import PrimaryButton from "@/components/atoms/button/PrimaryButton";
import TextInput from "@/components/atoms/input/TextInput";
import Title1 from "@/components/atoms/typography/Title1";
import Body1 from "@/components/atoms/typography/Body1";
import Label1 from "@/components/atoms/typography/Label1";
import FormField from "@/components/molecules/FormField";

interface FieldConfig {
  label: string;
  name: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

interface AuthFormProps {
  title: string;
  subtitle: string;
  fields: FieldConfig[];
  submitLabel: string;
  submitDisabled?: boolean;
  footerLabel?: string;
  footerTo?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const AuthForm = ({ title, subtitle, fields, submitLabel, submitDisabled, footerLabel, footerTo, onSubmit }: AuthFormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <div className="flex flex-col gap-8 w-full md:w-1/2">
      <div className="flex flex-col justify-center items-center">
        <Title1 text={title} />
        <Body1 text={subtitle} />
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {fields.map((field) => {
          const { label, name, placeholder, type } = field;

          return (
            <FormField key={`${title}-${name}`} label={label}>
              <TextInput name={name} placeholder={placeholder} type={type} />
            </FormField>
          );
        })}

        <PrimaryButton label={submitLabel} disabled={submitDisabled} />
      </form>

      {footerLabel && (
        <Link className="self-end" to={footerTo ?? "/"}>
          <Label1 text={footerLabel} styles={{ weight: "font-normal" }} />
        </Link>
      )}
    </div>
  );
};

export default AuthForm;
