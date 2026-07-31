import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import WelcomeMark from "../../assets/image/welcomeMark.png";
import WelcomeImg from "../../assets/image/homeimage.png";
import AiInput from "../components/AI/AiInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuthProvider";
import HomeButtons from "../components/Home/HomeButtons";

const HomePage = () => {
  const {user} = useAuth()
  const navigation = useNavigation()


  return (
    <LinearGradient
      style={styles.container}
      colors={["#2A7B9B", "#57C785", "#EDDD53"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, width: "100%" }}
      >
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false} // Исправлено на Vertical
          contentContainerStyle={styles.scrollContainer} // Исправлено на contentContainerStyle
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.innerWrapper}>
              <View style={styles.titleContainer}>
                {user && (
                  <View style={styles.burgerMenuContainer}>
                    <Text style={styles.mainTitle}>
                      Hi {user.displayName} !
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                       navigation.dispatch(DrawerActions.openDrawer())
                      }
                    >
                      <Ionicons
                        name="menu-outline"
                        size={60}
                        color="#ecf6ef"
                        style={{ marginRight: 25 }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {user ? (
                <Image source={WelcomeMark} style={styles.welcomeimgMark} />
              ) : (
                <Image source={WelcomeImg} style={styles.welcomeimg} />
              )}

              {/* Блок инпута / кнопок */}
              <View>{user ? <AiInput /> : <HomeButtons />}</View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A7B9B", // Твой синий фон на время секундной загрузки
  },
  scrollContainer: {
    flexGrow: 1, // Растягивает скролл на всю доступную высоту экрана
  },
  innerWrapper: {
    flex: 1,
    alignItems: "center", // Центрируем всё строго по горизонтали
    paddingTop: 60,
    paddingBottom: 30,
  },
  titleContainer: {
    // alignSelf: "flex-start",
  },
  burgerMenuContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputWrapper: {
    width: "100%",
    alignItems: "center", // Центрируем инпут внутри его контейнера
  },
  mainTitle: {
    fontFamily: "TitleBold",
    fontSize: 20,
    color: "white",
    marginLeft: 30,
  },
  welcomeimgMark: {
    width: 280,
    height: 360,
    resizeMode: "contain",
  },
  welcomeimg: {
    width: 220,
    height: 320,
    resizeMode: "contain", // Картинка не будет искажаться при сжатии экрана
  },
});

export default HomePage;
