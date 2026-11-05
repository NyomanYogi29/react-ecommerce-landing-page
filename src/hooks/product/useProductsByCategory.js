import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services/product.service";
import { queryKeys } from "@/config/queryKeys";

export const useProductsByCategory = (category = "All", options = {}) => {
  return useQuery({
    queryKey: queryKeys.product.byCategory(category),
    queryFn: () => ProductService.getByCategory(category),
    enabled: !!category,
    ...options,
  });
};
