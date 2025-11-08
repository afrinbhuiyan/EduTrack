import Swal from "sweetalert2";

export const showNotification = (message, type = "success") => {
  Swal.fire({
    title: type === "error" ? "Error" : "Success",
    text: message,
    icon: type,
    confirmButtonColor: type === "error" ? "#ef4444" : "#10b981",
    timer: 2500,
    timerProgressBar: true,
    showConfirmButton: false,
    toast: true,
    position: "top-end",
  });
};
