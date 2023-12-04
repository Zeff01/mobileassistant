import React from "react";

import { Button, Icon } from "../components";
import { COLORS } from "../constants";

// Define the interface for the component's props
interface BtnBackProps {
  white?: boolean;
  black?: boolean;
  [key: string]: any; // This allows for additional props that the Button component might accept
}

const BtnBack: React.FC<BtnBackProps> = ({
  white = false,
  black = false,
  ...props
}) => {
  return (
    <Button
      white={white}
      black={black}
      secondary={!white && !black}
      style={{ marginHorizontal: 28 }}
      icon={
        <Icon
          size={12}
          name="arrowLight"
          color={white ? COLORS.black : COLORS.white}
          style={{ transform: [{ rotate: "90deg" }] }}
        />
      }
      {...props}
    />
  );
};

export default BtnBack;
