import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

type FilterType = "current" | "completed";

interface ButtonsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const Buttons = ({activeFilter, onFilterChange} : ButtonsProps) => {
  return (
    <View style={styles.container}>
          <TouchableOpacity style={[styles.current, activeFilter === 'current' && styles.activeButton]} onPress={() => onFilterChange('current')}><Text style={[styles.text, activeFilter === 'current' && styles.activeText]}>Current</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.completed, activeFilter === 'completed' && styles.activeButton]} onPress={() => onFilterChange('completed')}><Text style={[styles.text, activeFilter === 'completed' && styles.activeText]}>Completed</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 15,
  },
  current: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "rgba(218, 244, 52, 0.3)",
    alignItems: "center",
  },
  completed: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "rgba(218, 244, 52, 0.3)",
    alignItems: "center",
  },
  activeButton: { backgroundColor: "#ae1414" },
  text: {
    color: "#fff",
    fontWeight: 600,
  },
  activeText: { color: "#d6dfda" },
});

export default Buttons