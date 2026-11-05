import { AuthService } from "@/services/auth.service";
import { AuthHandler } from "@/handler/auth.handler";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData) => {
      const payload = AuthHandler.loginPayload(formData);
      return AuthService.login(payload.email, payload.password);
    },
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
