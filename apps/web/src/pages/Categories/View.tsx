import { useGetOne } from "@/hooks";
import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type { Category } from "@repo/shared/schemas";
import { IconArrowLeft, IconEdit } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router";

export function CategoryViewPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isPending, isError } = useGetOne<Category>({
    id: id!,
    path: `/categories/${id}`,
    queryKey: "categories-view",
  });

  if (isPending) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Text>Error...</Text>
      </Container>
    );
  }

  return (
    <Container py="xl">
      <Group mb="md" gap={"md"}>
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <Button ml={"auto"} leftSection={<IconEdit size={16} />} color="red">
          Delete
        </Button>

        <Button
          leftSection={<IconEdit size={16} />}
          onClick={() => navigate(`/categories/${id}/edit`)}
        >
          Edit
        </Button>
      </Group>

      <Paper withBorder shadow="sm" p="xl" radius="md">
        <Flex gap={"xl"}>
          <Image w={100} h={100} src={data.media?.url} />

          <Box>
            <Text fw={500} size="sm" c="dimmed">
              Name
            </Text>
            <Title order={2}>{data.name}</Title>
          </Box>
        </Flex>

        {data.description && (
          <Stack gap={0} mt={"lg"}>
            <Text fw={500}>Description</Text>
            <Text c="dimmed">{data.description}</Text>
          </Stack>
        )}
      </Paper>
    </Container>
  );
}
