import { View, StyleSheet, Text, } from "react-native";
import { Container} from "./styles";
import {Header} from '@components/Header'
import {Highlight} from '@components/Highlight'
export function Groups() {
  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtittle="jogue com a sua turma"/>
    </Container>
  );
}
