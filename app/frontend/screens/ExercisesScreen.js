import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { addExercise, getExercises, deleteExercise } from "../services/api";

const ExercisesScreen = ({ route }) => {
    const { workoutId, workoutTitle } = route.params;
    const [newExercise, setNewExercise] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetchExercises();
    }
    , []);

    const fetchExercises = async () => {
        const data = await getExercises(workoutId);
        setExercises(data || []);
    }

    const handleAddExercise = async () => {
        if (!newExercise.trim()) return;
        const exercise = await addExercise(workoutId, newExercise, sets, reps);
        if (exercise) {
            setExercises([...exercises, exercise]);
            setNewExercise("");
            setSets("");
            setReps("");
        }
    }

    const handleDeleteExercise = async (id) => {
        const success = await deleteExercise(workoutId, id);
        if (success) {
            setExercises(exercises.filter((exercise) => exercise.id !== id));
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exercises for {workoutTitle}</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter exercise name"
                value={newExercise}
                onChangeText={setNewExercise}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter sets"
                value={sets}
                onChangeText={setSets}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Enter reps"
                value={reps}
                onChangeText={setReps}
                keyboardType="numeric"
            />

            <Button title="Add Exercise" onPress={handleAddExercise} />

            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.exerciseItem}>
                        <Text>{item.title} - {item.sets} sets, {item.reps} reps</Text>
                        <Button title="Delete" onPress={() => handleDeleteExercise(item.id)} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    exerciseItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
});

export default ExercisesScreen;