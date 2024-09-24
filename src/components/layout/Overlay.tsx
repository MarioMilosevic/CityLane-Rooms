import { ReactNode } from "react";

type OverlayProps = {
  showChildren?: boolean;
  children?: ReactNode;
}

const Overlay = ({ showChildren = false, children }: OverlayProps) => {
  return (
       <div className="flex items-center justify-center z-10 fixed top-0 right-0 w-full min-h-screen backdrop-blur-sm"> 
      {showChildren && children}
    </div>
  );
};

export default Overlay;

