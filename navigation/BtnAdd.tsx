import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Button, Icon } from "../components";
import { COLORS } from "../constants";

// Define an interface for the component's props
// Include any other specific props that your Button component accepts
interface BtnAddProps {
  screen: string;
  [key: string]: any; // This allows for additional props that the Button component might accept
}

const BtnAdd: React.FC<BtnAddProps> = (props) => {
  const navigation = useNavigation();

  return (
    <Button
      success
      style={{ marginHorizontal: 28 }}
      onPress={() => navigation.navigate(props.screen)}
      icon={<Icon name="plus" size={16} color={COLORS.white} />}
      {...props}
    />
  );
};

export default BtnAdd;
