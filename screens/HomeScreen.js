import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BetsContext } from '../context/BetsContexts';

export default function HomeScreen() {

    const { bets } = useContext(BetsContext);

    const calculateProfit = () => {
        return bets.reduce((acc, bet) => {
            if (bet.status === 'Won') {
                return acc + (bet.stake * (bet.odds - 1));
            } else if (bet.status === 'Lost') {
                return acc - bet.stake;
            } else if (bet.status === 'Half Won') {
                return acc + ((bet.stake / 2) * (bet.odds - 1));
            } else if (bet.status === 'Half Lost') {
                return acc - (bet.stake / 2);
            } else {
                return acc;
            }
        }, 0);
    }

    const totalBets = bets.length;
    const totalStake = bets.reduce((acc, bet) => acc + bet.stake, 0);
    const profit = calculateProfit();
    const roi = (profit / totalStake) * 100;
    const winRate = (bets.filter(bet => bet.status === 'Won').length / totalBets) * 100;
    const avgOdds = bets.reduce((acc, bet) => acc + bet.odds, 0) / totalBets;
    const avgStake = totalStake / totalBets;
    const avgProfit = profit / totalBets;

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text>Total Bets: {totalBets}</Text>
            </View>
            <View style={styles.box}>
                <Text>Total Stake: {totalStake}</Text>
            </View>
            <View style={styles.box}>
                <Text>Profit: {profit}</Text>
            </View>
            <View style={styles.box}>
                <Text>ROI: {roi.toFixed(2)}%</Text>
            </View>
            <View style={styles.box}>
                <Text>Win Rate: {winRate.toFixed(2)}%</Text>
            </View>
            <View style={styles.box}>
                <Text>Avg Odds: {avgOdds.toFixed(2)}</Text>
            </View>
            <View style={styles.box}>
                <Text>Avg Stake: {avgStake.toFixed(2)}</Text>
            </View>
            <View style={styles.box}>
                <Text>Avg Profit: {avgProfit.toFixed(2)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    box: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
});