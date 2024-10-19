import React, {useState} from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import {AddBetScreen} from './AddBetScreen';

export default function BetsScreen( {navigation} ) {
    const [bets, setBets] = useState([]);

    const getBets = () => {

    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
                <Text>Bets Screen</Text>
                <Button title="Add Bet" onPress={() => navigation.navigate('AddBet')} />
            </View>
            <FlatList
                data={bets}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
                        <Text>{item.name}</Text>
                        <Text>{item.stake}</Text>
                        <Text>{item.odds}</Text>
                        <Text>{item.date}</Text>
                        <Text>{item.sport}</Text>
                        <Text>{item.status}</Text>
                        <Text>{item.bookmaker}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}