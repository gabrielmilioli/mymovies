import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import SearchResults from "../pages/SearchResults";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: 'Details'
        }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResults}
        options={{
          title: 'Search results'
        }}
      />
    </Stack.Navigator>
  );
}