import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter, useSearchParams } from 'expo-router';

const initialMessages = [
  {
    id: 'm1',
    sender: 'other',
    text: 'I got a gig for you!',
    timestamp: 'Jan 11th - 1:00pm',
  },
  {
    id: 'm2',
    sender: 'me',
    text: 'Can I get some more details?',
    timestamp: 'Jan 12th - 1:00pm',
  },
];

export default function ClientMessageChat() {
  const router = useRouter();
//   const { id } = useSearchParams(); // conversation ID if using dynamic route

  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  // Hard-coded user name or fetched from backend
  const userName = 'Jackson - Works for Amazon';

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: `m${Date.now()}`,
      sender: 'me',
      text: inputText,
      timestamp: 'Just now',
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  };

  const renderMessageItem = ({ item }) => {
    const isMe = item.sender === 'me';
    return (
      <View
        style={[
          styles.messageBubble,
          isMe ? styles.myBubble : styles.otherBubble
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        {/* Go Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>{'<'} Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{userName}</Text>
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={styles.messagesContainer}
      />

      {/* Input bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={`Reply to ${userName}...`}
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 60,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  backText: {
    fontSize: 16,
    color: '#6A1B9A',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A1B9A',
  },
  messagesContainer: {
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  myBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#e0f7fa',
  },
  otherBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 8,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#6A1B9A',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendText: {
    color: '#fff',
    fontSize: 14,
  },
});
