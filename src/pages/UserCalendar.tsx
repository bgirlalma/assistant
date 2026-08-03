import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Calendar, } from "react-native-calendars";
import { getUserEvents } from '../userAuth/users';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuthProvider';
import BackupButtom from '../components/userCalendarComponent/BackupButtom'
import DeleteButton from '../components/userCalendarComponent/DeleteButton';

type Event = {
  id: string,
  text: string, 
  time: string,
  eventsDate: string
}

const UserCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    // Если хук еще загружает пользователя из AsyncStorage или пользователя нет — ничего не делаем
    if (authLoading || !user?.uid) {
      return;
    }

    setLoading(true);

    // 👇 Передаем user.uid ПЕРВЫМ аргументом в функцию
    const unsubscribe = getUserEvents(user.uid, (data) => {
      setEvents(data);
      setLoading(false);
    });

    return () => {
      unsubscribe?.();
    };
  }, [user?.uid, authLoading]);

  if (loading || authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <>
        <BackupButtom />
      </>
      <Calendar
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        style={styles.calendarWrapper}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "rgba(255, 255, 255, 1)", // Слегка прозрачный белый фон

          // Цвета заголовков (Месяц и Год)
          monthTextColor: "#0f1aeb", // Твой синий цвет
          textMonthFontFamily: "TitleBold",
          textMonthFontSize: 18,

          // Цвета стрелочек переключения месяцев
          arrowColor: "#0f1aeb",

          // Дни недели (Пн, Вт, Ср...)
          textSectionTitleColor: "#9e0913",
          textDayHeaderFontFamily: "TitleBold",
          textDayHeaderFontSize: 14,

          // Обычные дни месяца
          dayTextColor: "#040404",
          textDayFontFamily: "TitleBold", 
          textDayFontSize: 16,

          // Текущий день (Сегодня)
          todayTextColor: "#f7f6f6",
          todayBackgroundColor: "#b31a38",

          // Заблокированные дни (из другого месяца)
          textDisabledColor: "#bbbbbb",
        }}
      />

      <View style={styles.eventsContainer}>
        <Text style={styles.titleBlockEvent}>Найближчі події</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        {events.map((event) => (
          <View key={event.id} style={styles.event}>
            <View style={styles.removeButton}>
              <Text style={styles.dataEvent}>
                {event.eventsDate?.toDate().toLocaleDateString("uk-UA", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
              <DeleteButton eventId={event.id} />
            </View>

            <Text style={styles.eventText}>{event.text}</Text>
            <Text style={styles.eventCreateData}>
              Дата створення події:{" "}
              {event.time?.toDate().toLocaleString("uk-UA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default UserCalendar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 60,
    backgroundColor: "#2A7B9B",
  },
  calendarWrapper: {
    borderRadius: 15, // Скругляем углы календаря
    elevation: 4, // ТЕНЬ для Android
    shadowColor: "#000", // ТЕНИ для iOS 👇
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden", // Чтобы внутренние элементы не вылезали за скругленные углы
  },
  eventsContainer: {
    marginTop: 20,
  },
  titleBlockEvent: {
    fontFamily: "TitleBold",
    fontSize: 16,
    color: "#f2f4f6",
  },
  event: {
    marginBottom: 10,
    borderRadius: 15,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  removeButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dataEvent: {
    fontFamily: "TitleRegular",
    fontSize: 16,
    color: "#1a1414",
    marginBottom: 10,
  },
  eventText: {
    fontFamily: "TitleRegular",
    fontSize: 16,
    color: "#990808",
    marginBottom: 20,
  },
  eventCreateData: {
    fontFamily: "TitleLight",
    fontSize: 10,
    color: "#3f3e3e",
  },
});