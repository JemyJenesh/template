import { UserButton } from "@/components/UserButton";
import { Burger, Title } from "@mantine/core";
import { IconMagnetFilled } from "@tabler/icons-react";
import classes from "./style.module.css";

type HeaderProps = {
  opened: boolean;
  toggle: () => void;
};

export function Header({ opened = false, toggle }: HeaderProps) {
  return (
    <header className={classes.header}>
      <div className={classes.title}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <IconMagnetFilled className={classes.logo} />

        <Title order={3}>Template</Title>
      </div>

      <UserButton />
    </header>
  );
}
