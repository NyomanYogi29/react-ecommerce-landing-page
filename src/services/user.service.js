import { api } from "@/config";

export const UserService = {
  async getMe() {
    const res = await api.get("/user/me");
    return res.data;
  },
};
