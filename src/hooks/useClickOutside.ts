import { useEffect, useRef } from "react";

 const useClickOutside = (handler) => {
   const ref = useRef(null);
   useEffect(() => {
     const maybeHandler = (e) => {
       if (!ref.current.contains(e.target)) {
         handler();
       }
     };
     document.addEventListener("mousedown", maybeHandler);
     return () => {
       document.removeEventListener("mousedown", maybeHandler);
     };
   }, [handler]);
   return ref;
};
 
export default useClickOutside

 {
   /* <div
          className="absolute top-1/2 right-0 -translate-y-1/2 -translate-x-4 cursor pointer w-8 h-8 flex items-center justify-center border border-black"
          onClick={() => setIsModalOpen((prev) => !prev)}
          ref={domNode}
        >
          <BsThreeDotsVertical className="h-5 w-5 cursor-pointer" />
        </div> */
 }