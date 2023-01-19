import { Container, Logo, BackIcon, BackButton } from "./styles";
import logoImg from "@assets/logo.png";
import { AntDesign } from "@expo/vector-icons/";

type Props = {
    showBackButton?: boolean;
}

export function Header({showBackButton = false}: Props) {
  return (
    <Container>
    { showBackButton &&
        <BackButton>
            <BackIcon />
        </BackButton>
    }
      <Logo source={logoImg} />
    </Container>
  );
}
