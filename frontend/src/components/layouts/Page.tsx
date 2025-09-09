import type { ReactNode } from "react";
import clsx from "clsx";

type FlexDirection = "row" | "col";

interface PageProps {
  flexDirection?: FlexDirection;
  justifyCenter?: boolean;
  itemsCenter?: boolean;
  children: ReactNode;
}

const Page = ({ flexDirection = "col", justifyCenter, itemsCenter, children }: PageProps) => {
  return (
    <div
      className={clsx(
        "flex-1 flex w-full max-w-6xl mx-auto px-4",
        `flex-${flexDirection}`,
        justifyCenter && "justify-center",
        itemsCenter && "items-center",
      )}
    >
      {children}
    </div>
  );
};

export default Page;
