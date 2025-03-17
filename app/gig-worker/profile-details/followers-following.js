import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const sampleProfileImage = require('../../../app/assets/images/profile-picture.png');

export default function FollowersAndFollowing() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('followers');
    const [followersCount, setFollowersCount] = useState(120);
    const [followingCount, setFollowingCount] = useState(80);
    const [followers, setFollowers] = useState([
        { id: '1', name: 'John Doe', profileImage: sampleProfileImage },
        { id: '2', name: 'Jane Smith', profileImage: sampleProfileImage },
        { id: '3', name: 'Michael Johnson', profileImage: sampleProfileImage },
        { id: '7', name: 'Chris Evans', profileImage: sampleProfileImage },
        { id: '8', name: 'Natalie Portman', profileImage: sampleProfileImage },
        { id: '11', name: 'Tom Hanks', profileImage: sampleProfileImage },
        { id: '12', name: 'Emma Watson', profileImage: sampleProfileImage },
        { id: '13', name: 'Leonardo DiCaprio', profileImage: sampleProfileImage },
        { id: '14', name: 'Jennifer Lawrence', profileImage: sampleProfileImage },
    ]);
    const [following, setFollowing] = useState([
        { id: '4', name: 'Emily Davis', profileImage: sampleProfileImage },
        { id: '5', name: 'David Wilson', profileImage: sampleProfileImage },
        { id: '6', name: 'Sarah Brown', profileImage: sampleProfileImage },
        { id: '9', name: 'Robert Downey Jr.', profileImage: sampleProfileImage },
        { id: '10', name: 'Scarlett Johansson', profileImage: sampleProfileImage },
        { id: '15', name: 'Chris Hemsworth', profileImage: sampleProfileImage },
        { id: '16', name: 'Gal Gadot', profileImage: sampleProfileImage },
        { id: '17', name: 'Ryan Reynolds', profileImage: sampleProfileImage },
        { id: '18', name: 'Zendaya', profileImage: sampleProfileImage },
    ]);

    const renderFollowerItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
            <Image source={item.profileImage} style={styles.profileImage} />
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderFollowingItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
            <Image source={item.profileImage} style={styles.profileImage} />
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const handlePress = (item) => {
        console.log('Item pressed:', item);
        // Navigate to the user's profile or perform any other action
    };

    const handleBackPress = () => {
        router.back();
    };

    const getActiveList = () => {
        return activeTab === 'followers' ? followers : following;
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Feather name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Followers & Following</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'followers' && styles.activeTab]}
                    onPress={() => setActiveTab('followers')}
                >
                    <Text style={[styles.tabText, activeTab === 'followers' && styles.activeTabText]}>
                        Followers ({followersCount})
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'following' && styles.activeTab]}
                    onPress={() => setActiveTab('following')}
                >
                    <Text style={[styles.tabText, activeTab === 'following' && styles.activeTabText]}>
                        Following ({followingCount})
                    </Text>
                </TouchableOpacity>
            </View>

            {/* List */}
            <FlatList
                data={getActiveList()}
                renderItem={activeTab === 'followers' ? renderFollowerItem : renderFollowingItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
    },
    tabsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#6A1B9A',
    },
    tabText: {
        fontSize: 16,
        color: '#666',
    },
    activeTabText: {
        color: '#6A1B9A',
        fontWeight: 'bold',
    },
    list: {
        paddingBottom: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'ghostwhite',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    itemText: {
        fontSize: 18,
        color: '#333',
    },
});


