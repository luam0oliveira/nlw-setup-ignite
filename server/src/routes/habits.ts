import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import dayJs from "dayjs";
import dayjs from "dayjs";

export async function habitRoutes(app: FastifyInstance) {
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

  // Select/deselect habit completed
  app.patch("/:id/toggle", async (request) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
    });

    const { id: habit_id } = toggleHabitParams.parse(request.params);

    const today = dayjs().startOf("day").toDate();

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    });

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      });
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id,
        },
      },
    });

    if (!dayHabit) {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id,
        },
      });
    } else {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    }

    return habit_id;
  });
}
