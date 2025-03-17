import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const topFieldsOfWork = [
    { id: '1', field: 'Web Development', gigs: 10 },
    { id: '2', field: 'Mobile App Development', gigs: 8 },
    { id: '3', field: 'UI/UX Design', gigs: 7 },
    { id: '4', field: 'SEO Optimization', gigs: 5 },
    { id: '5', field: 'Content Writing', gigs: 4 },
    { id: '6', field: 'Graphic Design', gigs: 3 },
];

export default function TopFieldOfWork() {
    const router = useRouter();

    const handleBackPress = () => {
        router.back();
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Feather name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Top Fields of Work</Text>
            </View>

            <View style={styles.contentContainer}>
                {topFieldsOfWork.map((item) => (
                    <View key={item.id} style={styles.fieldItem}>
                        <Text style={styles.fieldText}>{item.field}</Text>
                        <Text style={styles.gigsText}>{item.gigs} gigs</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F9F9',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
    },
    contentContainer: {
        padding: 20,
    },
    fieldItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: 'ghostwhite',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    fieldText: {
        fontSize: 18,
        color: '#333',
    },
    gigsText: {
        fontSize: 16,
        color: '#666',
    },
});