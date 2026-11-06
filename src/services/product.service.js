import { api } from "@/config";

export const ProductService = {
  async getByCategory(category) {
    const res = await api.get(`/product/category/${category}`);
    return res.data;
  },

  async getDetail(productId, params = {}) {
    const res = await api.get(`/product/${productId}`, { params });
    return res.data;
  },
};
