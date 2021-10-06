import React from "react";
import { Container, MenuButton, Title } from "./styles";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <Container>
      <MenuButton
        onPress={navigation.openDrawer}
      >
        <Feather name="menu" size={32} color="#fff" />
      </MenuButton>
      <Title>{title}</Title>
    </Container>
  );
}