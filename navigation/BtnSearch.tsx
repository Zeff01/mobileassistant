import React, { FC } from "react";
import { Utils } from "expo-ui-kit";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../constants";
import { Button, Icon } from "../components";

type BtnSearchProps = {
  // Define any custom props here if needed
};

const BtnSearch: FC<BtnSearchProps> = (props) => {
  const navigation = useNavigation();
  return (
    <Button
      outlined
      color={Utils.rgba(COLORS.gray, 0.2)}
      onPress={() => navigation.navigate("Search")}
      icon={<Icon name="search" size={16} color={COLORS.black} />}
      style={{ marginHorizontal: 28 }}
      {...props}
    />
  );
};

export default BtnSearch;
