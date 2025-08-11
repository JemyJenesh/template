import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

type PageErrorProps = {
  title?: string;
  message?: string;
};

export function PageError({
  title = "Unable to load data",
  message = "Something went wrong while fetching data. Please reload the page.",
}: PageErrorProps) {
  const icon = <IconInfoCircle />;
  return (
    <Alert variant="light" color="red" radius="xs" title={title} icon={icon}>
      {message}
    </Alert>
  );
}
