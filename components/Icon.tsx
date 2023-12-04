import React from "react";
import {
  Animated,
  Image,
  StyleSheet,
  StyleProp,
  ImageStyle,
} from "react-native";
import { icons, COLORS } from "../constants";

interface IconProps {
  name: keyof typeof icons;
  size?: number;
  height?: number;
  width?: number;
  animated?: boolean;
  color?: string;
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
  style?: StyleProp<ImageStyle>;
}

export default ({
  name,
  size,
  height,
  width,
  animated = false,
  color = COLORS.white,
  resizeMode = "contain",
  style,
  ...props
}: IconProps) => {
  // Ensure width and height are numbers
  const iconStyles = StyleSheet.flatten<ImageStyle>([
    styles.icon,
    size ? { width: size, height: size } : undefined,
    typeof width === "number" ? { width } : undefined,
    typeof height === "number" ? { height } : undefined,
    color !== "none" ? { tintColor: color } : undefined,
    style,
  ]);

  if (animated) {
    return (
      <Animated.Image
        source={icons[name]}
        resizeMode={resizeMode}
        style={iconStyles as any}
        {...props}
      />
    );
  }

  return (
    <Image
      source={icons[name]}
      resizeMode={resizeMode}
      style={iconStyles}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 18,
    width: 18,
  },
});
