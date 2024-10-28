import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { db } from '../config/firebaseConfig';
import { doc, updateDoc } from "firebase/firestore";
import sportIcons from '../utils/SportIcons';
import { BetsContext } from '../context/BetsContexts';


export default function BetsScreen({ navigation }) {
    
    const [expandedBet, setExpandedBet] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBetId, setSelectedBetId] = useState(null);
    const { bets, statuses, deleteBet } = useContext(BetsContext);

    useEffect(() => {
        console.log('Bets: ', bets);
    }, [bets]);

    const toggleExpand = (betId) => {
        if (expandedBet === betId) {
            setExpandedBet(null);
        } else {
            setExpandedBet(betId);
        }
    };

    const handleOpenModal = (betId) => {
        setSelectedBetId(betId);
        setModalVisible(true);
    }

    const updateStatus = (status) => {
        try{
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
                <Button title="Add Bet" onPress={() => navigation.navigate('AddBet')} />
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