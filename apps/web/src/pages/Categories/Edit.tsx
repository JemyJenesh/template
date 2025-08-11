import { PageError } from "@/components";
import { useEditOne, useGetOne } from "@/hooks";
import { CategoryForm } from "@/pages/Categories/components";
import { Container, Skeleton, Title } from "@mantine/core";
import type { Category } from "@repo/shared/schemas";
import { useNavigate, useParams } from "react-router";

export function CategoryEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isPending, isError } = useGetOne<Category>({
    id: id!,
    path: `/categories/${id}`,
    queryKey: "categories-view",
  });

  const { mutate, isPending: isUpdating } = useEditOne<Category, FormData>({
    path: "/categories",
    queryKey: "categories",
    message: {
      success: "Category updated successfully.",
      error: "Error while updating the category.",
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: (data) => {
        navigate(`/categories/${data.id}`);
      },
    });
  };

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
      <Title size={"h2"} mb={"md"}>
        Edit category
      </Title>

      <CategoryForm
        category={data}
        onSubmit={onSubmit}
        actionLabel="Update"
        loading={isUpdating}
      />
    </Container>
  );
}
