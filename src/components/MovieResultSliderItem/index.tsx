import React from "react";
import { Container, Image, Title, RateContainer, RateTitle } from "./styles";
import { Ionicons } from "@expo/vector-icons";

type MovieResultSliderItemProps = {
  item: any;
  onClick: any;
};

export default function MovieResultSliderItem({ item, onClick }: MovieResultSliderItemProps) {
  return (
    <Container
      activeOpacity={0.8}
      onPress={() => onClick(item)}
    >
      <Image
        resizeMethod="resize"
        source={{ uri: `https://image.tmdb.org/t/p/original/${item.poster_path}` }}
      />
      <Title
        numberOfLines={1}
      >
        {item.title}
      </Title>
      <RateContainer>
        <Ionicons name="md-star" size={12} color="#e7a74e" />
        <RateTitle>{item.vote_average}/10</RateTitle>
      </RateContainer>
    </Container>
  );
}