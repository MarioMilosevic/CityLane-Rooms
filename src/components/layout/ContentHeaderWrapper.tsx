import { ContentHeaderWrapperProps } from "../../types/types";

const ContentHeaderWrapper = ({ children }: ContentHeaderWrapperProps) => {
  return (
    <div className="grid lg:grid-cols-[2fr_5fr_5fr_4fr_4fr] lg:gap-6 grid-cols-[1fr_2fr_2fr_2fr_2fr] place-items-center">{children}</div>
  );
};

export default ContentHeaderWrapper;
