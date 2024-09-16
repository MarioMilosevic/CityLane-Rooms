import { ShowResultsProps } from "src/types/types";

const ShowResults = ({from, to, numberOfItems}:ShowResultsProps) => {
  return (
    <div className="flex gap-4">
      <p>
        Showing <span className="font-medium">{from}</span> to{" "}
        <span className="font-medium">{to}</span> out of{" "}
        <span className="font-medium">{numberOfItems}</span> results
      </p>
    </div>
  );
}

export default ShowResults
