import React, { useEffect, useRef } from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import useAuthStore from "../store/auth/authStore";
import BtnSearch from "./BtnSearch";
import BtnBack from "./BtnBack";
import BtnOptions from "./BtnOptions";
import BtnNotifications from "./BtnNotifications";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { NavigationContainerRef } from "@react-navigation/native";

// Import your screens
import {
  SignIn,
  SignUp,
  ResetPassword,
  Search,
  Notifications,
  Comments,
  NewMessage,
  NewEvent,
  NewEventMap,
  Chat,
  Video,
  Friends,
  Account,
  User,
  Settings,
  EditAccount,
  NewStory,
  Home,
  Events,
  NewPost,
  Threads,
  MyProfile,
} from "../screens";
import AiVideo from "../screens/AiModules/AiVideo";

import hasNotch from "../utils/hasNotch";
import { COLORS } from "../constants";
import { Button, Icon, Text } from "../components";
import { getHeaderButtons } from "../utils/helpers";
import { RootStackParamList } from "../types/navigation-types";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

type TabsProps = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
  route: RouteProp<RootStackParamList, "Home">;
};

type HomeScreenProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

type NavigationType = NavigationProp<RootStackParamList>;
type RouteType = RouteProp<RootStackParamList, "Home">;

const HEADER_HEIGHT = hasNotch() ? 122 : 96;
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.lightGray,
    border: "transparent",
    card: COLORS.white,
  },
};

const tabOptions = {
  showLabel: false,
  activeBackgroundColor: COLORS.white,
  inactiveBackgroundColor: COLORS.gray,
  style: {
    backgroundColor: COLORS.primary,
    height: hasNotch() ? 122 : 96,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    alignItems: "center",
    paddingTop: 25,
    // shadow
    shadowRadius: 5,
    shadowOpacity: 0.15,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
    borderWidth: 1,
  },
  tabStyle: {
    borderRadius: 12,
    maxHeight: 38,
    minHeight: 38,
    maxWidth: 38,
    marginHorizontal: 16,
    borderWidth: 1,
  },
};

const authOptions = {
  headerShown: false,
  gestureEnabled: false,
  cardStyle: { backgroundColor: COLORS.white },
};

const screenOptions = {
  gestureEnabled: false,
  headerStyle: {
    height: HEADER_HEIGHT,
    shadowRadius: 5,
    shadowOpacity: 0.15,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    elevation: 1,
  },
  headerTitle: ({ children }: { children: React.ReactNode }) => (
    <Text
      style={{ flex: 1, textAlign: "center" }}
      center
      bold
      caption
      transform="uppercase"
    >
      {children}
    </Text>
  ),
  headerRight: () => <BtnOptions />,
};

const homeScreenOptions = ({ route, navigation }: HomeScreenProps) => ({
  title: "Threads",
  gestureEnabled: false,
  headerStyle: {
    height: HEADER_HEIGHT,
    shadowRadius: 5,
    shadowOpacity: 0.15,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    elevation: 1,
  },
  headerTitle: ({ children }: { children: React.ReactNode }) => (
    <Text center bold caption transform="uppercase">
      {children}
    </Text>
  ),
  headerLeft: () => <BtnSearch />,
  headerRight: () => <BtnNotifications />,
});

function getActiveRouteName(state: any): string {
  const route = state.routes[state.index];
  if (route.state) {
    return getActiveRouteName(route.state);
  }

  return route.name;
}

// Tabs Navigator
const Tabs: React.FC<TabsProps> = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      // headerTitle: (

      //     <Text style={{ textAlign: 'center', alignSelf: 'center' }} bold caption transform="uppercase">
      //         {getHeaderTitle(route)}
      //     </Text>

      // ),
      ...getHeaderButtons({ navigation, route }),
    });
  }, [navigation, route]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? COLORS.primary : COLORS.white;
          switch (route.name) {
            case "Home":
              return (
                <Icon name="home" color={tintColor} resizeMode="contain" />
              );

            case "Events":
              return (
                <Icon name="calendar" color={tintColor} resizeMode="contain" />
              );

            case "NewPost":
              return (
                <Icon name="addPost" color={tintColor} resizeMode="contain" />
              );

            case "Threads":
              return (
                <Icon name="message" color={tintColor} resizeMode="contain" />
              );

            case "MyProfile":
              return (
                <Icon name="user" color={tintColor} resizeMode="contain" />
              );
            case "AiModules":
              return (
                <Icon name="user" color={tintColor} resizeMode="contain" />
              );
          }
        },
      })}
      tabBarOptions={tabOptions}
    >
      <Tab.Screen name="Threads" component={Threads} />
      {/* <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Events" component={Events} />

      <Tab.Screen
        name="NewPost"
        component={NewPost}
        // options={{ style: { shadowOpacity: 0 } }}
      />

      <Tab.Screen name="MyProfile" component={MyProfile} /> */}
    </Tab.Navigator>
  );
};

