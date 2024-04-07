import { useLocalSearchParams } from 'expo-router';

import DetailsPage from '@/components/DetailsPage';
import { MediaType } from '@/interfaces/apiResults';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log('id', id);

  return <DetailsPage id={id} mediaType={MediaType.Tv} />;
};

export default Page;
