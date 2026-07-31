import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./src/hooks/useAuthProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomePage from "./src/pages/HomePage";
import DrawerNavigation from "./src/components/Home/Drawer/DrawerNavigate";
import LoginPage from "./src/pages/LoginPage";
import RegistrationPage from "./src/pages/RegistrationPage";
import { View, StyleSheet, ActivityIndicator } from "react-native";
const Stack = createNativeStackNavigator();

// 1. Создаем внутренний компонент навигации, где хук useAuth() БУДЕТ работать
function NavigationContent() {
  const { user, isLoading } = useAuth(); 

  // Пока идет загрузка сессии Firebase — показываем спиннер
if (isLoading || user === undefined) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#57C785" />
    </View>
  );
}

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // Если юзер вошел, ему доступно основное меню приложения
          <Stack.Screen name="Main" component={DrawerNavigation} />
        ) : (
          // Если юзера нет, ему доступны только экраны входа
          <>
            <Stack.Screen name="Welcome" component={HomePage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Registration" component={RegistrationPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// 2. Главный компонент App теперь ПРОСТО дает контекст нашему приложению
export default function App() {
  return (
    <AuthProvider>
      <NavigationContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A7B9B",
  },
});