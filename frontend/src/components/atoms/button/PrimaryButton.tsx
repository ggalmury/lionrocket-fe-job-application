import clsx from "clsx";

import type { ButtonProps } from "@/components/atoms/button/props/buttonProps";
import Label1 from "@/components/atoms/typography/Label1";

const PrimaryButton = ({ label, styles, type, disabled = false, onClick }: ButtonProps) => {
  return (
    <button
      className={clsx("px-4 rounded-lg bg-primary-600 disabled:bg-gray-100", styles?.width ?? "w-full", styles?.height ?? "h-12")}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      <Label1 text={label} styles={{ color: disabled ? "text-gray-400" : "text-white", weight: "font-medium" }} />
    </button>
  );
};

export default PrimaryButton;
