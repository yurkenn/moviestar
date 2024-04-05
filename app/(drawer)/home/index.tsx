import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Title } from '~/tamagui.config';
import { Card } from 'tamagui';
import { Link } from 'expo-router';

const Page = () => {
  return (
    <View>
      <Title>Home</Title>
      <Link href={'/(drawer)/home/(movie)/1'} asChild>
        <Text>Movie 1</Text>
      </Link>
      <Card>
        <Card.Header>
          <Text>Header</Text>
          <Card.Footer />
          <Card.Background />
        </Card.Header>
      </Card>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
