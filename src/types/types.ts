import { ReactNode, MouseEventHandler, Dispatch, SetStateAction } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { IconType } from "react-icons";

export type RoomType = {
  name: string;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
  capacity: number;
  id: number;
  created_at: string;
};

export type NewRoomType = {
  name: string;
  capacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image?: FileList | null | string;
};

export type RoomsState = {
  rooms: RoomType[];
};

export type LinkProps = {
  index: number;
  link: { heading: string; icon: IconType };
  isSelected: boolean;
  clickHandler: MouseEventHandler<HTMLButtonElement>;
};

export type MainContainerProps = {
  children: ReactNode;
};

export type FilterTabProps = {
  text: string;
  color: keyof FilterTabColors;
  buttonHandler: () => void;
};

export type FilterTabColors = {
  blue: string;
  neutral: string;
};

export type ContentHeaderProps = {
  title: string;
};

export type ContentWrapperProps = {
  children: ReactNode;
};

export type RowOptionProps = {
  icon: IconType;
  text: string;
  clickHandler: () => void;
};

export type ContentRowProps = {
  room: RoomType;
  rooms: RoomType[];
  setRooms: Dispatch<SetStateAction<RoomType[]>>;
  setRenderedRooms: Dispatch<SetStateAction<RoomType[]>>;
};

export type buttonColorOptions = {
  white: string;
  blue: string;
};

export type PrimaryActionButtonProps = {
  text: string;
  color: keyof buttonColorOptions;
  type?: "submit" | "button";
  clickHandler?: () => void;
  isLoading?: boolean;
};

export type HeadingContainerProps = {
  title: string;
  children?: ReactNode;
};

export type SortOptionType = {
  option: string;
};

export type filterAndSortType = {
  filter: string;
  sort: string;
};

export type SearchFilterTabProps = {
  tabOptions: { text: string; clickHandler: () => void }[];
  sortOptions: string[];
  activeIndex: number;
  rendered: RoomType[];
  setRendered: Dispatch<SetStateAction<RoomType[]>>;
  filterAndSort: filterAndSortType;
  setFilterAndSort: Dispatch<SetStateAction<filterAndSortType>>;
};

export type FormBlockProps = {
  children: ReactNode;
};

export type OptionButtonProps = {
  children: ReactNode;
};

export type ModalFormProps = {
  room?: RoomType;
  rooms?: RoomType[];
  setIsModalFormOpen: Dispatch<SetStateAction<boolean>>;
  setRooms: Dispatch<SetStateAction<RoomType[]>>;
  setRenderedRooms: Dispatch<SetStateAction<RoomType[]>>;
};

export type LabelProps = {
  id: string;
};

export type InputProps = {
  id: string;
  type: string;
  zod?: UseFormRegisterReturn;
  error?: FieldError | undefined;
};

export type TextAreaProps = {
  id: string;
  zod: UseFormRegisterReturn;
  error: FieldError | undefined;
};

export type ContentRowWrapperProps = {
  children: ReactNode;
};

export type ContentHeaderWrapperProps = {
  children: ReactNode;
};

export type PrimaryActionButtonWrapperProps = {
  children: ReactNode;
};
