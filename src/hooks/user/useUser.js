import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/services/user.service";
import { queryKeys } from "@/config/queryKeys";

export const useUser = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.user.me,
    queryFn: UserService.getMe,
    staleTime: Infinity,
    retry: false,
    ...options,
  });
};
