import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Container, SearchButton, SearchContainer, SearchInput, CategoryTitle, CategoryContainer, MovieSlider } from "./styles";
import { Feather } from "@expo/vector-icons";
import { ActivityIndicator, ScrollView } from "react-native";
import MovieSliderItem from "../../components/MovieSliderItem";
import { nowPlaying, popular, topRated } from "../../services/api";
import { maxSize, random } from "../../utils/array";
import Banner from "../../components/Banner";
import { useNavigation } from "@react-navigation/core";

export default function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState({});

  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleClickMovie = (item: any) => {
    navigation.navigate('Detail', { id: item.id });
  };

  useEffect(() => {
    let isActive = true;
    const abortController = new AbortController();

    const loadAllMovies = async () => {
      const [nowPlayingResponse, popularResponse, topRatedResponse] = await Promise.all([
        nowPlaying(),
        popular(),
        topRated()
      ]);

      if (isActive) {
        const nowMoviesList = maxSize(nowPlayingResponse.data.results, 11);
        const randomNumber = random(nowMoviesList);

        setBannerMovie(nowMoviesList[randomNumber]);

        setNowMovies(nowMoviesList.filter((v: any, i: number) => i !== randomNumber));
        setPopularMovies(maxSize(popularResponse.data.results, 10));
        setTopMovies(maxSize(topRatedResponse.data.results, 10));
      }

    };

    loadAllMovies();
    setLoading(false);

    return () => {
      isActive = false;
      abortController.abort();
    }

  }, []);

  return (
    <Container>
      <Header title="Home" />

      <SearchContainer>
        <SearchInput
          placeholder="Search..."
          placeholderTextColor="#ddd"
          editable={!loading}
        />
        <SearchButton
          disabled={loading}
        >
          <Feather name="search" size={32} color="#fff" />
        </SearchButton>
      </SearchContainer>

      {loading ?
        <ActivityIndicator size="large" color="#fff" />
        :
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <CategoryContainer>

            <CategoryTitle>Now playing</CategoryTitle>

            <Banner
              onClick={handleClickMovie}
              item={bannerMovie}
            />

            <MovieSlider
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={nowMovies}
              renderItem={({ item }) => (<MovieSliderItem item={item} onClick={handleClickMovie} />)}
              keyExtractor={(item) => String(item.id)}
            />

            <CategoryTitle>Popular</CategoryTitle>

            <MovieSlider
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={popularMovies}
              renderItem={({ item }) => (<MovieSliderItem item={item} onClick={handleClickMovie} />)}
              keyExtractor={(item) => String(item.id)}
            />

            <CategoryTitle>Top rated</CategoryTitle>

            <MovieSlider
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={topMovies}
              renderItem={({ item }) => (<MovieSliderItem item={item} onClick={handleClickMovie} />)}
              keyExtractor={(item) => String(item.id)}
            />

          </CategoryContainer>
        </ScrollView>
      }

    </Container>
  );
}