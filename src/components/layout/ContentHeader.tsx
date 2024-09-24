import { ContentHeaderProps } from "../../types/types";
const ContentHeader = ({ title }: ContentHeaderProps) => {
  return (
      <h2 className="uppercase py-4 lg:text-lg text-sm font-medium">{title}</h2>
  );
};

export default ContentHeader;
