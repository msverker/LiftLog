import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutScreen from "./screens/WorkoutsScreen";
import ExercisesScreen from "./screens/ExercisesScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Workouts">
        <Stack.Screen name="Workouts" component={WorkoutScreen} />
        <Stack.Screen name="Exercises" component={ExercisesScreen} />
        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );

}
