import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { Scale, Dumbbell, Timer, Check } from 'lucide-react-native';

type GoalCategory = 'Weight Loss' | 'Muscle Gain' | 'Endurance';

interface Goal {
  id: number;
  category: GoalCategory;
  title: string;
  target: string;
  progress: number;
  deadline: string;
}

export default function GoalsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<GoalCategory>('Weight Loss');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/goals');
      if (!response.ok) throw new Error('Failed to fetch goals');
      const data: Goal[] = await response.json();
      setGoals(data);
    } catch (error) {
      console.error('Error fetching goals:', error);
      Alert.alert('Error', 'Failed to load goals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1, // Replace with actual user ID from auth context
          goal_type: selectedCategory,
          target_value: '0',
          start_date: new Date().toISOString(),
          target_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }),
      });

      if (!response.ok) throw new Error('Failed to add goal');
void fetchGoals();
    } catch (error) {
      console.error('Error adding goal:', error);
      Alert.alert('Error', 'Failed to add goal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateGoalStatus = async (goalId: number, status: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/goals/${goalId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update goal status');
      await fetchGoals();
    } catch (error) {
      console.error('Error updating goal status:', error);
      Alert.alert('Error', 'Failed to update goal status. Please try again.');
    }
  };

  const filteredGoals = goals.filter((goal) => goal.category === selectedCategory);

  const CategoryIcon: Record<GoalCategory, any> = {
    'Weight Loss': Scale,
    'Muscle Gain': Dumbbell,
    'Endurance': Timer,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fitness Goals</Text>
        <Text style={styles.subtitle}>Track your progress</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        {Object.keys(CategoryIcon).map((category) => {
          const Icon = CategoryIcon[category as GoalCategory];
          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category as GoalCategory)}
            >
              <Icon
                size={20}
                color={selectedCategory === category ? '#fff' : '#666'}
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.goalsContainer}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : filteredGoals.length === 0 ? (
          <Text style={styles.noGoalsText}>No goals found for this category.</Text>
        ) : (
          filteredGoals.map((goal) => (
            <BlurView
              key={goal.id}
              intensity={80}
              style={styles.goalCard}
              onLongPress={() =>
                handleUpdateGoalStatus(
                  goal.id,
                  goal.progress >= 100 ? 'in_progress' : 'completed'
                )
              }
            >
              <View style={styles.goalHeader}>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                <Text style={styles.goalTarget}>{goal.target}</Text>
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${goal.progress}%` },
                      goal.progress >= 100 && styles.progressComplete,
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>{goal.progress}%</Text>
              </View>

              <View style={styles.goalFooter}>
                <Text style={styles.deadline}>{goal.deadline}</Text>
                {goal.progress >= 100 && (
                  <View style={styles.completeBadge}>
                    <Check size={12} color="#fff" />
                    <Text style={styles.completeText}>Complete</Text>
                  </View>
                )}
              </View>
            </BlurView>
          ))
        )}
      </View>

      <TouchableOpacity
        style={[styles.addButton, loading && styles.addButtonDisabled]}
        onPress={handleAddGoal}
        disabled={loading}
      >
        <Text style={styles.addButtonText}>
          {loading ? 'Adding...' : 'Add New Goal'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
    paddingTop: 60,
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
  categoryContainer: {
    marginBottom: 20,
  },
  categoryContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    gap: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#6366f1',
  },
  categoryText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  categoryTextActive: {
    color: '#fff',
  },
  goalsContainer: {
    padding: 20,
    gap: 15,
  },
  goalCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    overflow: 'hidden',
  },
  goalHeader: {
    marginBottom: 15,
  },
  goalTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  goalTarget: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#222',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  progressComplete: {
    backgroundColor: '#4ade80',
  },
  progressText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#fff',
    width: 45,
    textAlign: 'right',
  },
  goalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deadline: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  completeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4ade80',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    gap: 4,
  },
  completeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#6366f1',
    margin: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#a5b4fc',
    opacity: 0.7,
  },
  addButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  noGoalsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});