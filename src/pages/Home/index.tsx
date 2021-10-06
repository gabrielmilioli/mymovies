import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Container, SearchButton, SearchContainer, SearchInput, CategoryTitle, BannerButton, Banner, CategoryContainer, MovieSlider } from "./styles";
import { Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import MovieSliderItem from "../../components/MovieSliderItem";
import { nowPlaying, popular, topRated } from "../../services/api";
import { maxSize } from "../../utils/array";

export default function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  const handleBanner = () => {

  };

  useEffect(() => {
    loadAllMovies();
  }, []);

  const loadAllMovies = async () => {
    const [nowPlayingResponse, popularResponse, topRatedResponse] = await Promise.all([
      nowPlaying(),
      popular(),
      topRated()
    ]);

    setNowMovies(maxSize(nowPlayingResponse.data.results, 10));
    setPopularMovies(maxSize(popularResponse.data.results, 10));
    setTopMovies(maxSize(topRatedResponse.data.results, 10));
  };

  return (
    <Container>
      <Header title="Home" />

      <SearchContainer>
        <SearchInput
          placeholder="Search..."
          placeholderTextColor="#ddd"
        />
        <SearchButton>
          <Feather name="search" size={32} color="#fff" />
        </SearchButton>
      </SearchContainer>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <CategoryContainer>

          <CategoryTitle>Now playing</CategoryTitle>
          <BannerButton
            activeOpacity={0.8}
            onPress={handleBanner}
          >
            <Banner
              resizeMethod="resize"
              source={{ uri: 'https://cdn.pastemagazine.com/www/articles/2021/06/08/best-movies-in-theaters-header.jpg' }}
            />
          </BannerButton>

          <MovieSlider
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={nowMovies}
            renderItem={({ item }) => (<MovieSliderItem item={item} />)}
            keyExtractor={(item) => String(item.id)}
          />

          <CategoryTitle>Popular</CategoryTitle>

          <MovieSlider
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={popularMovies}
            renderItem={({ item }) => (<MovieSliderItem item={item} />)}
            keyExtractor={(item) => String(item.id)}
          />

          <CategoryTitle>Top rated</CategoryTitle>

          <MovieSlider
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={topMovies}
            renderItem={({ item }) => (<MovieSliderItem item={item} />)}
            keyExtractor={(item) => String(item.id)}
          />

        </CategoryContainer>
      </ScrollView>

    </Container>
  );
}