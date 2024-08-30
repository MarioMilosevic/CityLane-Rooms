import { TextAreaProps } from "../../types/types";

const TextArea = ({ id, value, changeHandler, error, zod }: TextAreaProps) => {
    const { onChange: zodOnchange, ...restZodProps } = zod;
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      changeHandler(e);
      if (zodOnchange) {
        zodOnchange(e);
      }
    };
  return (
    <div className="relative">
      <textarea
        className="w-[400px] p-2 rounded-md border outline-none transition-all duration-200 border-neutral-300 focus:outline-sky-500"
        id={id}
        onChange={handleChange}
        value={value}
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
