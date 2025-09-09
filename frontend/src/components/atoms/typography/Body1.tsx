import clsx from "clsx";

import type { TypographyProps } from "@/components/atoms/typography/props/typographyProps";

const Body1 = ({ text, styles }: TypographyProps) => {
  return <span className={clsx("text-body1 leading-body1", styles?.color, styles?.weight ?? "font-normal")}>{text}</span>;
};

export default Body1;
