import { notifications } from "@mantine/notifications";

export const toast = {
  error: (message: string) => {
    notifications.show({
      message,
      color: "red",
    });
  },

  success: (message: string) => {
    notifications.show({
      message,
      color: "green",
    });
  },
};
