import type { ReactNode } from "react";

import Label1 from "@/components/atoms/typography/Label1";

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

const FormField = ({ label, children }: FormFieldProps) => {
  return (
    <label className="flex flex-col gap-2">
      <Label1 text={label} styles={{ weight: "font-medium" }} />
      {children}
    </label>
  );
};

export default FormField;
