import { useNavigate } from "react-router-dom";

export const SignOut  = () => {
  localStorage.removeItem("access_token");
  window.location.reload();
}