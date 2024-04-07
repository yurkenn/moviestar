import { Ionicons } from '@expo/vector-icons';
import { colorTokens } from '@tamagui/themes';
import { Drawer } from 'expo-router/drawer';

const Layout = () => {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerHideStatusBarOnOpen: false,
        drawerActiveBackgroundColor: colorTokens.dark.blue.blue7,
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: {
          marginLeft: -16,
        },
      }}>
      <Drawer.Screen
        name="home"
        options={{
          title: 'Moviestar',
          drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          drawerIcon: ({ color, size }) => <Ionicons name="star" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
};

export default Layout;
