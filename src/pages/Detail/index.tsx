import React, { useEffect, useState } from "react";
import { BannerImage, Container, ContainerDetail, Header, HeaderButton, LinkButton, RateContainer, RateTitle, Title, GenreSlider, Overview } from "./styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import { details } from "../../services/api";
import Stars from "react-native-stars";
import GenreSliderItem from "../../components/GenreSliderItem";
import { Modal } from "react-native";
import ModalLink from "../../components/ModalLink";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({
    poster_path: '',
    title: '',
    vote_average: 0,
    genres: [],
    overview: ''
  });
  const [loading, setLoading] = useState(true);
  const [openLink, setOpenLink] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  }

  const handleOpenLink = () => {
    setOpenLink(!openLink);
  }

  useEffect(() => {
    let isActive = true;
    const abortController = new AbortController();

    const loadMovie = async () => {
      const response = await details(route.params?.id);

      if (isActive) {
        setMovie(response.data);
      }

    };

    loadMovie();
    setLoading(false);

    return () => {
      isActive = false;
      abortController.abort();
    }

  }, []);

  return (
    <Container>

      <Header>
        <HeaderButton
          onPress={handleBack}
        >
          <Feather name="arrow-left" size={32} color="#fff" />
        </HeaderButton>
        <HeaderButton>
          <Ionicons name="bookmark" size={32} color="#fff" />
        </HeaderButton>
      </Header>

      <BannerImage
        resizeMethod="resize"
        source={{ uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }}
      />

      <LinkButton
        onPress={handleOpenLink}
      >
        <Feather name="link" size={32} color="#fff" />
      </LinkButton>

      <ContainerDetail
        showsVerticalScrollIndicator={false}
      >
        <Title
          numberOfLines={1}
        >
          {movie.title}
        </Title>

        <RateContainer>
          <Stars
            default={movie.vote_average}
            count={10}
            half={true}
            starSize={22}
            fullStar={<Ionicons name="md-star" size={24} color="#e7a74e" />}
            emptyStar={<Ionicons name="md-star-outline" size={24} color="#e7a74e" />}
            halfStar={<Ionicons name="md-star-half" size={24} color="#e7a74e" />}
            disable={true}
          />
          <RateTitle>{movie.vote_average}/10</RateTitle>
        </RateContainer>

        <GenreSlider
          data={movie.genres}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (<GenreSliderItem item={item} />)}
          keyExtractor={(item) => String(item.id)}
        >

        </GenreSlider>

        <Title>
          Overview
        </Title>
        <Overview>
          {movie.overview}
        </Overview>

      </ContainerDetail>

      <Modal
        animationType="slide"
        transparent={true}
        visible={openLink}
      >
        <ModalLink item={movie} onClose={handleOpenLink} />
      </Modal>

    </Container>
  );
}