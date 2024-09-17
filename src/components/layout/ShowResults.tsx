import { ShowResultsProps } from "src/types/types";

const ShowResults = ({showResultsFrom,showResultsTo, numberOfItems}:ShowResultsProps) => {
  return (
    <div className="flex gap-4">
      <p>
        Showing <span className="font-medium">{showResultsFrom}</span> to{" "}
        <span className="font-medium">{showResultsTo}</span> out of{" "}
        <span className="font-medium">{numberOfItems}</span> results
      </p>
    </div>
  );
}

export default ShowResults
