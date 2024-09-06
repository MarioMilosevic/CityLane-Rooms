import { useEffect, useRef } from "react";
import { FileInputProps } from "../../types/types";

const FileInput = ({ id, zod, error, file }: FileInputProps) => {
  const { onChange: zodOnChange, ...restZodProps } = zod || {};

  console.log('RENDEROVAN FILE INPUT KOMPONENTA')
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file instanceof File && fileInputRef.current) {
      console.log('uslo')
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
    }
  }, [file]);

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
