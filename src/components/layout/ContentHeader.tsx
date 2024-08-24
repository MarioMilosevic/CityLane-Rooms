import { ContentHeaderProps } from "../../utils/types";
const ContentHeader = ({ title }: ContentHeaderProps) => {
  return (
    <div className="py-4">
      <h2 className="uppercase text-lg font-medium">{title}</h2>
    </div>
  );
};

export default ContentHeader;
