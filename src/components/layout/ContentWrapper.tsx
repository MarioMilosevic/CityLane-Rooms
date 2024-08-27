import { ContentWrapperProps } from "../../utils/types";

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <div className="rounded-md mb-8 w-full">
      {children}
    </div>
  );
};

export default ContentWrapper;
