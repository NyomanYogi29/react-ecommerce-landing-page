import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services/product.service";
import { queryKeys } from "@/config/queryKeys";

export const useProductDetail = (productId, params = {}, options = {}) => {
  return useQuery({
    queryKey: queryKeys.product.detail(productId, params),
    queryFn: () => ProductService.getDetail(productId, params),
    enabled: !!productId,
    ...options,
  });
};

export const useProductsByCategory = (category = "All", options = {}) => {
  return useQuery({
    queryKey: queryKeys.product.byCategory(category),
    queryFn: () => ProductService.getByCategory(category),
    enabled: !!category,
    ...options,
  });
};
