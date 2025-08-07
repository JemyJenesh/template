import { useAppStore } from "@/hooks";
import { useSession } from "@/lib";
import { useEffect } from "react";

export const useAuth = () => {
  const { data, isPending } = useSession();
  const loading = useAppStore((state) => state.loading);
  const updateUser = useAppStore((state) => state.updateUser);
  const updateLoading = useAppStore((state) => state.updateLoading);

  useEffect(() => {
    if (data) {
      updateUser({
        ...data.user,
        image: data.user.image ?? undefined,
        token: data.session.token,
      });
    }

    updateLoading(isPending);
  }, [data, isPending]);

  return { loading };
};
