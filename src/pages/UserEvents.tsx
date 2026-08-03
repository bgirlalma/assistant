import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackupButtom from "../components/userCalendarComponent/BackupButtom";
import Buttons from "../components/EventsComponent/Buttons";
import { useAuth } from "../hooks/useAuthProvider";
import { getUserEvents } from "../userAuth/users";
import DeleteButton from "../components/userCalendarComponent/DeleteButton";

type Event = {
  id: string;
  text: string;
  time: any;
  eventsDate: any;
};
 type FilterType = "current" | "completed";

const UserEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoading: authLoading } = useAuth();
  const [filter, setFilter] = useState<FilterType>("current");

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

  //find current data
  const today = new Date();
  today.setHours(0,0,0,0)

  // filter list of events
  const filteredEvents = events.filter((event) => {
    if (!event.eventsDate) return false;
    const eventData = event.eventsDate?.toDate()
    eventData.setHours(0, 0, 0, 0)
    
    if (filter === 'current') {
      return eventData >= today
    }

    if (filter === 'completed') {
      return eventData < today
    }

    return true
  });

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
      <>
        <Buttons
          activeFilter={filter}
          onFilterChange={(newFilter) => setFilter(newFilter)}
        />
      </>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.event}>
            <View style={styles.removeButton}>
              <Text>
                {item.eventsDate?.toDate().toLocaleDateString("uk-UA", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
              <DeleteButton eventId={item.id} />
            </View>

            <Text style={styles.eventText}>{item.text}</Text>
            <Text style={styles.eventCreateData}>
              Дата створення події:{" "}
              {item.time?.toDate().toLocaleString("uk-UA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 60,
    backgroundColor: "#2A7B9B",
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

export default UserEvents;
