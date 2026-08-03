import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import WelcomePage from '../../../pages/HomePage';
import UserCalendar from '../../../pages/UserCalendar';
import UserEvents from '../../../pages/UserEvents';
import { View } from "react-native";
import LogoutButton from "../LogoutButton";
import HomePage from "../../../pages/HomePage";
import UserSetting from "../../../pages/UserSetting";

const Drawer = createDrawerNavigator()

 export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerStyle: {
          width: "60%", // 👈 как ты хочешь (больше половины)
        },
      }}
      drawerContent={(props) => (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <DrawerItemList {...props} />
          </View>
          <LogoutButton />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen name="Додати подію" component={HomePage} />
      <Drawer.Screen name="Календар" component={UserCalendar} />
      <Drawer.Screen name="Події" component={UserEvents} />
      <Drawer.Screen name="Налаштування" component={UserSetting} />
    </Drawer.Navigator>
  );
}