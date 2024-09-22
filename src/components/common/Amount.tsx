import { AmountProps } from "src/types/types";
import { formatPrice } from "src/utils/helpers";

const Amount = ({ type, value }: AmountProps) => {
  const typeOptions = {
    price: "font-medium",
    amount: "font-normal",
  };

  return <span className={`${typeOptions[type]}`}>${formatPrice(value)}</span>;
};

export default Amount;
