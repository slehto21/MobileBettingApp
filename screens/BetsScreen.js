import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { db, auth } from '../config/firebaseConfig';
import { collection, where, orderBy, query, onSnapshot } from "firebase/firestore";

export default function BetsScreen({ navigation }) {
    const [bets, setBets] = useState([]);

    useEffect(() => {
        try {
            const betsQuery = query(
                collection(db, 'bets'),
                where('user', '==', auth.currentUser.uid),
                orderBy('date', 'desc')
            );

            const unsub = onSnapshot(betsQuery, (snapshot) => {
                const tempBets = [];
                snapshot.forEach((doc) => {
                    const betData = doc.data();
                    const date = convertFirestoreTimestampToDate(betData.date);
                    tempBets.push({ id: doc.id, ...betData, date });
                });
                if (JSON.stringify(tempBets) !== JSON.stringify(bets)) {
                    setBets(tempBets);
                }
            });

            return () => unsub();
        } catch (e) {
            console.error('Error fetching bets: ', e);
        }
    }, [bets]);

    const convertFirestoreTimestampToDate = (timestamp) => {
        if (timestamp && timestamp.seconds) {
            return new Date(timestamp.seconds * 1000);
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Bets Screen</Text>
                <Button title="Add Bet" onPress={() => navigation.navigate('AddBet')} />
            </View>
            <FlatList
                data={bets}
                renderItem={({ item }) => (
                    <View style={styles.betItem}>
                        <View style={styles.betRow}>
                            <View style={styles.betColumn}>
                                <Text>Name</Text>
                                <Text>{item.name}</Text>
                            </View>
                            <View style={styles.betColumn}>
                                <Text>Stake</Text>
                                <Text>{item.stake}</Text>
                            </View>
                            <View style={styles.betColumn}>
                                <Text>Odds</Text>
                                <Text>{item.odds}</Text>
                            </View>
                            <View style={styles.betColumn}>
                                <Text>Sport</Text>
                                <Text>{item.sport}</Text>
                            </View>
                            <View style={styles.betColumn}>
                                <Text>Status</Text>
                                <Text>{item.status}</Text>
                            </View>
                            <View style={styles.betColumn}>
                                <Text>Bookmaker</Text>
                                <Text>{item.bookmaker}</Text>
                            </View>
                            <View style={styles.betColumn}>
                                <Text>Date</Text>
                                <Text>{item.date.toDateString()}</Text>
                            </View>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    betItem: {
        padding: 16,
    },
    betRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    betColumn: {
        alignItems: 'center',
    },
});