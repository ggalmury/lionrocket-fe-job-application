import type { HTMLInputTypeAttribute } from "react";
import clsx from "clsx";

interface TextInputProps {
  name?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  onChange?: (value: string) => void;
}

const TextInput = ({ name, placeholder, type, onChange }: TextInputProps) => {
  return (
    <input
      className={clsx("h-11 rounded-xl px-3 text-sm border border-gray-300 transition placeholder-gray-400", "focus:border-primary-600")}
      name={name}
      placeholder={placeholder}
      type={type}
      onChange={(e) => {
        if (onChange) onChange(e.target.value);
      }}
    />
  );
};

export default TextInput;
