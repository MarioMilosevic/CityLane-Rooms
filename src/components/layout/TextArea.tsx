import { TextAreaProps } from "../../types/types";

const TextArea = ({ id, error, zod }: TextAreaProps) => {
    const { onChange: zodOnchange, ...restZodProps } = zod;

  return (
    <div className="relative">
      <textarea
        className="w-[400px] p-2 rounded-md border outline-none transition-all duration-200 border-neutral-300 focus:outline-sky-500"
        id={id}
        onChange={zodOnchange}
        {...restZodProps}
      ></textarea>
      {error && (
        <p className="text-red-500 absolute bottom-[-25px] left-0">
          {error?.message}
        </p>
      )}
    </div>
  );
};

export default TextArea;
