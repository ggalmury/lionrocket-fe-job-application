import clsx from "clsx";

interface TextInputProps {
  value?: string;
  name?: string;
  placeholder?: string;
  maxLength?: number;
  onChange?: (value: string) => void;
}

const TextArea = ({ value, name, placeholder, maxLength, onChange }: TextInputProps) => {
  return (
    <textarea
      className={clsx("min-h-28 rounded-xl p-3 text-sm border border-gray-300 transition placeholder-gray-400", "focus:border-primary-600")}
      value={value}
      name={name}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={(e) => {
        if (onChange) onChange(e.target.value);
      }}
    />
  );
};

export default TextArea;
