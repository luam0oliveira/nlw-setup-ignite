import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import dayJs from "dayjs";

export async function habitRoutes(app: FastifyInstance) {
  app.get("/", async () => "Hello habit routes!");

  app.post("/", async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = createHabitBody.parse(request.body);

    const today = dayJs().startOf("day").toDate();

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((week_day) => {
            return {
              week_day,
            };
          }),
        },
      },
    });
  });
}
