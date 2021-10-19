import React, { useEffect, useState, useCallback } from "react";
import { Container, ContainerDetail, List } from "./styles";
import Header from "../../components/Header";
import { all, remove } from "../../utils/storage";
import { ActivityIndicator, RefreshControl } from "react-native";
import SavedMovieItem from "../../components/SavedMovieItem";
import { useIsFocused, useNavigation } from "@react-navigation/core";

export default function Movies() {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const handleOnClick = (item: any) => {
    navigation.navigate('Detail', { id: item.id });
  }

  const handleOnRemove = async (item: any) => {
    await remove(item.id);
  }

  const loadMovies = async (isActive: boolean) => {
    const response = await all();

    if (isActive) {
      setMovies(response);
    }

  };

  useEffect(() => {
    let isActive = true;
    const abortController = new AbortController();

    loadMovies(isActive);
    setLoading(false);

    return () => {
      isActive = false;
      abortController.abort();
    }

  }, [isFocused]);

  const onRefresh = useCallback(() => {
    let isActive = true;
    const abortController = new AbortController();

    setRefreshing(true);
    loadMovies(isActive);
    setRefreshing(false);

    return () => {
      isActive = false;
      abortController.abort();
    }

  }, []);

  return (
    <Container>
      <Header
        title="My movies" />

      <ContainerDetail
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {loading ?
          <ActivityIndicator size="large" color="#fff" />
          :
          <List
            data={movies}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (<SavedMovieItem item={item} onClick={handleOnClick} onRemove={handleOnRemove} />)}
            keyExtractor={(item) => String(item.id)}
          />
        }
      </ContainerDetail>

    </Container>
  );
}