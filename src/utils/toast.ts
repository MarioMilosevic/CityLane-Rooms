import toast from "react-hot-toast";

type ToastType = "success" | "error";

export const showToast = (text: string, type: ToastType = "success") =>
  toast[type](text);
