// import { FileInputProps } from "../../types/types";
// import { useEffect, useRef } from "react";

// const FileInput = ({ id, type, zod, file, error }: FileInputProps) => {
//   const { onChange: zodOnChange, ...restZodProps } = zod || {};
//   const fileInputRef = useRef(null);
//   console.log(file instanceof File);

//     useEffect(() => {
//       console.log(fileInputRef.current)
//     const dataTransfer = new DataTransfer();
//     console.log(dataTransfer);
//     dataTransfer.items.add(file);

//     if (fileInputRef.current) {
//       console.log("entered if");
//       fileInputRef.current.files = dataTransfer.files;
//       console.log(fileInputRef.current.files);
//     }
//   }, [file]);

//   return (
//     <div className="relative w-full max-w-xs">
//       <input
//         ref={fileInputRef}
//         id={id}
//         type="file"
//         onChange={zodOnChange}
//         className={`w-full p-4 rounded-md border outline-none transition-all duration-200 border-neutral-300 focus:outline-sky-500 ${
//           type === "file" ? "file_custom" : ""
//         }`}
//         {...restZodProps}
//       />
//       {error && (
//         <p className="text-red-500 absolute -bottom-6 left-0 text-sm">
//           {error.message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default FileInput;

import React, { useEffect, useRef } from "react";

const FileInput = ({file}) => {
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (fileInputRef.current) {
      console.log(
        "File input ref initialized after mount:",
        fileInputRef.current
      );
    } else {
      console.log("File input ref still null after mount");
    }
  }, []); // Only runs after the component mounts

  return (
    <div>
      <input ref={fileInputRef} type="file" />
    </div>
  );
};

export default FileInput;

