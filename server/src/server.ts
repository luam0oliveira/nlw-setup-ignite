import Fastify from "fastify";
import { appRoutes } from "./routes";
import { appMiddlewares } from "./middlewares";

const app = Fastify()

// Middlwares
app.register(appMiddlewares)

// Routes
app.register(appRoutes)

// Server run
app.listen({ port: 3333 }).then(
  () => console.log('Server is running')
)