import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { white } from "tailwindcss/colors";
import { api } from "../lib/axios";

interface HabitsListProps {
  date: Date;
  onCompletedChange: (completed: number) => void;
}

interface HabitInfo {
  possibleHabits: {
    id: string;
    title: string;
  }[];
  completedHabits: string[];
}

export function HabitsList({ date, onCompletedChange }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitInfo>();

  async function getDayHabits() {
    const { data } = await api.get<HabitInfo>(`days`, {
      params: {
        date: date.toISOString(),
      },
    });
    setHabitsInfo(data);
  }

  useEffect(() => {
    getDayHabits();
  }, []);

  async function handleToggleHabit(habitId: string) {
    await api.patch(`habits/${habitId}/toggle`);

    const isHabitAlreadyCompleted =
      habitsInfo?.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      // Forcing
      completedHabits = habitsInfo!.completedHabits.filter(
        (habit) => habitId !== habit
      );
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });

    onCompletedChange(completedHabits.length);
  }

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map((habit) => (
        <Checkbox.Root
          key={habit.id}
          className="flex items-center gap-3 group outline-none disabled:cursor-not-allowed"
          checked={habitsInfo.completedHabits.includes(habit.id)}
          disabled={isDateInPast}
          onCheckedChange={() => handleToggleHabit(habit.id)}
        >
          <div
            className="h-8 w-8 rounded-lg flex items-center justify-center transition-colors
          bg-zinc-900 border-2 border-zinc-800
          group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500
          group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background"
          >
            <Checkbox.Indicator>
              <Check size={20} color={white} />
            </Checkbox.Indicator>
          </div>
          <span className="font-semibold text-xl leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-300 transition-colors">
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  );
}
