import React from "react";
import { Container, Image, Title, RateContainer, RateTitle } from "./styles";
import { Ionicons } from "@expo/vector-icons";

export default function MovieSliderItem() {
  return (
    <Container
      activeOpacity={0.8}
    >
      <Image
        resizeMethod="resize"
        source={{ uri: 'https://cdn.pastemagazine.com/www/articles/2021/06/08/best-movies-in-theaters-header.jpg' }}
      />
      <Title
        numberOfLines={1}
      >Filme</Title>
      <RateContainer>
        <Ionicons name="md-star" size={12} color="#e7a74e" />
        <RateTitle>9/10</RateTitle>
      </RateContainer>
    </Container>
  );
}