import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { Container, HeaderContainer, HeaderButton, Title, MovieResultSlider } from './styles';
import { Feather } from "@expo/vector-icons";
import { searchMovie } from '../../services/api';
import MovieResultSliderItem from '../../components/MovieResultSliderItem';

export default function SearchResults() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMovies, setTotalMovies] = useState(0);

  const handleClickMovie = (item: any) => {
    handleBack();
    navigation.navigate('Detail', { id: item.id });
  };

  const handleBack = () => {
    navigation.goBack();
  }

  useEffect(() => {
    let isActive = true;
    const abortController = new AbortController();

    const searchMovies = async () => {
      const response = await searchMovie(route.params?.title);

      if (isActive) {
        setMovies(response.data.results);
        setTotalMovies(response.data.results.length || 0);
      }
    };

    searchMovies();
    setLoading(false);

    return () => {
      isActive = false;
      abortController.abort();
    }

  }, []);

  return (
    <Container>

      <HeaderContainer>
        <HeaderButton
          onPress={handleBack}
        >
          <Feather name="arrow-left" size={32} color="#fff" />
        </HeaderButton>
        <Title>{totalMovies} result(s) found</Title>
      </HeaderContainer>

      <MovieResultSlider
        data={movies}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (<MovieResultSliderItem item={item} onClick={handleClickMovie} />)}
        keyExtractor={(item) => String(item.id)}
      >

      </MovieResultSlider>

    </Container>
  );
}
