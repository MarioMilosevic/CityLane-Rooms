import { LinkProps } from "../../utils/types";

const Link = ({ index, link, isSelected }: LinkProps) => {
  const baseClass =
    "flex items-center gap-2 text-sm bg-neutral-50 rounded-xl p-2 cursor-pointer transition-colors duration-200 hover:bg-gray-200";
  const isActive = "custom-color";
  return (
    <li key={index} className={`${baseClass} ${isSelected && isActive}`}>
      <span>{<link.icon />}</span>
      <h2 className="font-normal">{link.heading}</h2>
    </li>
  );
};

export default Link;
