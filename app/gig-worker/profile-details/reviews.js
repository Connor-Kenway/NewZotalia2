import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const sampleProfileImage = require('../../../app/assets/images/profile-picture.png');

const reviewsData = [
    {
        id: '1',
        reviewerName: 'John Doe',
        profileImage: sampleProfileImage,
        rating: 4,
        comment: 'Great work! Very satisfied with the results.',
        date: '2023-01-15',
    },
    {
        id: '2',
        reviewerName: 'Jane Smith',
        profileImage: sampleProfileImage,
        rating: 5,
        comment: 'Excellent job, highly recommend!',
        date: '2023-02-20',
    },
    {
        id: '3',
        reviewerName: 'Michael Johnson',
        profileImage: sampleProfileImage,
        rating: 3,
        comment: 'Good work, but there is room for improvement.',
        date: '2023-03-10',
    },
    {
        id: '4',
        reviewerName: 'Emily Davis',
        profileImage: sampleProfileImage,
        rating: 5,
        comment: 'Outstanding performance, will hire again!',
        date: '2023-04-05',
    },
    {
        id: '5',
        reviewerName: 'David Wilson',
        profileImage: sampleProfileImage,
        rating: 4,
        comment: 'Very professional and timely delivery.',
        date: '2023-05-12',
    },
    {
        id: '6',
        reviewerName: 'Sarah Brown',
        profileImage: sampleProfileImage,
        rating: 2,
        comment: 'Not satisfied with the quality of work.',
        date: '2023-06-18',
    },
    {
        id: '7',
        reviewerName: 'Chris Evans',
        profileImage: sampleProfileImage,
        rating: 5,
        comment: 'Exceptional work, highly recommended!',
        date: '2023-07-22',
    },
    {
        id: '8',
        reviewerName: 'Natalie Portman',
        profileImage: sampleProfileImage,
        rating: 4,
        comment: 'Great job, met all expectations.',
        date: '2023-08-30',
    },
];

export default function Reviews() {
    const router = useRouter();

    const handleBackPress = () => {
        router.back();
    };

    const renderReviewItem = (review) => (
        <View key={review.id} style={styles.reviewItem}>
            <Image source={review.profileImage} style={styles.profileImage} />
            <View style={styles.reviewContent}>
                <Text style={styles.reviewerName}>{review.reviewerName}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
                <Text style={styles.reviewRating}>Rating: {review.rating}/5</Text>
                <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Feather name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Reviews</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {reviewsData.map(renderReviewItem)}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
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
    scrollContent: {
        paddingBottom: 20,
    },
    reviewItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
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
    reviewContent: {
        flex: 1,
    },
    reviewerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    reviewDate: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    reviewRating: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    reviewComment: {
        fontSize: 16,
        color: '#333',
    },
});