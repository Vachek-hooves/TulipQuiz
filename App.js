import {TulipProvider} from './store/context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import {IntroScreen} from './screen/stack';

function App() {
  return (
    <TulipProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Intro" component={IntroScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TulipProvider>
  );
}

export default App;
