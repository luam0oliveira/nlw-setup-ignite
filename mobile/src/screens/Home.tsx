import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { api } from "../lib/axios";
import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates";
import { Loading } from "../components/Loading";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const datesFromYearsStart = generateRangeDatesFromYearStart();

const minimumSummaryDateSizes = 12 * 7;
const amountOfDaysTofill = minimumSummaryDateSizes - datesFromYearsStart.length;

interface Summary {
  date: string;
  id: string;
  amount: number;
  completed: number;
}

export function Home() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary[]>([]);
  const { navigate } = useNavigation();

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get("days/summary");
      setSummary(response.data);
    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar o sumário de hábitos.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />
      <View className="flex-row mt-6 mb-2 ">
        {weekDays.map((weekDay, i) => (
          <Text
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            key={`${weekDay}-${i}`}
            style={{ width: DAY_SIZE, height: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearsStart.map((date) => {
            const dayWithHabits = summary.find((day) =>
              dayjs(date).isSame(day.date, "day")
            );

            console.log(dayWithHabits);

            return (
              <HabitDay
                date={date}
                amountCompleted={dayWithHabits?.completed}
                amountOfHabits={dayWithHabits?.amount}
                onPress={() => navigate("habit", { date: date.toISOString() })}
                key={date.toString()}
              />
            );
          })}

          {amountOfDaysTofill > 0 &&
            Array.from({ length: amountOfDaysTofill }).map((_, i) => (
              <View
                key={i}
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
