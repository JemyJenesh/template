import { axiosInstance } from "@/lib";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import qs from "qs";

type QueryOptions = {
  path: string;
  queryKey: string;
  queryParams?: Record<string, string | number>;
};

export const useGetAll = <R>({ path, queryKey, queryParams }: QueryOptions) => {
  const params = qs.stringify(queryParams);
  const fullPath = queryParams ? `${path}?${params}` : path;
  const fullQueryKey = queryParams ? [queryKey, params] : [queryKey];

  return useQuery({
    queryKey: fullQueryKey,
    queryFn: async (): Promise<R> => {
      const response = await axiosInstance.get(fullPath);

      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};
