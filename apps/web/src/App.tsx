import { useEffect } from "react";
import { axiosInstance } from "./lib";

const App = () => {
  useEffect(() => {
    const fetchStatus = async () => {
      const data = await axiosInstance.get("/status");

      console.log(data);
    };

    fetchStatus();
  }, []);

  return <div>App</div>;
};

export default App;
