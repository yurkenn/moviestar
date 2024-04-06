import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Card, Input, Main, ScrollView, Spinner, YStack } from 'tamagui';

import { getSearchResults, getTrending } from '@/services/api';
import { Container, Subtitle, Title } from '@/tamagui.config';
import MovieCard from '@/components/MovieCard';
import useDebounce from '@/utils/useDebounce';

const Page = () => {
  const [searchString, setSearchString] = useState('');
  const debouncedString = useDebounce(searchString, 500);

  const trendingQuery = useQuery({
    queryKey: ['trending'],
    queryFn: getTrending,
  });

  const searchQuery = useQuery({
    queryKey: ['search', debouncedString],
    queryFn: () => getSearchResults(debouncedString),
    enabled: debouncedString.length > 0,
  });

  return (
    <Main>
      <ImageBackground
        source={{
          uri: 'https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/ghQrKrcEpAlkzBuNoOCSxHQXWqw.jpg',
        }}
        style={{ width: '100%', height: 200 }}>
        <Container>
          <YStack>
            <Title
              color="#fff"
              enterStyle={{
                opacity: 0,
                scale: 1.5,
                y: -10,
              }}
              animation="quick">
              Trending
            </Title>
            <Input
              placeholder="Search for a movie, tv show, person..."
              placeholderTextColor="#fff"
              borderWidth={1}
              size="$4"
              value={searchString}
              onChangeText={(text) => setSearchString(text)}
            />
          </YStack>
        </Container>
      </ImageBackground>
      <Subtitle
        p={10}
        animation="lazy"
        enterStyle={{
          opacity: 0,
          y: 10,
        }}>
        {searchQuery.data?.results ? 'Search Results' : 'Trending'}
      </Subtitle>

      {(trendingQuery.isLoading || searchQuery.isLoading) && (
        <Spinner size="large" color="$blue10" />
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        py={40}
        contentContainerStyle={{ gap: 14, paddingLeft: 14 }}>
        {searchQuery.data?.results
          ? searchQuery.data.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          : trendingQuery.data?.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </ScrollView>
    </Main>
  );
};

export default Page;
