import React from "react";
import Header from "../../components/Header";
import { Container, SearchButton, SearchContainer, SearchInput, CategoryTitle, BannerButton, Banner, CategoryContainer, MovieSlider } from "./styles";
import { Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import MovieSliderItem from "../../components/MovieSliderItem";

export default function Home() {

  const handleBanner = () => {

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

          <CategoryTitle>In theaters</CategoryTitle>
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
            data={[1, 2, 3]}
            renderItem={({ item }) => (<MovieSliderItem />)}
          />

          <CategoryTitle>Popular</CategoryTitle>

          <MovieSlider
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={[1, 2, 3]}
            renderItem={({ item }) => (<MovieSliderItem />)}
          />

          <CategoryTitle>Highest votes</CategoryTitle>

          <MovieSlider
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={[1, 2, 3]}
            renderItem={({ item }) => (<MovieSliderItem />)}
          />

        </CategoryContainer>
      </ScrollView>

    </Container>
  );
}