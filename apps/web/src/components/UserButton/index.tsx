import { useAppStore } from "@/hooks";
import { signOut } from "@/lib";
import { Avatar, Menu, Text } from "@mantine/core";
import {
  IconLogout2,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";
import classes from "./style.module.css";

export function UserButton() {
  const navigate = useNavigate();
  const updateLoading = useAppStore((state) => state.updateLoading);
  const removeUser = useAppStore((state) => state.removeUser);

  const onSignout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/");
          removeUser();
        },
        onRequest: () => {
          updateLoading(true);
        },
      },
    });

    updateLoading(false);
  };

  return (
    <div className={classes.menu}>
      <Menu shadow="md" width={200} position="bottom-end">
        <Menu.Target>
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
            radius="xl"
          />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Profile</Menu.Label>
          <Menu.Item leftSection={<IconSettings size={14} />}>
            Settings
          </Menu.Item>
          <Menu.Item leftSection={<IconMessageCircle size={14} />}>
            Messages
          </Menu.Item>
          <Menu.Item leftSection={<IconPhoto size={14} />}>Gallery</Menu.Item>
          <Menu.Item
            leftSection={<IconSearch size={14} />}
            rightSection={
              <Text size="xs" c="dimmed">
                ⌘K
              </Text>
            }
          >
            Search
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            leftSection={<IconLogout2 size={14} />}
            onClick={onSignout}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
