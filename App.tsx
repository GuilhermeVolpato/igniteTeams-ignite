import { ThemeProvider } from "styled-components/native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { StatusBar, SafeAreaView } from "react-native";

import { Groups } from "@screens/Groups";
import { Loading } from "@components/Loading";
import { NewGroup } from "@screens/NewGroup";
import { Players } from "@screens/Players";
import theme from "./src/theme";

import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      {fontsLoaded ? <Routes /> : <Loading />}
      <StatusBar barStyle="light-content" />
    </ThemeProvider>
  );
}
