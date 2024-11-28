import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, SectionList } from 'react-native';
import { fetchFixtures } from '../services/api/fetchFixtures';
import { Linking } from 'react-native';

export default function FixturesScreen() {

    const [fixtures, setFixtures] = useState([]);
    const [selectedSports, setSelectedSports] = useState({});
    const [selectedFixture, setSelectedFixture] = useState(null);
    const [sections, setSections] = useState([]);

    useEffect(() => {
        async function getFixtures() {
            const fixtures = await fetchFixtures();
            setFixtures(fixtures);

            if (!fixtures || fixtures.length === 0) {
                return;
            }
            const sections = fixtures.map((sportFixtures) => {
                const sport = Object.keys(sportFixtures)[0];
                return {
                    title: sport.toUpperCase(),
                    data: sportFixtures[sport],
                };
            });
            setSections(sections);
        }
        getFixtures();
    }, []);

    const toggleSection = (sport) => {
        setSelectedSports((prevState) => ({
            ...prevState,
            [sport]: !prevState[sport],
        }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}.${month}, ${hours}:${minutes}`;
    };

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
        <SectionList
            sections={sections.map(section => ({
                ...section,
                data: selectedSports[section.title] ? section.data : [], 
            }))}
            keyExtractor={(item, index) => `${item.homeTeam}-${item.awayTeam}-${index}`}
            renderSectionHeader={({ section: { title } }) => (
                <Pressable onPress={() => toggleSection(title)}>
                    <Text style={styles.sportTitle}>
                        {selectedSports[title] ? '▼' : '▶'} {title}
                    </Text>
                </Pressable>
            )}
            renderItem={({ item }) => {
                return (
                    <Pressable onPress={() => setSelectedFixture(selectedFixture === item ? null : item)}>
                        <Text style={new Date(item.commenceTime) < new Date() ? styles.fixtureTextOver : styles.fixtureText}>
                            {selectedFixture === item ? '▼' : '▶'} {item.homeTeam} vs {item.awayTeam} | {formatDate(item.commenceTime)}
                        </Text>
                        {selectedFixture === item && renderFixtureDetails(item)}
                    </Pressable>
                );
            }}
            contentContainerStyle={styles.container}
            ListEmptyComponent={<Text style={styles.noFixturesText}>No fixtures available</Text>}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 10,
    },
    sportTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 10,
    },
    fixtureText: {
        fontSize: 16,
        padding: 10,
    },
    fixtureTextOver: {
        fontSize: 16,
        padding: 10,
        color: 'red',
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