import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generateDatesFromYearBeginning";
import { HabitDay } from "./HabitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDates = 18 * 7;
const amountOfDatesToFill = minimumSummaryDates - summaryDates.length;

interface Summary {
  id: string;
  date: string;
  amount: number;
  completed: number;
}

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary[]>([] as Summary[]);

  useEffect(() => {
    api.get("days/summary").then((response) => setSummary(response.data));
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, day) => (
          <div
            key={`${day}-${weekDay}`}
            className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
          >
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((summaryDate) => {
          const dayInSummary = summary.find((day) => {
            return dayjs(summaryDate).isSame(day.date, "day");
          });

          return (
            <HabitDay
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
              date={summaryDate}
              key={summaryDate.toString()}
            />
          );
        })}

        {amountOfDatesToFill > 0 &&
          Array.from({ length: amountOfDatesToFill }).map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            ></div>
          ))}
      </div>
    </div>
  );
}
