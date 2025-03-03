import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

// Example conversation data
const conversations = [
  {
    id: '1',
    userName: 'Jackson - Works for Amazon',
    lastMessage: 'I got a gig for you!',
    avatar: require('../assets/images/JohnDoeProfile.png'),
    lastMessageTime: 'Jan 11th - 1:00pm',
  },
  {
    id: '2',
    userName: 'Alice - Startup Founder',
    lastMessage: 'Let’s discuss more details!',
    avatar: require('../assets/images/profile-picture.png'),
    lastMessageTime: 'Jan 12th - 3:30pm',
  },
];

export default function ClientMessage() {
  const router = useRouter();

  const handlePressConversation = (conversationId) => {
    router.push(`/client/client-message-chat`); // /${conversationId}
  };

  const renderConversationItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.conversationItem}
        onPress={() => handlePressConversation(item.id)}
      >
        <Image source={item.avatar} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.userName} numberOfLines={1}>
            {item.userName}
          </Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
        <Text style={styles.timestamp}>{item.lastMessageTime}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Messages</Text>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversationItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  listContent: {
    paddingBottom: 80,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  lastMessage: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#aaa',
    marginLeft: 8,
  },
});
