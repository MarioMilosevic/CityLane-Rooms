import { useEffect, useRef } from "react";

const FileInput = ({ id, zod, error, file }) => {
  const { onChange: zodOnChange, ...restZodProps } = zod || {};
  
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    if (file instanceof File && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);

      fileInputRef.current.files = dataTransfer.files;
      console.log(
        "File input ref initialized after mount:",
        fileInputRef.current
      );
    } else {
      console.log("File input ref still null after mount");
    }
  }, [file]); // Only runs after the component mounts

  return (
    <div className="relative w-full max-w-xs">
      <input
        id={id}
        type="file"
        onChange={zodOnChange}
        className={`w-full p-4 rounded-md border outline-none transition-all duration-200 border-neutral-300 focus:outline-sky-500 file_custom`}
        {...restZodProps}
        ref={fileInputRef}
      />
      {error && (
        <p className="text-red-500 absolute -bottom-6 left-0 text-sm">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FileInput;


