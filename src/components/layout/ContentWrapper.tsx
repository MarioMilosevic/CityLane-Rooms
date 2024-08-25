import { ContentWrapperProps } from "../../utils/types";

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <form className="border border-neutral-200 rounded-md mb-8 w-full" onSubmit={(e) => e.preventDefault()}>
      {children}
    </form>
  );
};

export default ContentWrapper;
