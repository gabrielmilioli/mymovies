import React, { useEffect, useState } from "react";
import { BannerImage, Container, ContainerDetail, Header, HeaderButton, LinkButton, RateContainer, RateTitle, Title, GenreSlider, Overview } from "./styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import { details } from "../../services/api";
import Stars from "react-native-stars";
import GenreSliderItem from "../../components/GenreSliderItem";
import { ActivityIndicator, Modal } from "react-native";
import ModalLink from "../../components/ModalLink";
import { exists, remove, save } from "../../utils/storage";
import Toast from "react-native-tiny-toast";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({
    id: '',
    poster_path: '',
    title: '',
    vote_average: 0,
    genres: [],
    overview: ''
  });
  const [loading, setLoading] = useState(true);
  const [openLink, setOpenLink] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  }

  const handleOpenLink = () => {
    setOpenLink(!openLink);
  }

  const handleSave = async () => {
    if (!isSaved) {
      await save(movie);
      setIsSaved(true);
      Toast.show('Movie saved in your list');
      return;
    }

    await remove(movie.id);
    setIsSaved(false);
    Toast.show('Movie removed from your list');
  }

  useEffect(() => {
    let isActive = true;
    const abortController = new AbortController();

    const loadMovie = async () => {
      const response = await details(route.params?.id);

      if (isActive) {
        setIsSaved(await exists(response.data.id));
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

      {loading ?
        <ActivityIndicator size="large" color="#fff" />
        :
        <>
          <Header>
            <HeaderButton
              onPress={handleBack}
            >
              <Feather name="arrow-left" size={32} color="#fff" />
            </HeaderButton>
            <HeaderButton
              onPress={handleSave}
            >
              <Ionicons name={isSaved ? "bookmark" : "bookmark-outline"} size={32} color="#fff" />
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
        </>
      }

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