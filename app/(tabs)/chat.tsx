import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Send, Bot, User, Shield, TriangleAlert as AlertTriangle, FileText, Clock } from 'lucide-react-native';
import UnifiedHeader from '@/components/UnifiedHeader';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'quick-action' | 'assessment';
}

const MessageBubble = ({ message }: { message: Message }) => (
  <View style={[styles.messageBubble, message.isUser ? styles.userBubble : styles.botBubble]}>
    <View style={styles.messageHeader}>
      {message.isUser ? (
        <User color="#FFFFFF" size={16} />
      ) : (
        <Bot color="#2563EB" size={16} />
      )}
      <Text style={[styles.messageTime, message.isUser ? styles.userTime : styles.botTime]}>
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
    <Text style={[styles.messageText, message.isUser ? styles.userText : styles.botText]}>
      {message.text}
    </Text>
  </View>
);

const QuickActionCard = ({ title, description, icon: Icon, color, onPress }: any) => (
  <TouchableOpacity style={[styles.quickActionCard, { borderLeftColor: color }]} onPress={onPress}>
    <View style={[styles.quickActionIcon, { backgroundColor: color + '20' }]}>
      <Icon color={color} size={20} />
    </View>
    <View style={styles.quickActionContent}>
      <Text style={styles.quickActionTitle}>{title}</Text>
      <Text style={styles.quickActionDescription}>{description}</Text>
    </View>
  </TouchableOpacity>
);

const TypingIndicator = () => (
  <View style={[styles.messageBubble, styles.botBubble]}>
    <View style={styles.typingContainer}>
      <Bot color="#2563EB" size={16} />
      <View style={styles.typingDots}>
        <View style={[styles.typingDot, styles.dot1]} />
        <View style={[styles.typingDot, styles.dot2]} />
        <View style={[styles.typingDot, styles.dot3]} />
      </View>
    </View>
  </View>
);

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI Incident Response Assistant. I can help you with IR planning, assessments, real-time guidance during incidents, and compliance questions. How can I assist you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand you're dealing with an incident. Let me guide you through the immediate response steps. First, can you classify the type of incident you're experiencing?",
        "Based on your question, I recommend starting with containment procedures. Have you isolated the affected systems? I can provide a step-by-step checklist.",
        "This appears to be a compliance-related query. Let me help you understand the requirements and create an action plan that meets regulatory standards.",
        "I can help you create a comprehensive incident response plan. Would you like to start with a specific threat scenario or build a general framework?",
        "For this type of assessment, I'll need to understand your current security posture. Let me ask you a few key questions to provide targeted recommendations.",
      ];

      const botMessage: Message = {
        id: Date.now().toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    const actions: { [key: string]: string } = {
      'incident-guidance': 'I need immediate guidance for an active security incident',
      'create-plan': 'Help me create a new incident response plan',
      'assess-maturity': 'I want to assess my organization\'s IR maturity',
      'compliance-check': 'Check my plans for regulatory compliance',
    };

    if (actions[action]) {
      sendMessage(actions[action]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <UnifiedHeader 
        title="AI Assistant" 
        subtitle="Real-time incident response guidance"
      />

      <KeyboardAvoidingView 
        style={styles.chatContainer} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.length === 1 && (
            <View style={styles.quickActionsContainer}>
              <Text style={styles.quickActionsTitle}>Quick Actions</Text>
              <QuickActionCard
                title="Active Incident"
                description="Get immediate response guidance"
                icon={AlertTriangle}
                color="#DC2626"
                onPress={() => handleQuickAction('incident-guidance')}
              />
              <QuickActionCard
                title="Create Plan"
                description="Build new response procedures"
                icon={FileText}
                color="#2563EB"
                onPress={() => handleQuickAction('create-plan')}
              />
              <QuickActionCard
                title="Maturity Assessment"
                description="Evaluate current capabilities"
                icon={Shield}
                color="#059669"
                onPress={() => handleQuickAction('assess-maturity')}
              />
              <QuickActionCard
                title="Compliance Check"
                description="Verify regulatory requirements"
                icon={Clock}
                color="#7C3AED"
                onPress={() => handleQuickAction('compliance-check')}
              />
            </View>
          )}

          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {isTyping && <TypingIndicator />}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask about incident response..."
            placeholderTextColor="#9CA3AF"
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={() => sendMessage(inputText)}
            disabled={!inputText.trim() || isTyping}
          >
            <Send color="#FFFFFF" size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 10,
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
    marginVertical: 4,
    maxWidth: '85%',
  },
  userBubble: {
    backgroundColor: '#2563EB',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginLeft: 6,
  },
  userTime: {
    color: '#BFDBFE',
  },
  botTime: {
    color: '#9CA3AF',
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  botText: {
    color: '#374151',
  },
  quickActionsContainer: {
    marginBottom: 20,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 12,
  },
  quickActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  quickActionDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDots: {
    flexDirection: 'row',
    marginLeft: 8,
    alignItems: 'center',
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9CA3AF',
    marginHorizontal: 2,
  },
  dot1: {
    animationDelay: 0,
  },
  dot2: {
    animationDelay: 0.2,
  },
  dot3: {
    animationDelay: 0.4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: '#2563EB',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
});