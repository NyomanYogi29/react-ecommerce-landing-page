import { queryKeys } from "@/config";
import { AuthHandler } from "@/handler/auth.handler";
import { AuthService } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => {
      const payload = AuthHandler.loginPayload(formData);
      return AuthService.login(payload.email, payload.password);
    },
    onSuccess: (data) => {
      const token = data?.data?.token || data?.token;
      if (token) {
        localStorage.setItem("auth", token);
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
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
