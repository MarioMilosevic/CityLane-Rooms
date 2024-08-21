import { ReactNode } from "react";
import { IconType } from "react-icons";

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

export type TableHeaderSizes = {
  small: string;
  medium: string;
  big: string;
};

export type TableHeaderProps = {
  width: keyof TableHeaderSizes;
  children: ReactNode;
};

export type TableContainerProps = {
  children: ReactNode;
};

export type TableHeader = {
  title: string;
  width: keyof TableHeaderSizes;
};

export type TableButtonProps = {
  children: ReactNode;
};

export type TableRowProps = {
  room: RoomType;
};

export type ButtonProps = {
  children:ReactNode
}

export type HeaderContainerProps = {
  isVisible: boolean;
  tabOptions: string[];
  sortOptions:SortOptionType[]
}

export type SortOptionType = {
  name: string;
  value: string;
}

export type SearchFilterTabProps = {
  tabOptions: string[];
  sortOptions: SortOptionType[];
}