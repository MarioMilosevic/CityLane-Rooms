import { AmountProps } from "src/types/types";

const Amount = ({ type, value }: AmountProps) => {
  const typeOptions = {
    price: "font-medium",
    amount: "font-normal",
  };

  return <h4 className={`${typeOptions[type]}`}>{`$${value}.00`}</h4>;
};

export default Amount;
