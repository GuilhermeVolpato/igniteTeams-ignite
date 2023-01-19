import { Groups } from "@screens/Groups";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { StatusBar, SafeAreaView } from "react-native";

import { Loading } from "@components/Loading";
import theme from "./src/theme";


export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <SafeAreaView style={{flex:1}}>
      <ThemeProvider theme={theme}>
        {fontsLoaded ? <Groups /> : <Loading />}
        <StatusBar 
        barStyle='light-content'
        />
      </ThemeProvider>
    </SafeAreaView>
  );
}
