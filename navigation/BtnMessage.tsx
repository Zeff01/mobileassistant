import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { COLORS } from "../constants";
import { Button, Icon } from "../components";
import { RootStackParamList } from "../types/navigation-types"; // Import your navigation types

// If you have a different navigation structure, modify RootStackParamList accordingly
const BtnMessage: React.FC = (props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Button
      success
      style={{ marginHorizontal: 28 }}
      onPress={() => navigation.navigate("NewMessage")}
      icon={<Icon name="comment" size={16} color={COLORS.white} />}
      {...props}
    />
  );
};

export default BtnMessage;
