import { useSearchParams } from "react-router-dom";

const Select = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };

  return (
    <select
      className="py-1 px-2 rounded-md bg-neutral-50 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
      onChange={(e) => handleChange(e)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          Sort by {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
