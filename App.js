import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import Translate from './screens/Translate';
import Transcribe from './screens/Transcribe';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Halaman Home tanpa header */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        {/* Halaman Translate dengan title khusus */}
        <Stack.Screen
          name="Translate"
          component={Translate}
          options={{ title: 'Translate' }}
        />

        {/* Halaman Transcribe dengan title khusus */}
        <Stack.Screen
          name="Transcribe"
          component={Transcribe}
          options={{ title: 'Transcribe' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
