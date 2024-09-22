import { LinkProps } from "../../types/types";

const Link = ({ link, isSelected, clickHandler }: LinkProps) => {
  const buttonBaseClass =
    "group flex items-center gap-2 text-xl rounded-xl py-2 px-4 cursor-pointer border border-neutral-900 transition-colors duration-200 hover:bg-neutral-800";

  const buttonClass = isSelected ? "bg-neutral-900" : "bg-neutral-50 dark:bg-slate-500";
  const spanClass = isSelected ? "text-yellow-500" : "group-hover:text-yellow-500";
  const h2Class = isSelected
    ? "text-neutral-50"
    : "group-hover:text-neutral-50";

  return (
    <button
      className={`${buttonBaseClass} ${buttonClass}`}
      onClick={clickHandler}
    >
      <span className={`transition-colors duration-200 ${spanClass}`}>
        {<link.icon />}
      </span>
      <h2 className={`capitalize font-normal ${h2Class}`}>{link.text}</h2>
    </button>
  );
};

export default Link;
