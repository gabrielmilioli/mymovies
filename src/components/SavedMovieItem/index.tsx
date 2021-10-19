import React from "react";
import { Container, Image, Title, RateContainer, RateTitle, ActionContainer } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { Swipeable } from "react-native-gesture-handler";

type SavedMovieItemProps = {
  item: any;
  onClick: (item: any) => {};
  onRemove: (item: any) => {};
};

export default function SavedMovieItem({ item, onClick, onRemove }: SavedMovieItemProps) {

  const RightActions = () => {
    return (
      <ActionContainer
        onPress={() => onRemove(item)}
      >
        <Feather
          name="trash"
          color="#fff"
          size={24}
        />
      </ActionContainer>
    );
  };

  return (
    <Container
      activeOpacity={0.8}
      onPress={() => onClick(item)}
    >
      <Swipeable
        renderRightActions={RightActions}
      >
        <Image
          resizeMethod="resize"
          source={{ uri: `https://image.tmdb.org/t/p/original/${item.poster_path}` }}
        />
      </Swipeable>
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