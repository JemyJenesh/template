import { axiosInstance, toast } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

type QueryOptions = {
  path: string;
  queryKey: string;
  message?: {
    success: string;
    error?: string;
  };
  redirect?: string;
};

export const useEditOne = <R, B>({
  path,
  queryKey,
  message,
  redirect,
}: QueryOptions) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: B): Promise<R> => {
      const response = await axiosInstance.put(path, body);

      return response.data;
    },
    onSuccess: async () => {
      if (redirect) {
        navigate(redirect);
      }

      queryClient.invalidateQueries({ queryKey: [queryKey] });

      if (message?.success) toast.success(message.success);
    },
    onError: async () => {
      if (message?.error) toast.error(message.error);
    },
  });
};
