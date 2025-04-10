import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { getWorkouts, addWorkout, deleteWorkout } from "../services/api";

const WorkoutScreen = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState("");

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const data = await getWorkouts();
    setWorkouts(data || []);
  };

  const handleAddWorkout = async () => {
    if (!newWorkout.trim()) return;
    const workout = await addWorkout(newWorkout);
    if (workout) {
      setWorkouts([...workouts, workout]);
      setNewWorkout(""); // Clear input field
    }
  };

  const handleDeleteWorkout = async (id) => {
    const success = await deleteWorkout(id);
    if (success) {
      setWorkouts(workouts.filter((workout) => workout.id !== id));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Tracker</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter workout name"
        value={newWorkout}
        onChangeText={setNewWorkout}
      />

      <Button title="Add Workout" onPress={handleAddWorkout} />

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.workoutItem}>
            <Text
              onPress={() => {
                console.log("Navigating to Exercises with workoutId:", item.id, "and title:", item.title);
                navigation.navigate("Exercises", {
                  workoutId: item.id,
                  workoutTitle: item.title, // Add workoutTitle here
                });
              }}
            >
              {item.title}
            </Text>
            <Button title="Delete" onPress={() => handleDeleteWorkout(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  workoutItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default WorkoutScreen;
