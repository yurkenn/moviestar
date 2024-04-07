import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { ImageBackground } from 'react-native';
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv';
import Animated from 'react-native-reanimated';
import { Button, H1, Main, Paragraph, ScrollView, Text, YStack, useTheme } from 'tamagui';

import { MediaType } from '@/interfaces/apiResults';
import { Favorite } from '@/interfaces/favorites';
import { getMovieDetails } from '@/services/api';

type DetailsPageProps = {
  id: string;
  mediaType: MediaType;
};
const DetailsPage = ({ id, mediaType }: DetailsPageProps) => {
  const theme = useTheme();
  const [isFavorite, setIsFavorite] = useMMKVBoolean(`${mediaType}-${id}`);
  const [favorites, setFavorites] = useMMKVObject<Favorite[]>('favorites');

  const movieQuery = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(+id, mediaType),
  });

  const toggleFavorite = () => {
    const current = favorites || [];
    if (!isFavorite) {
      setFavorites([
        ...current,
        {
          id: +id,
          mediaType,
          name: movieQuery.data?.title || movieQuery.data?.name,
          thumb: movieQuery.data?.poster_path || movieQuery.data?.backdrop_path,
        },
      ]);
      setIsFavorite(true);
    } else {
      setFavorites(current.filter((fav) => fav.id !== +id));
      setIsFavorite(false);
    }
  };

  return (
    <Main>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              unstyled
              onPress={toggleFavorite}
              scale={0.9}
              hoverStyle={{ scale: 0.925 }}
              pressStyle={{ scale: 0.975 }}
              animation="bouncy">
              <Ionicons
                size={24}
                color={theme.blue9.get()}
                name={isFavorite ? 'heart' : 'heart-outline'}
              />
            </Button>
          ),
        }}
      />
      <ScrollView>
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/w500${movieQuery.data?.backdrop_path}` }}>
          <Animated.Image
            borderRadius={10}
            source={{ uri: `https://image.tmdb.org/t/p/w400${movieQuery.data?.poster_path}` }}
            style={{ width: 200, height: 300, margin: 20 }}
            sharedTransitionTag={`${mediaType === 'movie' ? 'movie' : 'tv'}-${id}`}
          />
        </ImageBackground>
        <YStack
          animation="lazy"
          enterStyle={{
            opacity: 0,
            y: 10,
          }}
          p={10}>
          <H1 color="$blue7">
            {movieQuery.data?.title || movieQuery.data?.name}
            <Text fontSize={16}>
              {new Date(
                movieQuery.data?.release_date || movieQuery.data?.first_air_date!
              ).getFullYear()}
            </Text>
          </H1>
          <Paragraph theme="alt2">{movieQuery.data?.tagline}</Paragraph>
          <Text fontSize={16}>{movieQuery.data?.overview}</Text>
        </YStack>
      </ScrollView>
    </Main>
  );
};

export default DetailsPage;
