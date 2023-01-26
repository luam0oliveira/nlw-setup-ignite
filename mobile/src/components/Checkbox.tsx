import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface CheckboxProps extends TouchableOpacityProps {
  isChecked?: boolean;
  title: string;
}

export function Checkbox({ isChecked = false, title, ...rest }: CheckboxProps) {
  return (
    <TouchableOpacity
      className="flex-row mb-2 items-center gap-2"
      activeOpacity={0.7}
      {...rest}
    >
      {isChecked ? (
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
        >
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
      )}
      <Text className="text-white text-base font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}
