import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, SectionList, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { db } from '../config/firebaseConfig';
import { doc, updateDoc } from "firebase/firestore";
import sportIcons from '../utils/SportIcons';
import { BetsContext } from '../context/BetsContexts';


export default function BetsScreen({ navigation }) {

    const [expandedBet, setExpandedBet] = useState(false);
    const [expandedSections, setExpandedSections] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBetId, setSelectedBetId] = useState(null);
    const { betsByMonth, statuses, deleteBet } = useContext(BetsContext);

    useEffect(() => {
    }, [betsByMonth]);

    const toggleExpand = (betId) => {
        if (expandedBet === betId) {
            setExpandedBet(null);
        } else {
            setExpandedBet(betId);
        }
    };

    const toggleSection = (title) => {
        setExpandedSections((prevState) => ({
            ...prevState,
            [title]: !prevState[title],
        }));
    };

    const handleOpenModal = (betId) => {
        setSelectedBetId(betId);
        setModalVisible(true);
    }

    const updateStatus = (status) => {
        try {
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
            <SectionList
                sections={betsByMonth}
                keyExtractor={(item) => item.id}
                renderSectionHeader={({ section: { title } }) => (
                    <TouchableOpacity onPress={() => toggleSection(title)}>
                        <Text style={styles.sectionHeader}>
                            {expandedSections[title] ? '▼' : '▶'} {title}
                        </Text>
                    </TouchableOpacity>
                )}
                renderItem={({ item, section }) =>
                    expandedSections[section.title] && (
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
                                    <TouchableOpacity style={styles.modalContainer} activeOpacity={0.5} onPressOut={() => setModalVisible(false)}>
                                        <View>
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
                                    </TouchableOpacity>
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
                                        <Button
                                            title="Edit"
                                            onPress={() => navigation.navigate('EditBet', { betId: item.id })}
                                        />
                                        <Button
                                            title="Delete"
                                            color="red"
                                            onPress={() => deleteBet(item.id)}
                                        />
                                    </View>
                                </View>
                            )}
                        </TouchableOpacity>
                    )
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 5,
        backgroundColor: '#f0f0f0',
        marginBottom: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
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