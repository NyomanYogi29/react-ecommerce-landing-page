import { AuthService } from "@/services/auth.service";
import { AuthHandler } from "@/handler/auth.handler";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData) => {
      const payload = AuthHandler.registerPayload(formData);
      return AuthService.register(
        payload.name,
        payload.email,
        payload.password,
        payload.confirm_password,
      );
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.error(
        "Register gagal:",
        error.response?.data?.message || error.message,
      );
    },
  });
};
