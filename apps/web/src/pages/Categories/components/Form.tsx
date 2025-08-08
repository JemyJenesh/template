import { useGetAll } from "@/hooks";
import {
  Box,
  Button,
  FileInput,
  Grid,
  Group,
  LoadingOverlay,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import type { CategoryGetAllResponse } from "@repo/shared/schemas";
import { IconUpload } from "@tabler/icons-react";

type CategoryFormProps = {
  loading: boolean;
  onSubmit: (data: FormData) => void;
};

export function CategoryForm({ loading, onSubmit }: CategoryFormProps) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      description: "",
      image: null,
      parentId: null,
    },

    validate: {
      name: (value) => (value.length > 0 ? null : "Name is required"),
    },
  });

  const { data, isPending, isError } = useGetAll<CategoryGetAllResponse>({
    path: "/categories",
    queryKey: "categories",
    queryParams: {
      page: 1,
      pageSize: 100,
      sortBy: "name",
      sortOrder: "asc",
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    const formData = new FormData();

    formData.append("name", values.name);

    if (values.description) {
      formData.append("description", values.description);
    }
    if (values.parentId) {
      formData.append("parentId", values.parentId);
    }
    if (values.image) {
      formData.append("image", values.image);
    }

    onSubmit(formData);
  });

  if (isError) {
    return "error";
  }

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isPending || loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 1 }}
      />
      <form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Name"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Select category"
              placeholder="Choose one"
              data={data?.data.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              {...form.getInputProps("parentId")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FileInput
              label="Upload image"
              placeholder="Pick image"
              accept="image/*"
              leftSection={<IconUpload size={14} />}
              {...form.getInputProps("image")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Textarea
              rows={5}
              label="Description"
              key={form.key("description")}
              {...form.getInputProps("description")}
            />
          </Grid.Col>
        </Grid>

        <Group justify="flex-end" mt="md">
          <Button type="submit">Create</Button>
        </Group>
      </form>
    </Box>
  );
}
