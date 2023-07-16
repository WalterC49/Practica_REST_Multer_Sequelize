import "./config/env.js";
import server from "./config/http.js";

const main = () => {
  server.listen(process.env.PORT);
  console.log(`Server at http://localhost:${process.env.PORT}`);
};

main();
