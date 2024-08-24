import { ContentWrapperProps } from "../../utils/types";

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <div className="border border-neutral-200 rounded-md mb-8 w-full">
      {children}
    </div>
  );
};

export default ContentWrapper;
