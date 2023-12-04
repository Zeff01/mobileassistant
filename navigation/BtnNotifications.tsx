import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { COLORS } from "../constants";
import { Button, Icon } from "../components";
import { RootStackParamList } from "../types/navigation-types"; // Import your navigation types

// If you have a different navigation structure, modify RootStackParamList accordingly
const BtnNotifications: React.FC = (props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Button
      secondary
      style={{ marginHorizontal: 28 }}
      onPress={() => navigation.navigate("Notifications")}
      icon={<Icon name="notification" size={16} color={COLORS.black} />}
      {...props}
    />
  );
};

export default BtnNotifications;
