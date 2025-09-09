import clsx from "clsx";

import type { TypographyProps } from "@/components/atoms/typography/props/typographyProps";

const Body2 = ({ text, styles }: TypographyProps) => {
  return <span className={clsx("text-body2 leading-body2", styles?.color, styles?.weight ?? "font-normal")}>{text}</span>;
};

export default Body2;
