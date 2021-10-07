import React from "react";
import { Container, Title } from "./styles";

type GenreSliderItemProps = {
  item: any;
};

export default function GenreSliderItem({ item }: GenreSliderItemProps) {
  return (
    <Container>
      <Title
        numberOfLines={1}
      >
        {item.name}
      </Title>
    </Container>
  );
}