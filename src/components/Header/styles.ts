import styled from "styled-components/native";
import { CaretLeft } from "phosphor-react-native";
import { AntDesign } from "@expo/vector-icons";

export const Container = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

export const Logo = styled.Image`
  width: 46px;
  height: 55px;
`;

export const BackButton = styled.TouchableOpacity`
  flex:1;
`;

// export const BackIcon = styled(CaretLeft).attrs(({ theme }) => ({
//   size: 32,
//   color: theme.COLORS.WHITE,
// }))``;


export const BackIcon = styled(AntDesign).attrs(({theme}) => ({
  size: 36,
  color: theme.COLORS.WHITE,
  name: 'left'
}))``;