import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { MessageSquare } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2940&auto=format&fit=crop' }}
            style={styles.headerImage}
          />
          <BlurView intensity={80} style={styles.headerContent}>
            <Text style={styles.greeting}>Welcome back, Alex!</Text>
            <Text style={styles.stats}>Today's Progress: 75% Complete</Text>
          </BlurView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Recommendations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cards}>
            <View style={styles.card}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2940&auto=format&fit=crop' }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Morning Workout</Text>
              <Text style={styles.cardDescription}>30 min HIIT session</Text>
            </View>
            <View style={styles.card}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2940&auto=format&fit=crop' }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Lunch Recipe</Text>
              <Text style={styles.cardDescription}>Protein-rich salad bowl</Text>
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.chatButton}>
          <MessageSquare size={24} color="#fff" />
          <Text style={styles.chatButtonText}>Ask FitNut AI</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    height: 200,
    marginBottom: 20,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  greeting: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 5,
  },
  stats: {
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
  cards: {
    flexDirection: 'row',
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  card: {
    width: 200,
    backgroundColor: '#111',
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
    padding: 10,
  },
  cardDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    margin: 20,
    padding: 15,
    borderRadius: 12,
    gap: 10,
  },
  chatButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
});