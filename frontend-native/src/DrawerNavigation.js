import { createDrawerNavigator } from "react-navigation-drawer";
import GalleryScreen from "./screens/GalleryScreen";
import DrawerScreen from "./screens/DrawerScreen";
import AdvancedView from './screens/AdvancedViewScreen'

//createDrawerNavigation takes in two paramteters, first one, which is route, which is the main screens(movieGallery and AdvancedView). And the second parameter is custom configuration, which we use to make our own custom drawer, in DrawerScreen
const DrawerNavigator = createDrawerNavigator(
  {
    MovieGallery: {
      screen: GalleryScreen,
    },
    AdvancedView: {
      screen: AdvancedView //advanced view screen
    },
  },
    {
      contentComponent: DrawerScreen, //what is shown in the drawer/hamburgermenu/sidebar
      initialRouteName: "MovieGallery"
    }
);

export default DrawerNavigator;
