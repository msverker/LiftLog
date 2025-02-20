import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TextInput, StyleSheet } from "react-native";
import { getWorkouts, createWorkout} from "@/services/api";

const WorkoutsScreen = () => {
    const [workouts, setWorkouts] = useState([]);
    const [newWorkout, setNewWorkout] = useState("");

    useEffect(() => {
        fetchWorkouts();
    }, []);
    
    const fetchWorkouts = async () => {
        const data = await getWorkouts();
        setWorkouts(data);
    }

    const handleAddWorkout = async () => {
        if (!newWorkout.trim()) return;
        await createWorkout(newWorkout);
        setNewWorkout("");
        fetchWorkouts();
    }

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Workouts</Text>
          <FlatList
            data={workouts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Text style={styles.workout}>{item.title}</Text>}
          />
          <TextInput
            style={styles.input}
            placeholder="New Workout Title"
            value={newWorkout}
            onChangeText={setNewWorkout}
          />
          <Button title="Add Workout" onPress={handleAddWorkout} />
        </View>
      );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    workout: { fontSize: 18, marginBottom: 5 },
    input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 },
  });

  export default WorkoutsScreen;