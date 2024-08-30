import { ReactNode, MouseEventHandler, Dispatch, SetStateAction } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { IconType } from "react-icons";

export type RoomType = {
  name: string;
  regularPrice: string;
  discount: string;
  description: string;
  image: string;
  capacity: string;
  id: number;
  created_at: string;
};

export type NewRoomType = {
  name: string;
  regularPrice: string;
  discount: string;
  description: string;
  image: string | null | File;
  capacity: string;
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

export type RowOptionProps = {
  icon: IconType;
  text: string;
  clickHandler: () => void;
};

export type ContentRowProps = {
  room: RoomType;
  children: ReactNode;
};

export type buttonColorOptions = {
  white: string;
  blue: string;
};

export type PrimaryActionButtonProps = {
  text: string;
  color: keyof buttonColorOptions;
  clickHandler: () => void;
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
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  singleRoom: NewRoomType;
  setSingleRoom: Dispatch<SetStateAction<NewRoomType>>;
  isEditing: boolean
  setRooms:Dispatch<SetStateAction<RoomType[]>>
};

export type LabelProps = {
  id: string;
};

export type InputProps = {
  id: string;
  type: string;
  value?: string | number;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  zod?: UseFormRegisterReturn;
  error?: FieldError | undefined;
};

export type TextAreaProps = {
  value: string;
  id: string;
  changeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
