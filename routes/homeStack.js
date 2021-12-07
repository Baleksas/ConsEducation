import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/Home";
import Geo from "../screens/Geo";

const screens = {
  Home: {
    screen: Home,
  },
  Geo: {
    screen: Geo,
  },
};

const HomeStack = createNativeStackNavigator(screens);

export default createAppContainer(HomeStack);
