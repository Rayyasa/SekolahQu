import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
export const useToast = () => {
  const toastSuccess = (message: string) => {
    toast.success(message);
  };

  const toastWarning = (message: string) => {
    Swal.fire({
      position: "top",
      icon: "warning",
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const toastError = () => {
    Swal.fire({
      position: "top",
      icon: "warning",
      title: "Ada Kesalahan",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return { toastError, toastSuccess, toastWarning };
};
