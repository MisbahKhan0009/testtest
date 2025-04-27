import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';

type BMICategory = 'Underweight' | 'Normal' | 'Overweight' | 'Obese';

interface BMIResult {
  bmi: number;
  category: BMICategory;
  recommendation: string;
}

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // Convert cm to meters

    if (weightNum > 0 && heightNum > 0) {
      const bmi = weightNum / (heightNum * heightNum);
      let category: BMICategory;
      let recommendation = '';

      if (bmi < 18.5) {
        category = 'Underweight';
        recommendation = 'Focus on increasing caloric intake with nutrient-rich foods and strength training.';
      } else if (bmi < 25) {
        category = 'Normal';
        recommendation = 'Maintain your healthy lifestyle with balanced diet and regular exercise.';
      } else if (bmi < 30) {
        category = 'Overweight';
        recommendation = 'Consider increasing physical activity and maintaining a balanced diet.';
      } else {
        category = 'Obese';
        recommendation = 'Consult with a healthcare provider for a personalized weight management plan.';
      }

      setResult({ bmi, category, recommendation });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>BMI Calculator</Text>
        <Text style={styles.subtitle}>Calculate your Body Mass Index</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            placeholder="Enter weight"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            placeholder="Enter height"
            placeholderTextColor="#666"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={calculateBMI}>
          <Text style={styles.buttonText}>Calculate BMI</Text>
        </TouchableOpacity>

        {result && (
          <BlurView intensity={80} style={styles.resultContainer}>
            <Text style={styles.bmiValue}>{result.bmi.toFixed(1)}</Text>
            <Text style={styles.bmiCategory}>{result.category}</Text>
            <View style={styles.bmiScale}>
              <View style={[styles.scaleSegment, { backgroundColor: '#4ade80' }]} />
              <View style={[styles.scaleSegment, { backgroundColor: '#facc15' }]} />
              <View style={[styles.scaleSegment, { backgroundColor: '#f87171' }]} />
              <View 
                style={[
                  styles.scaleIndicator,
                  { left: `${Math.min(Math.max((result.bmi / 40) * 100, 0), 100)}%` }
                ]}
              />
            </View>
            <Text style={styles.recommendation}>{result.recommendation}</Text>
          </BlurView>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 32,
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#ccc',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    color: '#fff',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6366f1',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  resultContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  bmiValue: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 48,
    color: '#fff',
    marginBottom: 5,
  },
  bmiCategory: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#6366f1',
    marginBottom: 20,
  },
  bmiScale: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 20,
    position: 'relative',
  },
  scaleSegment: {
    flex: 1,
    opacity: 0.5,
  },
  scaleIndicator: {
    position: 'absolute',
    width: 16,
    height: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    top: -4,
    marginLeft: -8,
  },
  recommendation: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 24,
  },
});