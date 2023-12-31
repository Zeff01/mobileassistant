import React, { ReactNode } from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Button, ButtonProps } from "expo-ui-kit";

import theme from "../constants/theme";

type CustomButtonProps = {
  children?: ReactNode;
  icon?: ReactNode;
  haptic?: boolean;
  onPress?: (event: any) => void; // Replace 'any' with a more specific type if necessary
  style?: StyleProp<ViewStyle>;
};

const CustomButton: React.FC<CustomButtonProps & ButtonProps> = ({
  children,
  icon,
  haptic = true,
  onPress = () => {},
  style,
  ...props
}) => {
  const content = icon || children;

  const btnStyle: StyleProp<ViewStyle> = StyleSheet.flatten([
    styles.button,
    icon && styles.icon,
    props.style,
  ]);

  const handlePress = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | GestureResponderEvent) => {
      if (haptic) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      onPress(event);
    },
    [haptic, onPress]
  );

  return (
    <Button {...props} onPress={handlePress} theme={theme} style={btnStyle}>
      {content}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.SIZES.radius,
    height: theme.SIZES.base * 7.25,
    minHeight: "auto",
  },
  icon: {
    alignItems: "center",
    height: theme.SIZES.base * 4.75,
    justifyContent: "center",
    width: theme.SIZES.base * 4.75,
  },
});

export default CustomButton;
