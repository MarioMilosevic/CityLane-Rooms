import { AmountProps } from "src/types/types";
import { formatPrice } from "src/utils/helpers";

const Amount = ({ type, value }: AmountProps) => {
  const typeOptions = {
    price: "font-medium",
    amount: "font-normal",
  };

  return <h4 className={`${typeOptions[type]}`}>${formatPrice(value)}</h4>;
};

export default Amount;
