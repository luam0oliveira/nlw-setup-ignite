import Fastify from "fastify";
import { appRoutes } from "./routes";
import fastifyCors from "@fastify/cors";

const app = Fastify();

// Middlwares
app.register(fastifyCors);

// Routes
app.register(appRoutes);

// Server run
app.listen({ port: 3333 }).then(() => console.log("Server is running"));
