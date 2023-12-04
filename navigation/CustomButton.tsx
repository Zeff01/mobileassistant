import React, { FC } from "react";
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Icon } from "../components"; // Assuming Icon component import path
import { COLORS } from "../constants";

// Define the prop types for CustomButton
type CustomButtonProps = {
  white?: boolean;
  black?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode; // Assuming the Icon component type, adjust if needed
  style?: StyleProp<ViewStyle>;
};

const CustomButton: FC<CustomButtonProps> = ({
  white = false,
  black = false,
  onPress,
  icon,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: white
            ? COLORS.white
            : black
            ? COLORS.black
            : COLORS.secondary,
        },
        style,
      ]}
      {...props}
    >
      <Icon
        size={12}
        name="arrowLight"
        color={white ? COLORS.black : COLORS.white}
        style={{ transform: [{ rotate: "90deg" }] }}
      />
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 28,
    height: 36,
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
