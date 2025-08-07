import { PrivateRoute, PublicRoute } from "@/components";
import { useAuth } from "@/hooks";
import { DashboardLayout } from "@/layouts";
import { HomePage, LoginPage } from "@/pages";
import DashboardPage from "@/pages/Dashboard";
import { LoadingOverlay } from "@mantine/core";
import { Route, Routes } from "react-router";

const App = () => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingOverlay visible />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
