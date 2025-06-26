import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const maturityLevels = [
  { level: 1, name: 'Initial/Ad Hoc', description: 'Processes are unpredictable, poorly controlled, and reactive' },
  { level: 2, name: 'Repeatable but Intuitive', description: 'Processes follow a regular pattern but are not documented' },
  { level: 3, name: 'Defined Process', description: 'Processes are documented and standardized' },
  { level: 4, name: 'Managed and Measurable', description: 'Processes are monitored and measured' },
  { level: 5, name: 'Optimized', description: 'Focus on continuous improvement and optimization' },
];

export default function MaturityLevelsTable() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Maturity Level Definitions</Text>
      <View style={styles.table}>
        {maturityLevels.map((level, index) => (
          <View key={level.level} style={[styles.row, index === maturityLevels.length - 1 && styles.lastRow]}>
            <View style={styles.levelCell}>
              <Text style={styles.levelNumber}>{level.level}</Text>
            </View>
            <View style={styles.contentCell}>
              <Text style={styles.levelName}>{level.name}</Text>
              <Text style={styles.levelDescription}>{level.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    minHeight: 60,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  levelCell: {
    width: 50,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  levelNumber: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#2563EB',
  },
  contentCell: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  levelName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  levelDescription: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 18,
  },
});