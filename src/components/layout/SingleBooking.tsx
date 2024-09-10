import Status from "./Status";

const SingleBooking = ({status}) => {
  return (
    <li className="grid grid-cols-[2fr_5fr_5fr_4fr_4fr] gap-6 items-center h-[60px] bg-neutral-50 relative">
      <p className="pl-4">001</p>
      <div>
        <h2 className="">Vishal Bhati</h2>
        <h3 className="text-sm">vishalbhatipersonal@gmail.com</h3>
      </div>
      <div className="flex flex-col">
        <span>In 5 years → 3 night stay</span>
        <span className="text-sm">Sep 18 2029 — Sep 21 2029</span>
          </div>
          <Status status={status} />
    </li>
  );
};

export default SingleBooking;
