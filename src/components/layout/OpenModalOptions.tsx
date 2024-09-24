import { BsThreeDotsVertical } from 'react-icons/bs';
import { OpenModalOptionsProps } from 'src/types/types';
const OpenModalOptions = ({clickHandler}:OpenModalOptionsProps) => {
  return (
    <button
      className="cursor-pointer w-8 h-8 flex items-center justify-center absolute bottom-1/2 lg:right-2  -right-7 translate-y-1/2"
      onClick={clickHandler}
    >
      <BsThreeDotsVertical className="h-5 w-5" />
    </button>
  );
}

export default OpenModalOptions