// Main App Stack Navigator
const MainAppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Tabs} options={homeScreenOptions} />

    {/* <Stack.Screen
      name="Notifications"
      component={Notifications}
      options={(props) => ({
        ...screenOptions,
        ...props,
        headerRight: null,
        headerLeft: ({ onPress }) => (
          <BtnBack onPress={(event) => onPress(event)} />
        ),
      })}
    />
    <Stack.Screen
      name="Friends"
      component={Friends}
      options={(props) => ({
        headerLeft: ({ onPress }) => (
          <BtnBack onPress={(event) => onPress(event)} />
        ),
        ...screenOptions,
        ...props,
      })}
    />
    <Stack.Screen
      name="Settings"
      component={Settings}
      options={(props) => ({
        ...screenOptions,
        ...props,
        headerRight: () => (
          <BtnOptions color="transparent" iconColor={COLORS.gray} />
        ),
        headerLeft: ({ onPress }) => (
          <BtnBack onPress={(event) => onPress(event)} />
        ),
      })}
    />
    <Stack.Screen
      name="Account"
      component={Account}
      options={(props) => ({
        ...screenOptions,
        ...props,
        headerRight: () => (
          <BtnOptions color="transparent" iconColor={COLORS.gray} />
        ),
        headerLeft: ({ onPress }) => (
          <BtnBack onPress={(event) => onPress(event)} />
        ),
      })}
    />
    <Stack.Screen
      name="User"
      component={User}
      options={{
        headerStyle: { height: HEADER_HEIGHT },
        headerRight: () => <BtnOptions iconColor={COLORS.black} />,
        headerLeft: ({ onPress }) => {
          return <BtnBack black onPress={(event) => onPress(event)} />;
        },
      }}
    />
    <Stack.Screen
      name="Search"
      component={Search}
      options={(props) => ({
        ...screenOptions,
        ...props,
        headerRight: null,
        headerLeft: ({ onPress }) => (
          <BtnBack onPress={(event) => onPress(event)} />
        ),
      })}
    />
    <Stack.Screen
      name="Comments"
      component={Comments}
      options={(props) => ({
        ...screenOptions,
        ...props,
        headerRight: null,
        headerLeft: ({ onPress }) => (
          <BtnBack onPress={(event) => onPress(event)} />
        ),
      })}
    />
    <Stack.Screen
      name="NewEvent"
      component={NewEvent}
      options={(props) => ({
        ...screenOptions,
        ...props,
        title: "Add Event",
        headerRight: null,
        headerLeft: ({ onPress }) => (
          <BtnBack onPress={(event) => onPress(event)} />
        ),
      })}
    />
    <Stack.Screen
      name="NewEventMap"
      component={NewEventMap}
      options={(props) => ({
        ...screenOptions,
        ...props,
        title: "Add Location Pin",
        headerRight: null,
        headerLeft: ({ onPress }) => (
          <BtnBack onPress={(event) => onPress(event)} />
        ),
      })}
    /> */}
    <Stack.Screen
      name="NewMessage"
      component={NewMessage}
      options={(props) => ({
        ...screenOptions,
        ...props,
        headerRight: null,
        headerLeft: ({ onPress }) => (
          <BtnBack onPress={(event) => onPress(event)} />
        ),
      })}
    />
    <Stack.Screen
      name="Chat"
      component={Chat}
      options={({ navigation, route }) => ({
        ...screenOptions,
        // ...props,
        headerStyle: {
          ...screenOptions.headerStyle,
          backgroundColor: COLORS.black,
        },
        headerRight: () => (
          <Button
            flex
            style={{
              height: 5,
              padding: 0,
              margin: 15,
              marginRight: 25,
              width: 43,
            }}
            color={COLORS.gray}
            onPress={() => {
              const { assistantData } = route.params;
              navigation?.navigate("AiVideo", {
                assistant: "teacher",
                assistantData: assistantData,
              });
            }}
            icon={<Icon name="play" color={COLORS.white} />}
          />
        ),
        headerLeft: ({ onPress }) => (
          <BtnBack onPress={(event) => onPress(event)} />
        ),
      })}
    />
    {/* <Stack.Screen
      name="Video"
      component={Video}
      options={(props) => ({
        ...screenOptions,
        ...props,
        title: null,
        headerTransparent: true,
        headerRight: null,
        headerLeft: ({ onPress }) => (
          <BtnBack onPress={(event) => onPress(event)} />
        ),
      })}
    />
    <Stack.Screen
      name="EditAccount"
      component={EditAccount}
      options={(props) => ({
        ...screenOptions,
        ...props,
        title: null,
        headerRight: null,
        headerLeft: ({ onPress }) => (
          <BtnBack onPress={(event) => onPress(event)} />
        ),
      })}
    />
    <Stack.Screen
      name="NewStory"
      component={NewStory}
      options={(props) => ({
        ...props,
        headerShown: false,
      })}
    /> */}
    <Stack.Screen
      name="AiVideo"
      component={AiVideo}
      options={(props) => ({
        ...props,
        headerShown: false,
      })}
    />
  </Stack.Navigator>
);

// Auth Stack Navigator
const AuthStack = () => (
  <Stack.Navigator screenOptions={authOptions}>
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="ResetPassword" component={ResetPassword} />
  </Stack.Navigator>
);

// Main Navigation Container
const Navigation: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const { initializeToken } = useAuthStore();
  const navigationRef = useRef<NavigationContainerRef>(null);
  const routeNameRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    initializeToken();
  }, []);

  const isSignedIn = Boolean(token);
  console.log("isSignedIn-", isSignedIn);

  return (
    <NavigationContainer
      theme={theme}
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef?.current?.getCurrentRoute().name;
      }}
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(
          navigationRef.current?.getRootState()
        );

        if (previousRouteName !== currentRouteName) {
          console.log("Current screen:", currentRouteName);
        }

        routeNameRef.current = currentRouteName;
      }}
    >
      {isSignedIn ? <MainAppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
