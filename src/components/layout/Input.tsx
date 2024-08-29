// import { InputProps } from "../../utils/types";

// const Input = ({ name, type, value, changeHandler }: InputProps) => {
//   const baseClass =
//     "w-[400px] p-2 rounded-md border outline-none transition-all duration-200 border-neutral-300 focus:outline-sky-500";
//   return (
//     <input
//       name={name}
//       type={type}
//       value={value}
//       onChange={(e) => changeHandler(e)}
//       className={`${baseClass} ${type === "file" && "file_custom"}`}
//     />
//   );
// };

// export default Input;

import { InputProps } from "../../utils/types";

const Input = ({ name, type, value, changeHandler }: InputProps) => {
  const baseClass =
    "w-[400px] p-2 rounded-md border outline-none transition-all duration-200 border-neutral-300 focus:outline-sky-500";

  // Only apply the value attribute if the type is not "file"
  const inputProps = {
    name,
    type,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e),
    className: `${baseClass} ${type === "file" && "file_custom"}`,
  };

  if (type !== "file") {
    // If the type is not "file", include the value attribute
    inputProps.value = value;
  }

  return <input {...inputProps} />;
};

export default Input;
