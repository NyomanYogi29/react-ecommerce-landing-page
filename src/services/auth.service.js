import { api } from "@/config";

export const AuthService = {
  async login(email, password) {
    const res = await api.post("/login", { email, password });
    return res.data;
  },

  async register(name, email, password, confirm_password) {
    const res = await api.post("/register", {
      name,
      email,
      password,
      confirm_password,
    });

    return res.data;
  },

  async logout() {
    const res = await api.post("/logout");
    return res.data;
  },
};
