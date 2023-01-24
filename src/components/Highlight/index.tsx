import { Container, Tittle, Subtitle } from "./styles";
import { View } from "react-native";

type Props = {
    title: string;
    subtitle: string;
}

export function Highlight({title, subtitle}: Props) {
  return (
    <Container>
      <Tittle> { title } </Tittle>
      <Subtitle> { subtitle } </Subtitle>
    </Container>
  );
}