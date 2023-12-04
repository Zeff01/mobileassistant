import React, { ReactNode, FC } from "react";
import { Utils } from "expo-ui-kit";

import { COLORS } from "../constants";
import { Button, Icon } from "../components";

type BtnOptionsProps = {
  iconColor?: string;
  renderOptions?: () => ReactNode;
} & typeof defaultProps; // Include default props in the type

const defaultProps = {
  iconColor: COLORS.black,
  renderOptions: () => {},
};

const BtnOptions: FC<BtnOptionsProps> = ({
  iconColor,
  renderOptions,
  ...props
}) => {
  return (
    <>
      <Button
        outlined
        color={Utils.rgba(COLORS.gray, 0.2)}
        style={{ marginHorizontal: 28, borderWidth: 2 }}
        icon={<Icon name="options" size={16} color={iconColor} />}
        {...props}
      />
      {renderOptions()}
    </>
  );
};

BtnOptions.defaultProps = defaultProps;

export default BtnOptions;
