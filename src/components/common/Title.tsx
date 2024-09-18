import { TitleProps } from "src/types/types";

const Title = ({ title, position }: TitleProps) => {
  const titlePositionOptions = {
    left:'text-left',
    center:'text-center',
  }
  return <h1 className={`text-3xl font-medium ${titlePositionOptions[position]}`}>{title}</h1>;
};

export default Title;
