import { InputProps } from "../../utils/types";

const Input = ({ name, type, value, changeHandler }: InputProps) => {
  const baseClass = "w-[400px] p-2 rounded-md border outline-none transition-all duration-200 border-neutral-300 focus:outline-sky-500"
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={(e) => changeHandler(e)}
      className={`${baseClass} ${type === "file" && "file_custom"}`}
    />
  );
}

export default Input

// import { InputProps } from "../../utils/types";

// const Input = ({ name, type, value, changeHandler }: InputProps) => {
//   const baseClass =
//     "w-[400px] p-2 rounded-md border outline-none transition-all duration-200 border-neutral-300 focus:outline-sky-500";

//   return type === "file" ? (
//     <div className="custom-file-input">
//       <label htmlFor={name} className="file-label">
//         Choose File
//       </label>
//       <input
//         id={name}
//         name={name}
//         type={type}
//         onChange={(e) => changeHandler(e)}
//         className="hidden"
//       />
//     </div>
//   ) : (
//     <input
//       name={name}
//       type={type}
//       value={value}
//       onChange={(e) => changeHandler(e)}
//       className={baseClass}
//     />
//   );
// };

// export default Input;

