import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../config/firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';


export default function EditBetScreen({ route, navigation }) {

    const { deleteBet, sports, bookmakers, statuses, bet } = route.params;
    const [updatedBet, setUpdatedBet] = useState({
        name: bet.name,
        stake: bet.stake,
        odds: bet.odds,
        sport: bet.sport,
        status: bet.status,
        bookmaker: bet.bookmaker,
    });

    const handleChange = (name, value) => {
        setUpdatedBet({ ...updatedBet, [name]: value });
    }

    const updateBetToDB = async () => {
        try {
            console.log('Bet: ', bet);
            console.log('Updated Bet: ', updatedBet);
            const betRef = doc(db, 'bets', bet.id);
            await updateDoc(betRef, {
                name: updatedBet.name,
                stake: parseFloat(updatedBet.stake),
                odds: parseFloat(updatedBet.odds),
                sport: updatedBet.sport,
                status: updatedBet.status,
                bookmaker: updatedBet.bookmaker,
            });
            navigation.goBack();
        } catch (e) {
            console.error('Error updating document: ', e);
        }
    }

    const handleDeleteBet = () => {
        deleteBet(bet.id);
        navigation.goBack();
    };

    return (
        <View>
            <View style={styles.container}>
                <Text>
                    Name
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={updatedBet.name}
                    onChangeText={(text) => handleChange('name', text)}
                />
                <Text>
                    Sport
                </Text>
                <Picker
                    placeholder='Sport'
                    selectedValue={updatedBet.sport}
                    style={styles.picker}
                    onValueChange={(itemValue) => handleChange('sport', itemValue)}
                >
                    {sports.map((sport, index) => (
                        <Picker.Item key={index} label={sport} value={sport} />
                    ))}
                </Picker>
                <Text>
                    Stake
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Stake"
                    value={updatedBet.stake.toString()}
                    keyboardType='numeric'
                    onChangeText={(text) => handleChange('stake', text)}
                />
                <Text>
                    Odds
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Odds"
                    value={updatedBet.odds.toString()}
                    keyboardType='numeric'
                    onChangeText={(text) => handleChange('odds', text)}
                />
                <Text>
                    Status
                </Text>
                <Picker
                    placeholder='Status'
                    selectedValue={updatedBet.status}
                    style={styles.picker}
                    onValueChange={(itemValue) => handleChange('status', itemValue)}
                >
                    {statuses.map((status, index) => (
                        <Picker.Item key={index} label={status} value={status} />
                    ))}
                </Picker>
                <Text>
                    Bookmaker
                </Text>
                <Picker
                    placeholder='Bookmaker'
                    selectedValue={updatedBet.bookmaker}
                    style={styles.picker}
                    onValueChange={(itemValue) => handleChange('bookmaker', itemValue)}
                >
                    {bookmakers.map((bookmaker, index) => (
                        <Picker.Item key={index} label={bookmaker} value={bookmaker} />
                    ))}
                </Picker>
                <View style={styles.buttons}>
                    <Button title="Update Bet" onPress={updateBetToDB} />
                    <Button title="Delete Bet" color="red" onPress={handleDeleteBet} />
                    <Button title="Cancel" color="grey" onPress={() => navigation.goBack()} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 8
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 8
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16
    }
});