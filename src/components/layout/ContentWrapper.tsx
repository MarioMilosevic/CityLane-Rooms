import { ContentWrapperProps } from "../../utils/types";

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <form className="rounded-md mb-8 w-full" onSubmit={(e) => e.preventDefault()}>
      {children}
    </form>
  );
};

export default ContentWrapper;
