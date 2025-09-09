import type { ButtonStyleOptions } from "@/components/atoms/button/options/buttonStyleOptions";

export interface ButtonProps {
  label: string;
  disabled?: boolean;
  styles?: ButtonStyleOptions;
  onClick?: () => void;
}
