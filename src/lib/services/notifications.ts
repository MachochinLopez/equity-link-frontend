import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export const notifications = {
  success: (message: string) => {
    return Toast.fire({
      icon: "success",
      title: message,
    });
  },

  error: (message: string) => {
    return Toast.fire({
      icon: "error",
      title: message,
    });
  },

  warning: (message: string) => {
    return Toast.fire({
      icon: "warning",
      title: message,
    });
  },

  info: (message: string) => {
    return Toast.fire({
      icon: "info",
      title: message,
    });
  },
};
