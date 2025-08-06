import { createServer } from "./server";

const port = process.env.PORT || 5000;
const host = process.env.HOST || "http://localhost";

const server = createServer();

server.listen(port, () => {
  console.log(`Server running on ${host}:${port}`);
});
