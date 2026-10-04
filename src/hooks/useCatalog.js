import {
  fetchCategories,
  fetchItems,
  fetchItemsByID,
} from "../data/apiSimulation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const catalogKeys = {
  all: ["catalog"],
  categories: () => [...catalogKeys.all, "categories"],
  lists: () => [...catalogKeys.all, "list"],
  list: (filter) => [...catalogKeys.lists(), filter],
  details: () => [...catalogKeys.all, "detail"],
  detail: (id) => [...catalogKeys.details(), Number(id)],
};

export const useCategories = () => {
  return useQuery({
    queryKey: catalogKeys.categories(),
    queryFn: fetchCategories,
    staleTime: Infinity,
  });
};

export const useItems = (filters) => {
  return useQuery({
    queryKey: catalogKeys.list(filters),
    queryFn: () => fetchItems(filters),
    placeholderData: keepPreviousData,
  });
};

export const useItem = (id) => {
  return useQuery({
    queryKey: catalogKeys.detail(id),
    queryFn: () => fetchItemsByID(id),
    enabled: Boolean(id),
  });
};
