import { Container, Tittle, Subtittle } from "./styles";

type Props = {
    title: string;
    subtittle: string;
}

export function Highlight({title, subtittle}: Props) {
  return (
    <Container>
      <Tittle> { title } </Tittle>
      <Subtittle> { subtittle } </Subtittle>
    </Container>
  );
}