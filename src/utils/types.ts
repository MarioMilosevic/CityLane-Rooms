import { ReactNode } from "react";
import { IconType } from "react-icons";
import { MouseEventHandler } from "react";

export type RoomType = {
  created_at: string;
  description: string;
  discount: number;
  id: number;
  image: string;
  name: string;
  regularPrice: number;
  capacity: number;
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
  children: ReactNode;
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

export type TableRowOptions = {
  icon: IconType;
  text: string;
  clickHandler: () => void;
}[];

export type RowOptionProps = {
  icon: IconType;
  text: string;
  clickHandler: () => void;
};

export type ContentRowProps = {
  room: RoomType;
  options: TableRowOptions;
};

export type buttonColorOptions = {
  white: string;
  blue: string;
};

export type PrimaryActionButtonProps = {
  text: string;
  color: keyof buttonColorOptions;
  clickHandler:() => void
};

export type HeadingContainerProps = {
  title: string;
  isVisible: boolean;
  tabOptions?: string[];
  sortOptions?: SortOptionType[];
};

export type SortOptionType = {
  name: string;
  value: string;
};

export type SearchFilterTabProps = {
  tabOptions?: string[];
  sortOptions?: SortOptionType[];
};

export type FormBlockProps = {
  children: ReactNode;
};

export type OptionButtonProps = {
  children: ReactNode;
};

export type ModalFormProps = {
  children: ReactNode;
  closeModal: () => void;
};

export type LabelProps = {
  name: string;
};

export type InputProps = {
  name: string;
  type: string;
};
