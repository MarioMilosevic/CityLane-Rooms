import { StatusProps } from "src/types/types";

const Status = ({ status }: StatusProps) => {
  const statusOptions = {
    "Checked out": "bg-neutral-300 dark:bg-slate-800",
    "Checked in": "bg-green-300 dark:bg-green-800",
    Unconfirmed: "bg-blue-300 dark:bg-blue-800",
  };

  return (
    <span className={`${statusOptions[status]} uppercase font-normal rounded-full text-xs w-[120px] px-2 py-1 text-center`}>
      {status}
    </span>
  );
};

export default Status;
