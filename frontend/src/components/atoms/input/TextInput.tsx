import clsx from "clsx";

import type { HTMLInputTypeAttribute } from "react";

interface TextInputProps {
  value?: string;
  name?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  maxLength?: number;
  onChange?: (value: string) => void;
}

const TextInput = ({ value, name, placeholder, type, maxLength, onChange }: TextInputProps) => {
  return (
    <input
      className={clsx(
        "w-full h-11 rounded-xl px-3 text-sm border border-gray-300 transition placeholder-gray-400",
        "focus:border-primary-600",
      )}
      value={value}
      name={name}
      placeholder={placeholder}
      type={type}
      maxLength={maxLength}
      onChange={(e) => {
        if (onChange) onChange(e.target.value);
      }}
    />
  );
};

export default TextInput;
