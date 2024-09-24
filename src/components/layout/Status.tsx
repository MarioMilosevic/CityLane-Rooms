import { StatusProps } from "src/types/types";

const Status = ({ status }: StatusProps) => {
  const statusOptions = {
    "Checked out": "bg-neutral-300 dark:bg-slate-800",
    "Checked in": "bg-green-300 dark:bg-green-800",
    Unconfirmed: "bg-blue-300 dark:bg-blue-800",
  };

  return (
    <div
      className={`${statusOptions[status]} lg:uppercase flex justify-center items-center text-center font-medium rounded-full text-xs px-2 py-1 lg:w-[120px] lg:p-2`}
    >
      {status}
    </div>
  );
};

export default Status;
