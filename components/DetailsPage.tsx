import { useQuery } from '@tanstack/react-query';
import { ImageBackground } from 'react-native';
import Animated from 'react-native-reanimated';
import { H1, Main, Paragraph, ScrollView, Text, YStack } from 'tamagui';

import { MediaType } from '@/interfaces/apiResults';
import { getMovieDetails } from '@/services/api';

type DetailsPageProps = {
  id: string;
  mediaType: MediaType;
};
const DetailsPage = ({ id, mediaType }: DetailsPageProps) => {
  const movieQuery = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(+id, mediaType),
  });

  return (
    <Main>
      <ScrollView>
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/w400${movieQuery.data?.backdrop_path}` }}
          resizeMode="cover">
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
