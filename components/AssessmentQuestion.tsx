import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface AssessmentQuestionProps {
  question: string;
  selectedLevel: number;
  onLevelChange: (level: number) => void;
  showDropdown?: boolean;
  onToggleDropdown?: () => void;
}

const RadioButton = ({ selected, onPress, level }: {
  selected: boolean;
  onPress: () => void;
  level: number;
}) => (
  <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
    <View style={[styles.radioOuter, selected && styles.radioSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
    <Text style={[styles.levelNumber, selected && styles.selectedText]}>
      {level}
    </Text>
  </TouchableOpacity>
);

export default function AssessmentQuestion({
  question,
  selectedLevel,
  onLevelChange,
}: AssessmentQuestionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      
      <View style={styles.optionsContainer}>
        {[1, 2, 3, 4, 5].map((level) => (
          <RadioButton
            key={level}
            selected={selectedLevel === level}
            onPress={() => onLevelChange(level)}
            level={level}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  question: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    marginBottom: 20,
    lineHeight: 24,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  radioContainer: {
    alignItems: 'center',
    flex: 1,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  radioSelected: {
    borderColor: '#2563EB',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2563EB',
  },
  levelNumber: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  selectedText: {
    color: '#2563EB',
  },
});