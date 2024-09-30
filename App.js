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
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 1000,
        tabBarStyle: {
          backgroundColor: '#4CAF50', // Green color similar to grass
          borderTopWidth: 0,
          elevation: 8, // Android shadow
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          borderRadius: 15,
          height: 60,
        },
        tabBarItemStyle: {
          marginTop: 5,
          marginBottom: 5,
        },
        tabBarActiveTintColor: '#FFFFFF', // White color for active tab
        tabBarInactiveTintColor: '#E0E0E0', // Light grey color for inactive tabs
      }}
    >
      <Tab.Screen name="AboutTulips" component={AboutTulipsScreen} /> 
      <Tab.Screen name="QuizWelcomeScreen" component={QuizWelcomeScreen} />
    </Tab.Navigator>
  );
};


function App() {
  return (
    <TulipProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false,animation:'fade',animationDuration:1000}}>
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
