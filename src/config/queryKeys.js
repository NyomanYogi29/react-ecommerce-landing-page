export const queryKeys = {
  user: {
    me: ["user", "me"],
  },
  product: {
    byCategory: (category) => ["product", "category", category],
    detail: (productId, params) => ["product", "detail", productId, params],
  },
};
