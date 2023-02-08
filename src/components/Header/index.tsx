import { Container, Logo, BackIcon, BackButton } from "./styles";
import logoImg from "@assets/logo.png";
import { AntDesign } from "@expo/vector-icons/";
import { useNavigation } from "@react-navigation/native";

type Props = {
    showBackButton?: boolean;
}

export function Header({showBackButton = false}: Props) {
  const navigation = useNavigation();

  function handleGoBack(){
    navigation.goBack();
  }

  // EXEMPLO, Voltar sempre para tela Home
  // Groups > NewGrop > Players
  function handleGoBackToHome(){
    navigation.navigate('Groups');
  }

  return (
    <Container>
    { showBackButton &&
        <BackButton onPress={handleGoBackToHome}>
            <BackIcon />
        </BackButton>
    }
      <Logo source={logoImg} />
    </Container>
  );
}
