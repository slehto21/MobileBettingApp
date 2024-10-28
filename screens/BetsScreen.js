import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { db, auth } from '../config/firebaseConfig';
import { collection, where, orderBy, query, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import sportIcons from '../utils/SportIcons';


export default function BetsScreen({ navigation }) {

    const [sports, setSports] = useState([
        'Football',
        'Basketball',
        'Tennis',
        'Cricket',
        'Golf',
        'Boxing',
        'Rugby',
        'Horse Racing',
        'American Football',
        'Baseball',
        'Ice Hockey',
        'Motor Racing',
        'Cycling',
        'Esports',
        'Volleyball',
        'Table Tennis',
        'Snooker',
        'Darts',
        'Handball',
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
        'Spreadex',
        'Other'
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
    const [bets, setBets] = useState([]);
    const [expandedBet, setExpandedBet] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBetId, setSelectedBetId] = useState(null);

    // useEffect(() => {
    //     setBets([
    //         {
    //             id: '1',
    //             name: 'Liverpool',
    //             stake: 10,
    //             odds: 2.5,
    //             sport: 'Football',
    //             status: 'Pending',
    //             bookmaker: 'Bet365',
    //             date: new Date(),
    //         },
    //         {
    //             id: '2',
    //             name: 'Los Angeles Lakers',
    //             stake: 20,
    //             odds: 1.8,
    //             sport: 'Basketball',
    //             status: 'Won',
    //             bookmaker: 'William Hill',
    //             date: new Date(),
    //         },
    //         {
    //             id: '3',
    //             name: 'Roger Federer',
    //             stake: 15,
    //             odds: 2.0,
    //             sport: 'Tennis',
    //             status: 'Lost',
    //             bookmaker: 'Paddy Power',
    //             date: new Date(),
    //         },
    //         {
    //             id: '4',
    //             name: 'Secretariat',
    //             stake: 25,
    //             odds: 3.5,
    //             sport: 'Horse Racing',
    //             status: 'Pending',
    //             bookmaker: 'Betfair',
    //             date: new Date(),
    //         },
    //         {
    //             id: '5',
    //             name: 'India',
    //             stake: 30,
    //             odds: 1.6,
    //             sport: 'Cricket',
    //             status: 'Won',
    //             bookmaker: 'Ladbrokes',
    //             date: new Date(),
    //         },
    //         {
    //             id: '6',
    //             name: 'New Zealand All Blacks',
    //             stake: 18,
    //             odds: 2.2,
    //             sport: 'Rugby',
    //             status: 'Lost',
    //             bookmaker: 'Coral',
    //             date: new Date(),
    //         },
    //         {
    //             id: '7',
    //             name: 'Anthony Joshua',
    //             stake: 22,
    //             odds: 1.9,
    //             sport: 'Boxing',
    //             status: 'Pending',
    //             bookmaker: 'Unibet',
    //             date: new Date(),
    //         },
    //         {
    //             id: '8',
    //             name: 'Tiger Woods',
    //             stake: 12,
    //             odds: 2.8,
    //             sport: 'Golf',
    //             status: 'Won',
    //             bookmaker: 'Betfred',
    //             date: new Date(),
    //         },
    //         {
    //             id: '9',
    //             name: 'Michael van Gerwen',
    //             stake: 14,
    //             odds: 2.1,
    //             sport: 'Darts',
    //             status: 'Lost',
    //             bookmaker: '888sport',
    //             date: new Date(),
    //         },
    //         {
    //             id: '10',
    //             name: 'Ronnie O\'Sullivan',
    //             stake: 16,
    //             odds: 1.7,
    //             sport: 'Snooker',
    //             status: 'Pending',
    //             bookmaker: 'Betway',
    //             date: new Date(),
    //         },
    //         {
    //             id: '11',
    //             name: 'Chris Froome',
    //             stake: 19,
    //             odds: 2.4,
    //             sport: 'Cycling',
    //             status: 'Won',
    //             bookmaker: 'Sky Bet',
    //             date: new Date(),
    //         },
    //         {
    //             id: '12',
    //             name: 'Lewis Hamilton',
    //             stake: 21,
    //             odds: 1.5,
    //             sport: 'Motor Racing',
    //             status: 'Lost',
    //             bookmaker: 'BetVictor',
    //             date: new Date(),
    //         },
    //         {
    //             id: '13',
    //             name: 'New England Patriots',
    //             stake: 23,
    //             odds: 2.3,
    //             sport: 'American Football',
    //             status: 'Pending',
    //             bookmaker: 'Betfair',
    //             date: new Date(),
    //         },
    //         {
    //             id: '14',
    //             name: 'New York Yankees',
    //             stake: 17,
    //             odds: 1.9,
    //             sport: 'Baseball',
    //             status: 'Won',
    //             bookmaker: 'William Hill',
    //             date: new Date(),
    //         },
    //         {
    //             id: '15',
    //             name: 'Toronto Maple Leafs',
    //             stake: 20,
    //             odds: 2.0,
    //             sport: 'Ice Hockey',
    //             status: 'Lost',
    //             bookmaker: 'Bet365',
    //             date: new Date(),
    //         },
    //         {
    //             id: '16',
    //             name: 'THW Kiel',
    //             stake: 24,
    //             odds: 2.6,
    //             sport: 'Handball',
    //             status: 'Pending',
    //             bookmaker: 'Ladbrokes',
    //             date: new Date(),
    //         },
    //         {
    //             id: '17',
    //             name: 'Brazil',
    //             stake: 26,
    //             odds: 1.8,
    //             sport: 'Volleyball',
    //             status: 'Won',
    //             bookmaker: 'Coral',
    //             date: new Date(),
    //         },
    //         {
    //             id: '18',
    //             name: 'Ma Long',
    //             stake: 28,
    //             odds: 2.2,
    //             sport: 'Table Tennis',
    //             status: 'Lost',
    //             bookmaker: 'Unibet',
    //             date: new Date(),
    //         },
    //         {
    //             id: '19',
    //             name: 'Team Liquid',
    //             stake: 30,
    //             odds: 1.7,
    //             sport: 'Esports',
    //             status: 'Pending',
    //             bookmaker: 'Betfred',
    //             date: new Date(),
    //         },
    //         {
    //             id: '20',
    //             name: 'US Presidential Election',
    //             stake: 32,
    //             odds: 2.5,
    //             sport: 'Politics',
    //             status: 'Won',
    //             bookmaker: '888sport',
    //             date: new Date(),
    //         },
    //         {
    //             id: '21',
    //             name: 'Oscars Best Picture',
    //             stake: 34,
    //             odds: 1.6,
    //             sport: 'Entertainment',
    //             status: 'Lost',
    //             bookmaker: 'Betway',
    //             date: new Date(),
    //         },
    //         {
    //             id: '22',
    //             name: 'Dow Jones',
    //             stake: 36,
    //             odds: 2.1,
    //             sport: 'Financials',
    //             status: 'Pending',
    //             bookmaker: 'Sky Bet',
    //             date: new Date(),
    //         },
    //         {
    //             id: '23',
    //             name: 'Virtual Horse Racing',
    //             stake: 38,
    //             odds: 1.9,
    //             sport: 'Virtual Sports',
    //             status: 'Won',
    //             bookmaker: 'BetVictor',
    //             date: new Date(),
    //         },
    //         {
    //             id: '24',
    //             name: 'Miscellaneous Event',
    //             stake: 40,
    //             odds: 2.0,
    //             sport: 'Other',
    //             status: 'Lost',
    //             bookmaker: 'Betfair',
    //             date: new Date(),
    //         },
    //     ]);
    // }, []);




    useEffect(() => {
        try {
            const betsQuery = query(
                collection(db, 'bets'),
                where('user', '==', auth.currentUser.uid),
                orderBy('date', 'desc')
            );

            const unsub = onSnapshot(betsQuery, (snapshot) => {
                const tempBets = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: convertFirestoreTimestampToDate(doc.data().date)
                }));
                setBets(tempBets);
            });
            return () => unsub();
        } catch (e) {
            console.error('Error fetching bets: ', e);
        }
    }, []);

    const convertFirestoreTimestampToDate = (timestamp) => {
        if (timestamp && timestamp.seconds) {
            return new Date(timestamp.seconds * 1000);
        }
        return null;
    };

    const toggleExpand = (betId) => {
        if (expandedBet === betId) {
            setExpandedBet(null);
        } else {
            setExpandedBet(betId);
        }
    };

    const deleteBet = async (betId) => {
        try {
            await deleteDoc(doc(db, 'bets', betId));
        } catch (e) {
            console.error('Error deleting document: ', e);
        }
    };

    const handleOpenModal = (betId) => {
        setSelectedBetId(betId);
        setModalVisible(true);
    }

    const updateStatus = (status) => {
        try{
            console.log('Status: ', status);
            console.log('Bet ID: ', selectedBetId);
            const betRef = doc(db, 'bets', selectedBetId);
            updateDoc(betRef, {
                status: status
            });
        } catch (e) {
            console.error('Error updating document: ', e);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button title="Add Bet" onPress={() => navigation.navigate('AddBet', { sports, bookmakers, statuses })} />
            </View>
            <FlatList
                data={bets}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.betItem}>
                        <View style={styles.betRow}>
                            {sportIcons[item.sport] && (
                                <View style={styles.sportIcon}>
                                    {sportIcons[item.sport]}
                                </View>
                            )}
                            <Text style={styles.betName}>{item.name}</Text>
                            <TouchableOpacity onPress={() => handleOpenModal(item.id)} style={styles.expandedStatus}>
                                <Text style={styles.betStatus}>{item.status}</Text>
                            </TouchableOpacity>
                            <Modal
                                animationType="none"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => setModalVisible(false)}
                            >
                                <View style={styles.modalContainer}>
                                    <FlatList
                                        data={statuses}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    updateStatus(item);
                                                    setModalVisible(false);
                                                }}
                                            >
                                                <Text style={styles.modalItem}>{item}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                            </Modal>
                        </View>
                        {expandedBet === item.id && (
                            <View>
                                <View style={styles.expandedContent}>
                                    <Text>Stake: {item.stake}</Text>
                                    <Text>Odds: {item.odds}</Text>
                                    <Text>Sport: {item.sport}</Text>
                                    <Text>Status: {item.status}</Text>
                                    <Text>Bookmaker: {item.bookmaker}</Text>
                                    <Text>Date: {item.date.toDateString()}</Text>
                                </View>
                                <View style={styles.buttons}>
                                    <Button title="Edit" onPress={() => navigation.navigate('EditBet', {
                                        deleteBet,
                                        sports,
                                        bookmakers,
                                        statuses,
                                        bet: {
                                            id: item.id,
                                            name: item.name,
                                            stake: item.stake,
                                            odds: item.odds,
                                            sport: item.sport,
                                            status: item.status,
                                            bookmaker: item.bookmaker
                                        }
                                    })} />
                                    <Button title="Delete" color="red" onPress={() => deleteBet(item.id)} />
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
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
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 16,
    },
    betRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    betName: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
    betStatus: {
        fontSize: 16,
        color: '#888',
        marginLeft: 10,
    },
    sportIcon: {
        width: 24,
        height: 24,
        marginRight: 15,
    },
    expandedContent: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
    },
    expandedStatus: {
        padding: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalItem: {
        padding: 16,
        fontSize: 18,
        color: '#fff',
        marginVertical: 8,
        borderRadius: 8,
    },
});