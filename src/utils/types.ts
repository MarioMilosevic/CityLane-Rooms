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
}

export type LinkProps = {
  index:number;
  link:{heading:string, icon:IconType};
  isSelected:boolean;
};

export type MainContainerProps = {
  children: ReactNode;
}