import React, { FC, ReactNode } from "react";
import { Text as ExpoUIText,TextProps } from "expo-ui-kit";

import theme from "../constants/theme";

type CustomTextProps = {
  children: ReactNode;
  // Add any other props you expect to pass to Text
};

const CustomText: FC<CustomTextProps & TextProps> = ({ children, ...props }) => {
  return (
    <ExpoUIText theme={theme} {...props}>
      {children}
    </ExpoUIText>
  );
};

export default CustomText;
