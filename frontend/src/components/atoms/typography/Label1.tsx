import clsx from "clsx";

import type { TypographyProps } from "@/components/atoms/typography/props/typographyProps";

const Label1 = ({ text, styles }: TypographyProps) => {
  return <span className={clsx("text-label1 leading-label1", styles?.color, styles?.weight ?? "font-bold")}>{text}</span>;
};

export default Label1;
