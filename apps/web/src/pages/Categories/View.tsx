import { useGetOne } from "@/hooks";
import {
  Anchor,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  List,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type { Category } from "@repo/shared/schemas";
import { IconArrowLeft, IconEdit } from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router";

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
    <Container>
      <Group mb="md" gap={"md"}>
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <Title order={1} size={"h2"}>
          {data.name}
        </Title>

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
        <Flex gap={"xl"} mb={"lg"}>
          <Image w={100} h={100} src={data.media?.url} />

          <Box>
            <Text fw={500} c="dimmed" size="sm">
              Name
            </Text>
            <Title order={2} size={"h3"}>
              {data.name}
            </Title>
          </Box>
        </Flex>

        <Stack>
          {data.description && (
            <Stack gap={0}>
              <Text fw={500} c="dimmed" size="sm">
                Description
              </Text>
              <Text>{data.description}</Text>
            </Stack>
          )}

          {data.parent && (
            <Stack gap={0}>
              <Text fw={500} c="dimmed" size="sm">
                Category
              </Text>
              <Anchor component={Link} to={`/categories/${data.parent.id}`}>
                {data.parent.name}
              </Anchor>
            </Stack>
          )}

          {data.subCategories?.length > 0 && (
            <Box>
              <Text fw={500} c="dimmed" size="sm" mb={"xs"}>
                Subcategories
              </Text>
              <List>
                {data.subCategories.map((subcategory) => (
                  <List.Item key={subcategory.id}>
                    <Anchor
                      component={Link}
                      to={`/categories/${subcategory.id}`}
                    >
                      {subcategory.name}
                    </Anchor>
                  </List.Item>
                ))}
              </List>
            </Box>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}
