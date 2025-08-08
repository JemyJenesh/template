import { PrivateRoute, PublicRoute } from "@/components";
import { useAuth } from "@/hooks";
import { DashboardLayout, PublicLayout } from "@/layouts";
import { CategoriesPage, HomePage, LoginPage, NotFoundPage } from "@/pages";
import DashboardPage from "@/pages/Dashboard";
import { LoadingOverlay } from "@mantine/core";
import { Route, Routes } from "react-router";

const App = () => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingOverlay visible loaderProps={{ type: "bars" }} />;
  }

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<HomePage />} />
        </Route>
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
