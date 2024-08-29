import { ContentWrapperProps } from "../../types/types";

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return <div className="rounded-md mb-8 w-full">{children}</div>;
};

export default ContentWrapper;
