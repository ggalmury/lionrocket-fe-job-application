import type { ButtonStyleOptions } from "@/components/atoms/button/options/buttonStyleOptions";

export interface ButtonProps {
  label: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  styles?: ButtonStyleOptions;
  onClick?: () => void;
}
