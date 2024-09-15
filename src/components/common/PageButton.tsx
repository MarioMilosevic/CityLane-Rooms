import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { PageButtonProps } from "src/types/types";

const PageButton = ({
  direction,
  clickHandler,
  isDisabled,
}: PageButtonProps) => {
  const directionOptions = {
    previous: {
      icon: <MdNavigateBefore />,
      text: "Previous",
    },
    next: {
      icon: <MdNavigateNext />,
      text: "Next",
    },
  };

  const buttonClass = isDisabled
    ? "cursor-not-allowed"
    : "active:bg-yellow-600";

  return (
    <button
      className={`flex items-center gap-1 px-2 py-1 rounded-md bg-yellow-500 text-yellow-50 ${buttonClass}`}
      onClick={clickHandler}
      disabled={isDisabled}
    >
      {direction === "previous" ? (
        <>
          {directionOptions.previous.icon}
          <span>{directionOptions.previous.text}</span>
        </>
      ) : direction === "next" ? (
        <>
          <span>{directionOptions.next.text}</span>
          {directionOptions.next.icon}
        </>
      ) : null}
    </button>
  );
};

export default PageButton;
