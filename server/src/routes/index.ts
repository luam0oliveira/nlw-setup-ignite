import { FastifyInstance } from "fastify";
import { dayRoutes } from "./days";
import { habitRoutes } from "./habits";

export async function appRoutes(app: FastifyInstance) {
  app.register(habitRoutes, { prefix: "habits" });

  app.register(dayRoutes, { prefix: "days" });
}
