import { PageError } from "@/components";
import { useDeleteOne, useGetOne } from "@/hooks";
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
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
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

  const { mutate, isPending: isDeleting } = useDeleteOne({
    path: "/categories",
    queryKey: "categories",
    message: {
      success: "Category deleted successfully.",
      error: "Error while deleting the category.",
    },
    redirect: "/categories",
  });

  const handleDelete = () =>
    modals.openConfirmModal({
      title: `Are you sure you want to delete ${data?.name}?`,
      children: (
        <Text size="sm">
          This action cannot be undone. This will permanently delete the
          category.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Delete" },
      confirmProps: { color: "red" },
      onConfirm: () => mutate({ id: id! }),
    });

  if (isPending) {
    return (
      <Container>
        <Skeleton height={50} mb="md" />
        <Skeleton height={"30vh"} />
      </Container>
    );
  }

  if (isError) return <PageError />;

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

        <Button
          ml={"auto"}
          leftSection={<IconEdit size={16} />}
          color="red"
          loading={isDeleting}
          onClick={handleDelete}
        >
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
