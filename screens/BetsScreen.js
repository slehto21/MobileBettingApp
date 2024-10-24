import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { db, auth } from '../config/firebaseConfig';
import { collection, getDocs, where, orderBy, query, onSnapshot } from "firebase/firestore";

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
    <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
            <Text>Bets Screen</Text>
            <Button title="Add Bet" onPress={() => navigation.navigate('AddBet')} />
        </View>
        <FlatList
            data={bets}
            renderItem={({ item }) => (
                <View style={{ padding: 16 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text>Name</Text>
                            <Text>{item.name}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text>Stake</Text>
                            <Text>{item.stake}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text>Odds</Text>
                            <Text>{item.odds}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text>Sport</Text>
                            <Text>{item.sport}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text>Status</Text>
                            <Text>{item.status}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text>Bookmaker</Text>
                            <Text>{item.bookmaker}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
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