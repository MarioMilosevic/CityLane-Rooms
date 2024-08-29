import { ContentHeaderWrapperProps } from "../../types/types";

const ContentHeaderWrapper = ({ children }: ContentHeaderWrapperProps) => {
  return (
    <div className="grid grid-cols-[2fr_5fr_5fr_4fr_4fr] gap-6">{children}</div>
  );
};

export default ContentHeaderWrapper;
