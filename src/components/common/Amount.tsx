import { AmountProps } from "src/types/types";
import { formatPrice } from "src/utils/helpers";

const Amount = ({ type, value, position }: AmountProps) => {
  const typeOptions = {
    price: "font-medium",
    amount: "font-normal",
  };

  const positionOptions = {
    start:"justify-self-start",
    center: 'justify-self-center',
  }

  return <span className={`${typeOptions[type]} lg:text-base text-xs ${positionOptions[position]}`}>${formatPrice(value)}</span>;
};

export default Amount;
