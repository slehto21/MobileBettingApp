import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db, auth } from '../config/firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { BetsContext } from '../context/BetsContexts';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function AddBetScreen({ navigation }) {

    const { sports, bookmakers, statuses } = useContext(BetsContext);
    const [bet, setBet] = useState({
        name: '',
        stake: 0,
        odds: 0,
        date: new Date(),
        sport: '',
        status: '',
        bookmaker: '',
    });
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleChange = (name, value) => {
        setBet({ ...bet, [name]: value });
    }

    const saveBetToDB = async () => {
        try {
            const docRef = await addDoc(collection(db, 'bets'), {
                name: bet.name,
                stake: parseFloat(bet.stake),
                odds: parseFloat(bet.odds),
                date: bet.date,
                sport: bet.sport,
                status: bet.status,
                bookmaker: bet.bookmaker,
                user: auth.currentUser.uid
            });
            navigation.goBack();
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    }

    return (
        <View>
            <View style={styles.container}>
                <Text>
                    Name
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={bet.name}
                    onChangeText={(text) => handleChange('name', text)}
                />
                <Text>
                    Sport
                </Text>
                <Picker
                    placeholder='Sport'
                    selectedValue={bet.sport}
                    style={styles.picker}
                    onValueChange={(itemValue) => handleChange('sport', itemValue)}
                >
                    <Picker.Item label="-------" value="Undefined" />
                    {sports.map((sport, index) => (
                        <Picker.Item key={index} label={sport} value={sport} />
                    ))}
                </Picker>
                <Text>
                    Odds
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Odds"
                    value={bet.odds}
                    keyboardType='numeric'
                    onChangeText={(text) => handleChange('odds', text)}
                />
                <Text>
                    Stake
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Stake"
                    value={bet.stake}
                    keyboardType='numeric'
                    onChangeText={(text) => handleChange('stake', text)}
                />
                <Text>
                    Bookmaker
                </Text>
                <Picker
                    placeholder='Bookmaker'
                    selectedValue={bet.bookmaker}
                    style={styles.picker}
                    onValueChange={(itemValue) => handleChange('bookmaker', itemValue)}
                >
                    <Picker.Item label="-------" value="Undefined" />
                    {bookmakers.map((bookmaker, index) => (
                        <Picker.Item key={index} label={bookmaker} value={bookmaker} />
                    ))}
                </Picker>
                <Text>
                    Status
                </Text>
                <Picker
                    placeholder='Status'
                    selectedValue={bet.status}
                    style={styles.picker}
                    onValueChange={(itemValue) => handleChange('status', itemValue)}
                >
                    <Picker.Item label="-------" value="Undefined" />
                    {statuses.map((status, index) => (
                        <Picker.Item key={index} label={status} value={status} />
                    ))}
                </Picker>
                <View style={styles.buttonContainer}>
                    <Button
                        title={`Date: ${bet.date.toDateString()}`}
                        onPress={() => setShowDatePicker(true)}
                    />
                </View>
                {showDatePicker && (
                    <RNDateTimePicker
                        value={bet.date}
                        mode='date'
                        display='default'
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            const currentDate = selectedDate || bet.date;
                            setBet({ ...bet, date: currentDate });
                        }}
                    />
                )}
                <View style={styles.buttonContainer}>
                    <Button title="Add Bet" onPress={saveBetToDB} />
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
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16
    },
});