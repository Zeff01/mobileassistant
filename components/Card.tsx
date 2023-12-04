import React, { ReactNode } from "react";
import { Card } from "expo-ui-kit";

import theme from "../constants/theme";

type CustomCardProps = {
  children?: ReactNode;
};

const CustomCard: React.FC<CustomCardProps> = ({ children, ...props }) => {
  return (
    <Card {...props} theme={theme}>
      {children}
    </Card>
  );
};

export default CustomCard;
