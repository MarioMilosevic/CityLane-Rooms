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
};

export type TableContainerProps = {
  children:ReactNode
}