import { useGetAll } from "@/hooks";
import {
  ActionIcon,
  Anchor,
  Button,
  Flex,
  Image,
  List,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import type { CategoryGetAllResponse } from "@repo/shared/schemas";
import { IconEdit, IconEye, IconPlus, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router";

export function CategoriesPage() {
  const { data, isPending, isError } = useGetAll<CategoryGetAllResponse>({
    path: "/categories",
    queryKey: "categories",
    queryParams: {
      page: 1,
      pageSize: 50,
      sortBy: "name",
      sortOrder: "asc",
    },
  });

  const rows = data?.data.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>
        <Image mt={5} radius="md" src={row.media?.url} h={50} w={50} />
      </Table.Td>
      <Table.Td>
        <Stack gap={0} align="start">
          <Anchor component={Link} to={`/categories/${row.id}`}>
            {row.name}
          </Anchor>
          <Text size="sm" lineClamp={2}>
            {row.description}
          </Text>
        </Stack>
      </Table.Td>
      <Table.Td>
        <List>
          {row.subCategories?.map((subcategory) => (
            <List.Item key={subcategory.id}>
              <Anchor component={Link} to={`/categories/${subcategory.id}`}>
                {subcategory.name}
              </Anchor>
            </List.Item>
          ))}
        </List>
      </Table.Td>
      <Table.Td>
        <Flex gap={"md"}>
          <ActionIcon variant="subtle" color="green">
            <IconEye />
          </ActionIcon>
          <ActionIcon variant="subtle">
            <IconEdit />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash />
          </ActionIcon>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  if (isPending) return "...";

  if (isError) return "...error";

  return (
    <div>
      <Flex gap={"md"}>
        <Title order={1} size={"h2"}>
          Categories
        </Title>

        <Button
          ml="auto"
          leftSection={<IconPlus size={14} />}
          component={Link}
          to="/categories/new"
        >
          New
        </Button>
      </Flex>

      <Table mt={"lg"}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={80}>Image</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Subcategories</Table.Th>
            <Table.Th w={140}>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}
