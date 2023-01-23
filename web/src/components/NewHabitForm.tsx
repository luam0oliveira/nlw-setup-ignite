import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { white } from "tailwindcss/colors";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) {
      return;
    }

    await api.post("habits", {
      title,
      weekDays,
    });

    setTitle("");
    setWeekDays([]);

    alert("Hábito salvo com sucesso!");
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      setWeekDays((prevState) => prevState.filter((_, day) => day !== weekDay));
    } else {
      setWeekDays((prevState) => [...prevState, weekDay]);
    }
  }

  return (
    <form className="w-full flex flex-col mt-6" onSubmit={handleSubmit}>
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento
      </label>
      <input
        type="text"
        id="title"
        placeholder="Exercícios, dormir bem, etc..."
        autoFocus
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="p-4 rounded-lg mt-4 bg-zinc-800 placeholder:text-zinc-400"
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="mt-3 flex flex-col gap-2">
        {availableWeekDays.map((weekDay, i) => (
          <Checkbox.Root
            key={weekDay}
            className="flex items-center gap-3 group"
            onCheckedChange={() => handleToggleWeekDay(i)}
            checked={weekDays.includes(i)}
          >
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center
                  bg-zinc-900 border-2 border-zinc-800
                  group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500"
            >
              <Checkbox.Indicator>
                <Check size={20} color={white} />
              </Checkbox.Indicator>
            </div>
            <span className="leading-tight ">{weekDay}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3
            font-semibold bg-green-600 hover:bg-green-500"
      >
        Confirmar <Check size={20} weight="bold" />
      </button>
    </form>
  );
}
