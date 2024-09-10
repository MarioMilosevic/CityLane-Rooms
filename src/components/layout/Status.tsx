import { StatusProps } from "src/types/types";

const Status = ({ status }: StatusProps) => {
  const statusOptions = {
    checkedOut: "bg-neutral-300",
    checkedIn: "bg-green-300",
    unconfirmed: "bg-blue-300",
  };

  return (
    <span className={`${statusOptions[status]} uppercase font-normal rounded-full text-sm w-[120px] px-2 py-1 text-center`}>
      {status}
    </span>
  );
};

export default Status;
