import {TulipProvider} from './store/context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {IntroScreen} from './screen/stack';
import {AboutTulipsScreen,QuizWelcomeScreen,} from './screen/tab';
import {TulipFestivalScreen,TulipsCaringScreen,TulipsTypesScreen} from './screen/stack';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AboutTulips" component={AboutTulipsScreen} /> 
      <Tab.Screen name="QuizWelcomeScreen" component={QuizWelcomeScreen} />
    </Tab.Navigator>
  );
};


function App() {
  return (
    <TulipProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="TulipFestivalsScreen" component={TulipFestivalScreen} />
          <Stack.Screen name="TulipsCaringScreen" component={TulipsCaringScreen} />
          <Stack.Screen name="TulipsTypesScreen" component={TulipsTypesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TulipProvider>
  );
}

export default App;
