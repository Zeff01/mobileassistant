import React from "react";
import { StyleSheet, ViewStyle } from "react-native";

import Block from "./Block";
import Text from "./Text";
import Icon from "./Icon";
import { COLORS } from "../constants";

type DropdownProps = {
  label: string;
  style?: ViewStyle;
  transparent?: boolean;
  direction?: "down" | "up";
  color?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  style,
  transparent,
  direction = "down",
  color = COLORS.black,
}) => {
  const rotate = direction === "down" ? "0deg" : "180deg";
  const dropdownStyle = [
    styles.dropdown,
    transparent && { borderColor: "transparent" },
    style,
  ];

  return (
    <Block row center padding={[6, 10]} style={dropdownStyle}>
      <Text medium marginRight={6} color={color}>
        {label}
      </Text>
      <Icon
        size={10}
        color={color}
        name="arrowLight"
        resizeMode="contain"
        style={{ transform: [{ rotate }] }}
      />
    </Block>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdown: {
    borderColor: COLORS.gray,
    borderRadius: 4,
    borderWidth: 2,
  },
});
