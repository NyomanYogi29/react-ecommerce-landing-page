import { AuthService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credential) => AuthService.login(credential),
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error(
        "Login gagal:",
        error.response?.data?.message || error.message,
      );
    },
  });
};
