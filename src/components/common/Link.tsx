import { LinkProps } from "../../utils/types";

const Link = ({ link, isSelected, clickHandler }: LinkProps) => {
  const baseClass =
    "flex items-center gap-2 text-xl bg-neutral-50 rounded-xl p-2 cursor-pointer transition-colors duration-200 hover:bg-neutral-200";
  const isActive = "custom-color";
  return (
    <button className={`${baseClass} ${isSelected && isActive}`} onClick={clickHandler}>
      <span>{<link.icon />}</span>
      <h2 className="capitalize font-normal">{link.heading}</h2>
    </button>
  );
};

export default Link;
