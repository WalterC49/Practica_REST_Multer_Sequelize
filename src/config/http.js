import expressApp from "./express.js";
import { createServer } from "http";

const server = createServer(expressApp);

export default server;
