/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
 import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ColorSchemeName, Pressable } from 'react-native';
import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import "firebase/auth";
import {getDatabase, ref, onValue,} from "firebase/database";
import  "firebase/firestore";
import  "firebase/functions";
import "firebase/storage";

import useColorScheme from '../hooks/useColorScheme';

import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { AppRegistry, Platform } from 'react-native';
import App from '../App';
AppRegistry.registerComponent('App', () => App);


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  
  useEffect(() => {
    
    const firebaseConfig = {
      apiKey: "AIzaSyCoqwBbJvccRpb6sj6QO4AB1CxWECPJj3k",
      authDomain: "garden-4ffef.firebaseapp.com",
      databaseURL: "https://garden-4ffef-default-rtdb.firebaseio.com",
      projectId: "garden-4ffef",
      storageBucket: "garden-4ffef.appspot.com",
      messagingSenderId: "513818263876",
      appId: "1:513818263876:web:a2ac69b11e818683b05711",
      measurementId: "G-31DJ97FS78"
    };
  
    const app = initializeApp(firebaseConfig);
    
  }, [])
  
  
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
     
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      
      screenOptions={{
        headerShown: false,
     
      //   showLabel: false,
      //   style:{
        
      //   position:'absolute',
      //   bottom:25,
      //   left:20,
      //   right:20,
      //   elevation:0,
      //   backgroundColor:'red',
      //   borderRadius:15,
      //   height:90
      // },
      
       
      
        tabBarActiveTintColor:'blue',
        tabBarInactiveTintColor:'black'
    }}
    
    >
      <Tab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={() => ({
          title: 'Manual',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
         
        })}
      />
      <Tab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Auto',
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
