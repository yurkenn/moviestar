import { Redirect } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const Page = () => {
  return <Redirect href="/(drawer)/home" />;
};

export default Page;

const styles = StyleSheet.create({});
