import { useCreateOne } from "@/hooks";
import { CategoryForm } from "@/pages/Categories/components";
import { Container, Title } from "@mantine/core";
import type { Category } from "@repo/shared/schemas";
import { useNavigate } from "react-router";

export function CategoryCreatePage() {
  const navigate = useNavigate();

  const { mutate, isPending } = useCreateOne<Category, FormData>({
    path: "/categories",
    queryKey: "categories",
    message: {
      success: "Category created successfully.",
      error: "Error while creating the category.",
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: (data) => {
        navigate(`/categories/${data.id}`);
      },
    });
  };

  return (
    <Container>
      <Title size={"h2"} mb={"md"}>
        New category
      </Title>

      <CategoryForm onSubmit={onSubmit} loading={isPending} />
    </Container>
  );
}
