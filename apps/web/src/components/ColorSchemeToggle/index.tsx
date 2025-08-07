import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggleColorScheme = () =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");

  return (
    <ActionIcon onClick={toggleColorScheme} variant="subtle">
      {colorScheme === "dark" ? <IconSun /> : <IconMoonStars />}
    </ActionIcon>
  );
}
