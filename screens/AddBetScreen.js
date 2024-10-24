import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db, auth } from '../config/firebaseConfig';
import { collection, addDoc } from "firebase/firestore";


export default function AddBetScreen({ navigation }) {

    const [sports, setSports] = useState([
        'Football',
        'Basketball',
        'Tennis',
        'Horse Racing',
        'Cricket',
        'Rugby',
        'Boxing',
        'Golf',
        'Darts',
        'Snooker',
        'Cycling',
        'Motor Racing',
        'American Football',
        'Baseball',
        'Ice Hockey',
        'Handball',
        'Volleyball',
        'Table Tennis',
        'Esports',
        'Specials',
        'Politics',
        'Entertainment',
        'Financials',
        'Virtual Sports',
        'Other'
    ]);
    const [bookmakers, setBookmakers] = useState([
        'Bet365',
        'William Hill',
        'Paddy Power',
        'Ladbrokes',
        'Betfair',
        'Coral',
        'Betfred',
        'Sky Bet',
        'Unibet',
        '888sport',
        'BetVictor',
        'BoyleSports',
        'Betway',
        'Sportingbet',
        'Bwin',
        'Betdaq',
        'Smarkets',
        'Matchbook',
        'Spreadex'
    ]);
    const [statuses, setStatuses] = useState([
        'Pending',
        'Won',
        'Lost',
        'Void',
        'Half Won',
        'Half Lost',
        'Refunded',
        'Cancelled'
    ]);
    const [bet, setBet] = useState({
        name: '',
        stake: 0,
        odds: 0,
        date: new Date(),
        sport: '',
        status: '',
        bookmaker: '',
    });

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
            // console.log('Bet: ', bet);
            // console.log('Document written with ID: ', docRef.id);
            navigation.goBack();
          } catch (e) {
            console.error('Error adding document: ', e);
          }
    }

    return (
        <View>
            <View style={styles.header}>
                <Text>Add Bet Screen</Text>
            </View>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={bet.name}
                    onChangeText={(text) => handleChange('name', text)}
                />
                <Text>Sport</Text>
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
                <TextInput
                    style={styles.input}
                    placeholder="Odds"
                    value={bet.odds}
                    keyboardType='numeric'
                    onChangeText={(text) => handleChange('odds', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Stake"
                    value={bet.stake}
                    keyboardType='numeric'
                    onChangeText={(text) => handleChange('stake', text)}
                />
                <Text>Bookmaker</Text>
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
                <Text>Status</Text>
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
                <Button title="Add Bet" onPress={saveBetToDB} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16
    },
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
    }
});