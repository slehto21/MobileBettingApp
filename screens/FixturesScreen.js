import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { fetchFixtures } from '../services/api/fetchFixtures';

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
        const options = { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fi-FI', options).replace(' klo', ';');
    };

    //Fixtures: [{"icehockey": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]]}, 
    // {"soccer": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]]}]

    const renderFixtureDetails = (fixture) => (
        <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>League: {fixture.league}</Text>
            <Text style={styles.detailText}>Start Time: {formatDate(fixture.commenceTime)}</Text>
            {fixture.bookmakers.map((bookmaker, index) => (
                <View key={index} style={styles.bookmakerContainer}>
                    <Text style={styles.bookmakerTitle}>{bookmaker.name}</Text>
                    {bookmaker.markets.map((market, idx) => (
                        <View key={idx} style={styles.marketContainer}>
                            <Text>Market: {market.name}</Text>
                            {market.outcomes.map((outcome, i) => (
                                <Text key={i}>{outcome.name}: {outcome.odds}</Text>
                            ))}
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            {fixtures.map((sportFixtures, index) => {
                const sport = Object.keys(sportFixtures)[0];
                return (
                    <View key={index} style={styles.sportContainer}>
                        <Pressable onPress={() => setSelectedSport(selectedSport === sport ? null : sport)} style={styles.sportPressable}>
                            <Text style={styles.sportTitle}>
                               {selectedSport === sport ? '▼' : '▶'} {sport.toUpperCase()} 
                            </Text>
                        </Pressable>
                        {selectedSport === sport && (
                            <FlatList
                                data={sportFixtures[sport]}
                                keyExtractor={(item, idx) => `${item.homeTeam}-${item.awayTeam}-${idx}`}
                                renderItem={({ item }) => (
                                    <Pressable onPress={() => setSelectedFixture(selectedFixture === item ? null : item)} style={styles.fixturePressable}>
                                        <Text style={styles.fixtureText}>
                                            {selectedFixture === item ? '▼' : '▶'} {item.homeTeam} vs {item.awayTeam}
                                        </Text>
                                        {selectedFixture === item && renderFixtureDetails(item)}
                                    </Pressable>
                                )}
                            />
                        )}
                    </View>
                );
            })}
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