import { Link } from 'expo-router';
import { useMMKVObject } from 'react-native-mmkv';
import Animated from 'react-native-reanimated';
import { ListItem, Main, ScrollView } from 'tamagui';

import { Favorite } from '@/interfaces/favorites';

const Page = () => {
  const [favorites, setFavorites] = useMMKVObject<Favorite[]>('favorites');
  console.log(favorites);

  return (
    <Main>
      <ScrollView>
        {favorites?.map((fav) => (
          <Link key={fav.id} href={`/(drawer)/favorites/${fav.mediaType}/${fav.id}`} asChild>
            <ListItem
              theme="alt2"
              transparent
              p={16}
              fontWeight="bold"
              title={fav.name}
              icon={() => (
                <Animated.Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${fav.thumb}` }}
                  style={{ width: 100, height: 150 }}
                  sharedTransitionTag={`${fav.mediaType === 'movie' ? 'movie' : 'tv'}-${fav.id}`}
                />
              )}
            />
          </Link>
        ))}
      </ScrollView>
    </Main>
  );
};

export default Page;
