import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode';
import { fetchFollowers, fetchFollowersCount, fetchFollowing, fetchFollowingCount } from '../../../src/services/followsServic';

export default function FollowersAndFollowing() {
    const [userId, setUserId] = useState(null);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const getUserId = async () => {
            console.log("Getting user ID from token...");
            try {
                const token = await AsyncStorage.getItem("access_token");
                console.log('pausing on the await');
                console.log(token);
                if (token) {
                    const decodedToken = jwtDecode(token);
                    console.log('decoded');
                    console.log("Decoded token:", decodedToken.sub);
                    setUserId(decodedToken.sub);
                }
            } catch (error) {
                console.error("Failed to decode token:", error);
            }
        };
        getUserId();
    }, []);

    //don't need all this error handling and logic here, move out later
    useEffect(() => {
        if (userId) {
            const loadFollowersCount = async () => {
                console.log('loading followers', userId);
                const response = await fetchFollowersCount(userId);
                if (response.success !== false) {
                    setFollowersCount(response.followed_count);
                    console.log('Followers:', response);
                } else {
                    console.error(response.message);
                }
            };

            const loadFollowingCount = async () => {
                console.log('loading following', userId);
                const response = await fetchFollowingCount(userId);
                if (response.success !== false) {
                    setFollowingCount(response.follower_count);
                    console.log('Following:', response);
                } else {
                    console.error(response.message);
                }
            };

            const loadFollowersList = async () => {
                console.log('loading followers', userId);
                const response = await fetchFollowers(userId);
                if (response.success !== false) {
                    setFollowers(response.followed);
                    console.log('Followers:', response);
                } else {
                    console.error(response.message);
                }
            };

            const loadFollowingList = async () => {
                console.log('loading following', userId);
                const response = await fetchFollowing(userId);
                if (response.success !== false) {
                    setFollowing(response.follow);
                    console.log('Following:', response);
                } else {
                    console.error(response.message);
                }
            };

            loadFollowersCount();
            loadFollowingCount();
            loadFollowersList();
            loadFollowingList();
        }
    }, [userId]);

    const renderFollowerItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderFollowingItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const handlePress = (item) => {
        console.log('Item pressed:', item);
        // Navigate to the user's profile or perform any other action
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Followers: {followersCount}</Text>
            <FlatList
                data={followers}
                renderItem={renderFollowerItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <Text style={styles.header}>Following: {followingCount}</Text>
            <FlatList
                data={following}
                renderItem={renderFollowingItem}
                keyExtractor={(item) => item.id.toString()}
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
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
    },
});


