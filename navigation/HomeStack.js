import React, { useContext } from 'react';
import { View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

//Importing all the screens

import HomeScreen from '../screens/HomeScreen';
import AttendingEventDetailsScreen from '../screens/AttendingEventDetailsScreen';
import EventsScreen from '../screens/EventsScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';

import CreateEventScreen from '../screens/CreateEventScreen';
import ConfirmEventScreen from '../screens/ConfirmEventScreen';
import MyInvitationsScreen from '../screens/MyInvitationsScreen';
import InvitationDetailsScreen from '../screens/InvitationDetailsScreen';

//Creating all the navigators

const HomeScreenStackNavigator = createStackNavigator();
const EventStackNavigator = createStackNavigator();
const ProfileScreenStackNavigator = createStackNavigator();
const MyInvitationsStackNavigator = createStackNavigator();
const ModalStack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

//Stack navigator for the event screens

function EventScreens({ navigation }) {
  return (
    <EventStackNavigator.Navigator>
      <EventStackNavigator.Screen
        name="My Events"
        component={EventsScreen}
        options={{
          headerLeft: () => (
            <Entypo
              name="menu"
              size={30}
              color="black"
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 8 }}
            />
          ),
        }}
      />
      <EventStackNavigator.Screen
        name="Event Details"
        component={EventDetailsScreen}
      />
      <EventStackNavigator.Screen
        name="Create Event"
        component={CreateEventScreen}
      />
      <EventStackNavigator.Screen
        name="Confirm Event"
        component={ConfirmEventScreen}
      />
    </EventStackNavigator.Navigator>
  );
}

//Giving even single screens a stack naviagot so that they have a header and there is no need to make a manual one

function HomeScreenStack({ navigation }) {
  return (
    <HomeScreenStackNavigator.Navigator
      screenOptions={{
        headerLeft: () => (
          <Entypo
            name="menu"
            size={30}
            color="black"
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 8 }}
          />
        ),
      }}>
      <HomeScreenStackNavigator.Screen name="Home" component={HomeScreen} />
      <HomeScreenStackNavigator.Screen
        name="Attending Event Details"
        component={AttendingEventDetailsScreen}
      />
    </HomeScreenStackNavigator.Navigator>
  );
}

function ProfileScreenStack({ navigation }) {
  return (
    <ProfileScreenStackNavigator.Navigator
      screenOptions={{
        headerLeft: () => (
          <Entypo
            name="menu"
            size={30}
            color="black"
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 8 }}
          />
        ),
      }}>
      <ProfileScreenStackNavigator.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </ProfileScreenStackNavigator.Navigator>
  );
}

function MyInvitationsStack({ navigation }) {
  return (
    <MyInvitationsStackNavigator.Navigator
      initialRouteName="My Invitations"
      screenOptions={{
        headerLeft: () => (
          <Entypo
            name="menu"
            size={30}
            color="black"
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 8 }}
          />
        ),
      }}>
      <MyInvitationsStackNavigator.Screen
        name="My Invitations"
        component={MyInvitationsScreen}
      />
      <MyInvitationsStackNavigator.Screen
        name="Invitation Details"
        component={InvitationDetailsScreen}
      />
    </MyInvitationsStackNavigator.Navigator>
  );
}

//Bottom tab navigator to combine all screens or stack navigators that are to be included in the bottom tab navigator

function BottomTabScreens() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={HomeScreenStack} />
      <BottomTab.Screen name="Events" component={EventScreens} />
      <BottomTab.Screen name="Profile" component={ProfileScreenStack} />
    </BottomTab.Navigator>
  );
}

function DrawerScreens() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={BottomTabScreens} />
      <Drawer.Screen name="My Invitations" component={MyInvitationsStack} />
    </Drawer.Navigator>
  );
}

export default function HomeStack() {
  return (
    <ModalStack.Navigator mode="modal" headerMode="none">
      <ModalStack.Screen name="ChatApp" component={DrawerScreens} />
    </ModalStack.Navigator>
  );
}
