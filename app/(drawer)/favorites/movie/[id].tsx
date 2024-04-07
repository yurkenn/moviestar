import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import DetailsPage from '@/components/DetailsPage';
import { MediaType } from '@/interfaces/apiResults';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log('id', id);

  return <DetailsPage id={id} mediaType={MediaType.Movie} />;
};

export default Page;
