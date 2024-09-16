import { ReactNode, MouseEventHandler, Dispatch, SetStateAction } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { IconType } from "react-icons";

export type RoomType = {
  name: string;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList | string;
  capacity: number;
  id: number;
  created_at: string;
};

export type RoomsState = {
  rooms: RoomType[];
};

export type LinkProps = {
  link: { text: string; icon: IconType };
  isSelected: boolean;
  clickHandler: MouseEventHandler<HTMLButtonElement>;
};

export type MainContainerProps = {
  children: ReactNode;
};

export type FilterButtonProps = {
  text: string;
  color: keyof FilterButtonColors;
  buttonHandler: () => void;
};

export type FilterButtonColors = {
  neutral: string;
  yellow: string;
};

export type ContentHeaderProps = {
  title: string;
};

export type ContentWrapperProps = {
  children: ReactNode;
};

export type OptionProps = {
  icon: IconType;
  text: string;
  clickHandler: () => void;
};

export type ContentRowProps = {
  room: RoomType;
  setRooms: Dispatch<SetStateAction<RoomType[]>>;
};

export type buttonColorOptions = {
  white: string;
  yellow: string;
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

export type filterAndSortType = {
  filter: string;
  sort: string;
};

export type SearchFilterTabProps = {
  tabOptions: string[];
  sortOptions: string[];
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
};

export type FormBlockProps = {
  children: ReactNode;
  size: keyof FormBlockSizeOptions;
  direction: keyof FormBlockDirectionOptions;
};

export type FormBlockDirectionOptions = {
  column: string;
  row: string;
};

export type FormBlockSizeOptions = {
  small: string;
  big: string;
};

export type OptionButtonProps = {
  children: ReactNode;
};

export type ModalFormProps = {
  room?: RoomType;
  setIsModalFormOpen: Dispatch<SetStateAction<boolean>>;
  setRooms: Dispatch<SetStateAction<RoomType[]>>;
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

export type ButtonWrapperJustifyOptions = {
  start: string;
  between: string;
  end: string;
};

export type ButtonWrapperProps = {
  children: ReactNode;
  justify: keyof ButtonWrapperJustifyOptions;
};

export type FilterProps = {
  options: string[];
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
};

export type SettingsType = {
  breakfastPrice: number;
  created_at: string;
  id: number;
  maxGuests: number;
  maxNights: number;
  minNights: number;
};

export type SettingsFormProps = {
  settings: SettingsType;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
};

export type UserType = {
  fullName: string;
  emailAddress: string;
  password: string;
};

export type StatusProps = {
  status: keyof StatusOptions;
};

export type StatusOptions = {
  "Checked in": string;
  "Checked out": string;
  Unconfirmed: string;
};

export type AmountProps = {
  type: keyof TypeOptions;
  value: number;
};

export type TypeOptions = {
  price: string;
  amount: string;
};

export type SelectProps = {
  options: string[];
};

export type OpenModalOptionsProps = {
  clickHandler: () => void;
};

export type BookingType = {
  created_at: string;
  endDate: string;
  extrasPrice: number;
  guestId: number;
  hasBreakfast: boolean;
  id: number;
  isPaid: boolean;
  numGuests: number;
  numNights: number;
  observations: string;
  roomId: number;
  roomPrice: number;
  startDate: string;
  status: string;
  totalPrice: number;
};

export type PageButtonProps = {
  direction: keyof PageButtonOptions;
  clickHandler: () => void;
  isDisabled: boolean;
};

export type PageButtonOptions = {
  previous: string;
  next: string;
};

export type ShowResultsProps = {
  to: number;
  from: number;
  numberOfBookings: number;
};
