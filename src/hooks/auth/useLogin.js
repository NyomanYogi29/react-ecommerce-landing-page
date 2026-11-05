import { AuthService } from "@/services/auth.service";
import { AuthHandler } from "@/handler/auth.handler";
import { queryKeys } from "@/config/queryKeys";
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
        localStorage.setItem("token", token);
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
