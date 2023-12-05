import React from "react";
import { RouteProp } from "@react-navigation/native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation-types";
// navigation buttons
import BtnSearch from "../navigation/BtnSearch";
import BtnAdd from "../navigation/BtnAdd";
import BtnNotifications from "../navigation/BtnNotifications";
import BtnMessage from "../navigation/BtnMessage";
import BtnOptions from "../navigation/BtnOptions";

// Type for route prop
type HeaderButtonRouteProp = RouteProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export const getHeaderTitle = (route: HeaderButtonRouteProp): string => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Events":
      return "Events";
    case "Threads":
      return "Threads";
    default:
      return "Home"; // Default case to handle any other routes
  }
};

export const getHeaderButtons = (route: HeaderButtonRouteProp) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Threads";

  switch (routeName) {
    case "Home":
      return {
        headerShown: true,
        headerLeft: () => <BtnSearch />,
        headerRight: () => <BtnNotifications />,
      };
    case "Events":
      return {
        headerShown: true,
        headerLeft: () => <BtnSearch />,
        headerRight: () => <BtnAdd screen="NewEvent" />,
      };
    case "Threads":
      return {
        headerShown: true,
        headerLeft: () => <BtnSearch />,
        headerRight: () => <BtnMessage />,
      };
    case "MyProfile":
      return {
        headerShown: false,
        headerRight: () => <BtnOptions />,
      };
    case "NewPost":
      return {
        headerShown: false,
      };
    default:
      return {}; // Default case to handle any other routes
  }
};
