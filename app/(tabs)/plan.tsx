import { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { Clock, Dumbbell, Flame, ChevronRight, X, Utensils, Timer, ChartBar as BarChart3 } from 'lucide-react-native';

const workoutPlans = [
  {
    id: 1,
    title: 'Full Body Power',
    duration: '45 min',
    calories: '400',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=2940&auto=format&fit=crop',
    description: 'A comprehensive full-body workout designed to build strength and endurance.',
    exercises: [
      { name: 'Barbell Squats', sets: '4 sets × 12 reps', rest: '90 sec' },
      { name: 'Bench Press', sets: '4 sets × 10 reps', rest: '90 sec' },
      { name: 'Bent Over Rows', sets: '3 sets × 12 reps', rest: '60 sec' },
      { name: 'Shoulder Press', sets: '3 sets × 12 reps', rest: '60 sec' },
      { name: 'Romanian Deadlifts', sets: '3 sets × 12 reps', rest: '90 sec' },
    ],
    tips: [
      'Warm up properly before starting',
      'Focus on form over weight',
      'Stay hydrated throughout',
      'Stretch after completion',
    ],
  },
  {
    id: 2,
    title: 'HIIT Cardio Blast',
    duration: '30 min',
    calories: '350',
    difficulty: 'Advanced',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=2940&auto=format&fit=crop',
    description: 'High-intensity interval training to maximize calorie burn and improve cardiovascular fitness.',
    exercises: [
      { name: 'Burpees', sets: '45 sec work / 15 sec rest', rest: '30 sec' },
      { name: 'Mountain Climbers', sets: '45 sec work / 15 sec rest', rest: '30 sec' },
      { name: 'Jump Squats', sets: '45 sec work / 15 sec rest', rest: '30 sec' },
      { name: 'High Knees', sets: '45 sec work / 15 sec rest', rest: '30 sec' },
    ],
    tips: [
      'Maintain high intensity during work periods',
      'Take full rest periods',
      'Modify exercises if needed',
      'Keep proper form even when tired',
    ],
  },
  {
    id: 3,
    title: 'Core Strength',
    duration: '25 min',
    calories: '200',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2940&auto=format&fit=crop',
    description: 'Focus on building core strength and stability with this targeted ab workout.',
    exercises: [
      { name: 'Plank Hold', sets: '3 sets × 45 sec', rest: '45 sec' },
      { name: 'Russian Twists', sets: '3 sets × 20 reps', rest: '45 sec' },
      { name: 'Bicycle Crunches', sets: '3 sets × 30 sec', rest: '45 sec' },
      { name: 'Dead Bug', sets: '3 sets × 12 reps', rest: '45 sec' },
    ],
    tips: [
      'Engage core throughout all exercises',
      'Breathe steadily and consistently',
      'Quality over quantity',
      'Keep lower back pressed to the ground',
    ],
  },
];

const mealPlans = [
  {
    id: 1,
    title: 'High Protein Breakfast',
    calories: '450',
    protein: '35g',
    image: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?q=80&w=2940&auto=format&fit=crop',
    description: 'Start your day with this protein-rich breakfast to fuel your morning workouts.',
    ingredients: [
      '3 large eggs',
      '100g Greek yogurt',
      '1 cup mixed berries',
      '1/4 avocado',
      '2 slices whole grain toast',
    ],
    nutrition: {
      carbs: '45g',
      fats: '20g',
      fiber: '8g',
    },
    instructions: [
      'Scramble eggs with a pinch of salt and pepper',
      'Toast bread until golden brown',
      'Serve with sliced avocado on toast',
      'Add yogurt and berries on the side',
    ],
  },
  {
    id: 2,
    title: 'Lean Lunch Bowl',
    calories: '550',
    protein: '40g',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2940&auto=format&fit=crop',
    description: 'A balanced bowl packed with lean protein and colorful vegetables.',
    ingredients: [
      '150g grilled chicken breast',
      '1 cup quinoa',
      '2 cups mixed greens',
      '1/2 cup cherry tomatoes',
      '1/4 cup hummus',
    ],
    nutrition: {
      carbs: '55g',
      fats: '18g',
      fiber: '12g',
    },
    instructions: [
      'Cook quinoa according to package instructions',
      'Grill chicken with herbs and spices',
      'Assemble bowl with greens as base',
      'Top with sliced chicken and vegetables',
      'Drizzle with olive oil and lemon juice',
    ],
  },
  {
    id: 3,
    title: 'Protein-Packed Dinner',
    calories: '650',
    protein: '45g',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=2940&auto=format&fit=crop',
    description: 'A satisfying dinner with lean protein and complex carbohydrates.',
    ingredients: [
      '200g salmon fillet',
      '1 cup brown rice',
      '2 cups broccoli',
      '1 tbsp olive oil',
      'Lemon and herbs',
    ],
    nutrition: {
      carbs: '65g',
      fats: '25g',
      fiber: '8g',
    },
    instructions: [
      'Season salmon with herbs and lemon',
      'Bake salmon at 400°F for 12-15 minutes',
      'Steam broccoli until tender-crisp',
      'Serve with brown rice and lemon wedges',
    ],
  },
];

export default function PlanScreen() {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const WorkoutModal = ({ workout, visible, onClose }) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <BlurView intensity={80} style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#fff" />
          </TouchableOpacity>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image source={{ uri: workout.image }} style={styles.modalImage} />
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{workout.title}</Text>
              <Text style={styles.modalDifficulty}>{workout.difficulty}</Text>
              
              <View style={styles.modalStats}>
                <View style={styles.modalStat}>
                  <Clock size={20} color="#6366f1" />
                  <Text style={styles.modalStatText}>{workout.duration}</Text>
                </View>
                <View style={styles.modalStat}>
                  <Flame size={20} color="#6366f1" />
                  <Text style={styles.modalStatText}>{workout.calories} cal</Text>
                </View>
              </View>
            </View>

            <Text style={styles.modalDescription}>{workout.description}</Text>

            <Text style={styles.modalSectionTitle}>Exercises</Text>
            {workout.exercises.map((exercise, index) => (
              <View key={index} style={styles.exerciseItem}>
                <Dumbbell size={20} color="#6366f1" />
                <View style={styles.exerciseDetails}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseInfo}>{exercise.sets} • {exercise.rest} rest</Text>
                </View>
              </View>
            ))}

            <Text style={styles.modalSectionTitle}>Tips</Text>
            {workout.tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Text style={styles.tipText}>• {tip}</Text>
              </View>
            ))}
          </ScrollView>
        </BlurView>
      </View>
    </Modal>
  );

  const MealModal = ({ meal, visible, onClose }) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <BlurView intensity={80} style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#fff" />
          </TouchableOpacity>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image source={{ uri: meal.image }} style={styles.modalImage} />
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{meal.title}</Text>
              
              <View style={styles.modalStats}>
                <View style={styles.modalStat}>
                  <Flame size={20} color="#6366f1" />
                  <Text style={styles.modalStatText}>{meal.calories} cal</Text>
                </View>
                <View style={styles.modalStat}>
                  <BarChart3 size={20} color="#6366f1" />
                  <Text style={styles.modalStatText}>{meal.protein} protein</Text>
                </View>
              </View>
            </View>

            <Text style={styles.modalDescription}>{meal.description}</Text>

            <View style={styles.nutritionCard}>
              <Text style={styles.modalSectionTitle}>Nutrition Facts</Text>
              <View style={styles.nutritionGrid}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>Protein</Text>
                  <Text style={styles.nutritionValue}>{meal.protein}</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>Carbs</Text>
                  <Text style={styles.nutritionValue}>{meal.nutrition.carbs}</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>Fats</Text>
                  <Text style={styles.nutritionValue}>{meal.nutrition.fats}</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>Fiber</Text>
                  <Text style={styles.nutritionValue}>{meal.nutrition.fiber}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.modalSectionTitle}>Ingredients</Text>
            {meal.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Utensils size={20} color="#6366f1" />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}

            <Text style={styles.modalSectionTitle}>Instructions</Text>
            {meal.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <Text style={styles.instructionText}>{index + 1}. {instruction}</Text>
              </View>
            ))}
          </ScrollView>
        </BlurView>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2940&auto=format&fit=crop' }}
          style={StyleSheet.absoluteFill}
        />
        <BlurView intensity={80} style={styles.headerContent}>
          <Text style={styles.title}>Your Fitness Plan</Text>
          <Text style={styles.subtitle}>Personalized workouts and nutrition</Text>
        </BlurView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Workouts</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
          {workoutPlans.map((workout) => (
            <TouchableOpacity 
              key={workout.id} 
              style={styles.workoutCard}
              onPress={() => setSelectedWorkout(workout)}
            >
              <Image source={{ uri: workout.image }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{workout.title}</Text>
                <Text style={styles.cardDifficulty}>{workout.difficulty}</Text>
                <View style={styles.cardStats}>
                  <View style={styles.stat}>
                    <Clock size={16} color="#6366f1" />
                    <Text style={styles.statText}>{workout.duration}</Text>
                  </View>
                  <View style={styles.stat}>
                    <Flame size={16} color="#6366f1" />
                    <Text style={styles.statText}>{workout.calories} cal</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meal Plan</Text>
        {mealPlans.map((meal) => (
          <TouchableOpacity 
            key={meal.id} 
            style={styles.mealCard}
            onPress={() => setSelectedMeal(meal)}
          >
            <Image source={{ uri: meal.image }} style={styles.mealImage} />
            <View style={styles.mealContent}>
              <View>
                <Text style={styles.mealTitle}>{meal.title}</Text>
                <Text style={styles.mealStats}>{meal.calories} cal • {meal.protein} protein</Text>
              </View>
              <ChevronRight size={20} color="#666" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {selectedWorkout && (
        <WorkoutModal
          workout={selectedWorkout}
          visible={!!selectedWorkout}
          onClose={() => setSelectedWorkout(null)}
        />
      )}

      {selectedMeal && (
        <MealModal
          meal={selectedMeal}
          visible={!!selectedMeal}
          onClose={() => setSelectedMeal(null)}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    height: 200,
    marginBottom: 20,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 32,
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#ccc',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
  },
  scrollContainer: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  workoutCard: {
    width: 280,
    backgroundColor: '#111',
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  cardDifficulty: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6366f1',
    marginBottom: 10,
  },
  cardStats: {
    flexDirection: 'row',
    gap: 15,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  mealCard: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
  },
  mealImage: {
    width: 80,
    height: 80,
  },
  mealContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  mealTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  mealStats: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    marginTop: 60,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  modalHeader: {
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 5,
  },
  modalDifficulty: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6366f1',
    marginBottom: 10,
  },
  modalStats: {
    flexDirection: 'row',
    gap: 20,
  },
  modalStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalStatText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#fff',
  },
  modalDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
    lineHeight: 24,
  },
  modalSectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
    marginTop: 10,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    gap: 15,
  },
  exerciseDetails: {
    flex: 1,
  },
  exerciseName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  exerciseInfo: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  tipItem: {
    marginBottom: 10,
  },
  tipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#ccc',
    lineHeight: 24,
  },
  nutritionCard: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  nutritionItem: {
    width: '45%',
  },
  nutritionLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  nutritionValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 10,
  },
  ingredientText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#ccc',
  },
  instructionItem: {
    marginBottom: 10,
  },
  instructionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#ccc',
    lineHeight: 24,
  },
});