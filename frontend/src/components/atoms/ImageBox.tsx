import clsx from "clsx";

import Body2 from "@/components/atoms/typography/Body2";

interface ImageBoxProps {
  src?: string;
  alt: string;
  size?: string;
}

const ImageBox = ({ src, alt, size = "size-16" }: ImageBoxProps) => {
  return (
    <div className={clsx("flex justify-center items-center shrink-0 rounded-lg bg-gray-200 overflow-hidden", size)}>
      {src ? (
        <img className="w-full h-full object-cover" src={src} alt={alt} />
      ) : (
        <Body2 text="이미지" styles={{ color: "text-gray-400" }} />
      )}
    </div>
  );
};

export default ImageBox;
