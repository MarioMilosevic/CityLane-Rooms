import { CheckboxSectionProps } from "src/types/types";

const CheckboxSection = ({
  children,
  zod,
  changeHandler,
  checked,
}: CheckboxSectionProps) => {
  const { onChange: zodOnChange, ...restZodProps } = zod || {};
  const handleChange = changeHandler ? changeHandler : zodOnChange;

  return (
    <div className="flex justify-between items-center lg:p-4 p-3 bg-neutral-50 dark:bg-slate-600">
      <input
        type="checkbox"
        className="lg:w-5 lg:h-5 accent-yellow-300 focus:ring-offset-1 focus:ring focus:ring-yellow-300"
        {...(checked !== undefined && { checked })}
        onChange={handleChange}
        {...restZodProps}
      />
      <div />
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
};

export default CheckboxSection;
