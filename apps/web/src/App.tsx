import { PublicRoute } from "@/components";
import { useAuth } from "@/hooks";
import { HomePage, LoginPage } from "@/pages";
import { Route, Routes } from "react-router";

const App = () => {
  const { loading } = useAuth();

  if (loading) {
    return "Loading...";
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default App;
