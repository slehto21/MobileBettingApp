import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { fetchFixtures } from '../services/api/fetchFixtures';
import { Linking } from 'react-native';

export default function FixturesScreen() {

    const [fixtures, setFixtures] = useState([]);
    const [selectedSport, setSelectedSport] = useState(null);
    const [selectedFixture, setSelectedFixture] = useState(null);

    useEffect(() => {
        console.log('Fetching fixtures...');
        async function getFixtures() {
            const fixtures = await fetchFixtures();
            setFixtures(fixtures);
        }
        getFixtures();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}.${month}, ${hours}:${minutes}`;
    };    

    //Fixtures: [{"icehockey": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]]}, 
    // {"soccer": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]]}]

    const renderFixtureDetails = (fixture) => (
        <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>League: {fixture.league}</Text>
            {fixture.bookmakers.map((bookmaker, index) => (
                <View key={index} style={styles.bookmakerContainer}>
                    <Text style={styles.bookmakerTitle}>{bookmaker.name}</Text>
                    {bookmaker.markets.map((market, idx) => (
                        <View key={idx} style={styles.marketContainer}>
                            <Text>Market: {market.name}</Text>
                            {market.outcomes.map((outcome, i) => (
                                <Text key={i}>{outcome.name}: {outcome.odds}</Text>
                            ))}
                            {bookmaker.link && (
                                <Text>
                                    <Text>Link: </Text>
                                    <Text style={{ color: 'blue' }} onPress={() => Linking.openURL(bookmaker.link)}>
                                        {bookmaker.link}
                                    </Text>
                                </Text>
                            )}
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            {fixtures.length === 0 ? (
                <Text style={styles.noFixturesText}>No fixtures available</Text>
            ) : (
                fixtures.map((sportFixtures, index) => {
                    const sport = Object.keys(sportFixtures)[0];
                    return (
                        <View key={index}>
                            <Pressable onPress={() => setSelectedSport(selectedSport === sport ? null : sport)}>
                                <Text style={styles.sportTitle}>
                                    {selectedSport === sport ? '▼' : '▶'} {sport.toUpperCase()}
                                </Text>
                            </Pressable>
                            {selectedSport === sport && (
                                <FlatList
                                    data={sportFixtures[sport]}
                                    keyExtractor={(item, idx) => `${item.homeTeam}-${item.awayTeam}-${idx}`}
                                    renderItem={({ item }) => (
                                        <Pressable onPress={() => setSelectedFixture(selectedFixture === item ? null : item)}>
                                            <Text style={styles.fixtureText}>
                                                {selectedFixture === item ? '▼' : '▶'} {item.homeTeam} vs {item.awayTeam} | {formatDate(item.commenceTime)}
                                            </Text>
                                            {selectedFixture === item && renderFixtureDetails(item)}
                                        </Pressable>
                                    )}
                                />
                            )}
                        </View>
                    );
                })
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    sportContainer: {
        marginBottom: 15,
    },
    sportPressable: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
    },
    sportTitle: {
        fontSize: 20,
        padding: 10,
        fontWeight: 'bold',
    },
    fixturePressable: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    fixtureText: {
        fontSize: 16,
        padding: 10,
    },
    noFixturesText: {
        fontSize: 20,
        textAlign: 'center',
    },
    detailsContainer: {
        paddingLeft: 20,
        marginTop: 5,
    },
    detailText: {
        fontSize: 14,
        marginVertical: 2,
    },
    bookmakerContainer: {
        paddingTop: 5,
    },
    bookmakerTitle: {
        fontWeight: 'bold',
    },
    marketContainer: {
        paddingLeft: 10,
    },
});