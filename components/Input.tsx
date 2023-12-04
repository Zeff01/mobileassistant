import React, { useState, ReactNode } from "react";
import { TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { Input, Block } from "expo-ui-kit";

import Icon from "./Icon";
import { theme, COLORS } from "../constants";

type TogglePasswordProps = {
  value: boolean;
  onPress: () => void;
};

const TogglePassword: React.FC<TogglePasswordProps> = ({ value, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ position: "absolute", right: 15, top: 15 }}
    >
      <Icon size={18} color={COLORS.gray} name={value ? "eye" : "eyeClosed"} />
    </TouchableOpacity>
  );
};

type ValidProps = {
  value: string;
  validation?: boolean;
  pattern?: string | RegExp;
  secureTextEntry?: boolean;
};

const Valid: React.FC<ValidProps> = ({
  value,
  validation,
  pattern,
  secureTextEntry,
}) => {
  const isValid = !pattern || !value || secureTextEntry;
  if (isValid) return null;

  return (
    <Icon
      size={18}
      name={validation ? "checkCircle" : "closeCircle"}
      color={validation ? COLORS.success : COLORS.error}
      style={{ position: "absolute", right: 15, top: 15 }}
    />
  );
};

type CustomInputProps = {
  flex?: number;
  children?: ReactNode;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  validation?: boolean;
  value?: string;
  [key: string]: any; // For additional props passed to Input component
};

const CustomInput: React.FC<CustomInputProps> = ({
  flex = 1,
  children,
  icon,
  style,
  value,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(
    Boolean(props.secureTextEntry)
  );
  const hasSpecialProps = Object.keys(props).some((p) =>
    ["secureTextEntry", "validation"].includes(p)
  );

  const inputStyles: StyleProp<ViewStyle> = [
    { height: 48 },
    hasSpecialProps && { paddingRight: 30 },
    style,
  ];

  return (
    <Block flex={flex}>
      <Input
        theme={theme}
        {...props}
        style={inputStyles}
        secureTextEntry={showPassword}
        value={value} // Pass value to the Input component
      />
      {props.secureTextEntry && (
        <TogglePassword
          value={showPassword}
          onPress={() => setShowPassword(!showPassword)}
        />
      )}
      <Valid value={value || ""} {...props} /> // Ensure value is passed to
      Valid
      {icon}
    </Block>
  );
};

export default CustomInput;