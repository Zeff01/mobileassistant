import React, { ReactNode } from "react";
import { Block } from "expo-ui-kit";
import theme from "../constants/theme";

type CustomBlockProps = {
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  style?: object;
  overflow?: "visible" | "hidden" | "scroll";
  [key: string]: any;
};

const CustomBlock: React.FC<CustomBlockProps> = ({
  children,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  style,
  overflow,
  ...props
}) => {
  const blockStyles = [
    style,
    width && { width },
    height && { height },
    minWidth && { minWidth },
    minHeight && { minHeight },
    maxWidth && { maxWidth },
    maxHeight && { maxHeight },
    overflow && { overflow },
  ];

  return (
    <Block {...props} theme={theme} style={blockStyles}>
      {children}
    </Block>
  );
};

export default CustomBlock;
