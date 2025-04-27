import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { BlurView } from 'expo-blur';
import { TrendingUp, TrendingDown, Scale, Dumbbell, Heart } from 'lucide-react-native';

const screenWidth = Dimensions.get('window').width;

type MetricType = 'Weight' | 'Strength' | 'Cardio';

interface Metric {
  type: MetricType;
  title: string;
  value: string;
  change: number;
  unit: string;
  data: number[];
}

export default function ProgressScreen() {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('Weight');

  const metrics: Metric[] = [
    {
      type: 'Weight',
      title: 'Body Weight',
      value: '78.5',
      change: -2.3,
      unit: 'kg',
      data: [82, 81.5, 80.2, 79.8, 79.1, 78.5],
    },
    {
      type: 'Strength',
      title: 'Bench Press',
      value: '85',
      change: 5,
      unit: 'kg',
      data: [70, 72.5, 75, 77.5, 82.5, 85],
    },
    {
      type: 'Cardio',
      title: '5K Time',
      value: '26:30',
      change: -1.5,
      unit: 'min',
      data: [30, 29, 28.5, 27.5, 27, 26.5],
    },
  ];

  const currentMetric = metrics.find((m) => m.type === selectedMetric)!;

  const MetricIcon = {
    Weight: Scale,
    Strength: Dumbbell,
    Cardio: Heart,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.subtitle}>Track your fitness journey</Text>
      </View>

      <View style={styles.metricsContainer}>
        {metrics.map((metric) => {
          const Icon = MetricIcon[metric.type];
          const isSelected = selectedMetric === metric.type;
          const isPositive = metric.change > 0;
          const TrendIcon = isPositive ? TrendingUp : TrendingDown;
          const trendColor = isPositive ? '#4ade80' : '#ef4444';

          return (
            <TouchableOpacity
              key={metric.type}
              style={[styles.metricCard, isSelected && styles.metricCardSelected]}
              onPress={() => setSelectedMetric(metric.type)}
            >
              <Icon size={24} color={isSelected ? '#fff' : '#666'} />
              <View>
                <Text style={[styles.metricValue, isSelected && styles.metricValueSelected]}>
                  {metric.value}
                  <Text style={styles.metricUnit}> {metric.unit}</Text>
                </Text>
                <View style={styles.trendContainer}>
                  <TrendIcon size={16} color={trendColor} />
                  <Text style={[styles.trendText, { color: trendColor }]}>
                    {Math.abs(metric.change)}%
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <BlurView intensity={80} style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{currentMetric.title} Progress</Text>
        <LineChart
          data={{
            labels: ['1M', '2M', '3M', '4M', '5M', '6M'],
            datasets: [{ data: currentMetric.data }],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: 'transparent',
            backgroundGradientFrom: 'transparent',
            backgroundGradientTo: 'transparent',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#6366f1',
            },
          }}
          bezier
          style={styles.chart}
        />
      </BlurView>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Starting Point</Text>
          <Text style={styles.statValue}>
            {currentMetric.data[0]} {currentMetric.unit}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Current</Text>
          <Text style={styles.statValue}>
            {currentMetric.data[currentMetric.data.length - 1]} {currentMetric.unit}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Change</Text>
          <Text style={[styles.statValue, { color: currentMetric.change > 0 ? '#4ade80' : '#ef4444' }]}>
            {currentMetric.change > 0 ? '+' : '-'}
            {Math.abs(currentMetric.data[currentMetric.data.length - 1] - currentMetric.data[0])} {currentMetric.unit}
          </Text>
        </View>
      </View>
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
  metricsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    gap: 10,
  },
  metricCardSelected: {
    backgroundColor: '#6366f1',
  },
  metricValue: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
  },
  metricValueSelected: {
    color: '#fff',
  },
  metricUnit: {
    fontSize: 14,
    color: '#666',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  trendText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  chartContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  chartTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 15,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
});