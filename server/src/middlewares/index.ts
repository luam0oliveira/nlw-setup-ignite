import { FastifyInstance } from "fastify";
import cors from "@fastify/cors"

export async function appMiddlewares( app: FastifyInstance ) {
    app.register(cors)
}