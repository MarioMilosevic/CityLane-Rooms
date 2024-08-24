import { ContentHeaderProps } from "../../utils/types";
const ContentHeader = ({ title }: ContentHeaderProps) => {
  return (
    <div className="py-4">
      <span className="uppercase text-lg font-medium">{title}</span>
    </div>
  );
};

export default ContentHeader;
