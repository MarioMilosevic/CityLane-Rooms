import { TextAreaProps } from "../../types/types";

const TextArea = ({ id, error, zod }: TextAreaProps) => {
    const { onChange: zodOnchange, ...restZodProps } = zod;

  return (
    <div className="w-full relative">
      <textarea
        className="w-full p-2 rounded-md border outline-none transition-all duration-200 border-neutral-300 focus:outline-yellow-500 focus:border-none dark:bg-slate-500 dark:border-none dark:text-slate-50"
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
