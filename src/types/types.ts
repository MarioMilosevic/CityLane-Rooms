import { User } from "@supabase/supabase-js";
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

export type SharedLayoutProps = {
  handleThemeSwitch: () => void;
  theme: string;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export type NavigationProps = {
  handleThemeSwitch: () => void;
  theme: string;
  user: User;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TitleProps = {
  title: string;
  position: keyof TitleOptions;
};

export type TitleOptions = {
  left: string;
  center: string;
};

export type PageLinkProps = {
  link: { text: string; icon: IconType };
  isSelected: boolean;
  clickHandler: MouseEventHandler<HTMLButtonElement>;
};

export type MainContainerProps = {
  children: ReactNode;
  isSidebarOpen: boolean;
  closeSidebar: () => void;
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
  setNumberOfRooms: React.Dispatch<React.SetStateAction<number>>;
};

export type buttonColorOptions = {
  white: string;
  yellow: string;
  red: string;
  gray: string;
};

export type PrimaryActionButtonProps = {
  text: string;
  color: keyof buttonColorOptions;
  type?: "submit" | "button";
  clickHandler?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
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


export type SidebarProps = {
  isSidebarOpen: boolean;
  closeSidebar:() => void
};

export type RoomsModalProps = {
  room?: RoomType;
  setIsRoomsModalOpen: Dispatch<SetStateAction<boolean>>;
  setRooms: Dispatch<SetStateAction<RoomType[]>>;
  setNumberOfRooms: React.Dispatch<React.SetStateAction<number>>;
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
  image: string | null;
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
  position: keyof AmountPositionOptions
};

export type AmountPositionOptions = {
  start: string;
  center:string
}

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
  status: keyof StatusOptions;
  totalPrice: number;
  Guests: GuestType;
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
  showResultsTo: number;
  showResultsFrom: number;
  numberOfItems: number;
};

export type GuestType = {
  countryFlag: string;
  created_at: string;
  email: string;
  fullName: string;
  id: number;
  nationalID: string;
  nationality: string;
};

export type SingleBookingProps = {
  booking: BookingType;
  setBookings: React.Dispatch<React.SetStateAction<BookingType[]>>;
  setNumberOfBookings: React.Dispatch<React.SetStateAction<number>>;
};

export type DeleteBookingModalProps = {
  closeModal: () => void;
  children: ReactNode;
  title: string;
};

export type BookingHeaderProps = {
  status: keyof StatusOptions | undefined;
  title: string;
  goBack: () => void;
};

export type BookingSectionData = {
  booking: {
    Guests: GuestType;
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
    status: keyof StatusOptions;
    totalPrice: number;
  };
};

export type CheckboxSectionProps = {
  children: ReactNode;
  zod: UseFormRegisterReturn;
  changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
};

export type AccountProps = {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export type UpdateAccountFormProps = {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};
