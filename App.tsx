import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const App: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('low');
  const [calories, setCalories] = useState<number | null>(null);

  const calculateCalories = () => {
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum)) {
      return;
    }
    const baseCalories = weightNum * 30 + 70;
    const multiplier =
      activityLevel === 'high' ? 1.8 : activityLevel === 'medium' ? 1.5 : 1.2;
    setCalories(baseCalories * multiplier);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dog Calorie Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter dog weight in kg"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <Picker
        selectedValue={activityLevel}
        onValueChange={(itemValue) => setActivityLevel(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Low" value="low" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="High" value="high" />
      </Picker>
      <Button title="Calculate" onPress={calculateCalories} />
      {calories !== null && (
        <Text style={styles.result}>Daily Calories: {calories.toFixed(2)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  result: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default App;