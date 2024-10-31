import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BetsContext } from '../context/BetsContexts';
import { LineChart } from 'react-native-gifted-charts';

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
    };

    const calculateBalanceOverTime = () => {
        // Sort bets by date in ascending order
        bets.sort((a, b) => a.date - b.date);
        return bets.reduce((acc, bet) => {
            console.log('Bet: ', bet);
            if (bet.status === 'Won') {
                acc.push({ value: acc[acc.length - 1].value + (bet.stake * (bet.odds - 1)), label: bet.date.toISOString() });
            } else if (bet.status === 'Lost') {
                acc.push({ value: acc[acc.length - 1].value - bet.stake, label: bet.date.toISOString() });
            } else if (bet.status === 'Half Won') {
                acc.push({ value: acc[acc.length - 1].value + ((bet.stake / 2) * (bet.odds - 1)), label: bet.date.toISOString() });
            } else if (bet.status === 'Half Lost') {
                acc.push({ value: acc[acc.length - 1].value - (bet.stake / 2), label: bet.date.toISOString() });
            }
            return acc;
        }, [{ value: 0, label: bets[0].date.toISOString() }]);
    }

    const totalBets = bets.length;
    const totalStake = bets.reduce((acc, bet) => acc + bet.stake, 0);
    const profit = calculateProfit();
    const roi = (profit / totalStake) * 100;
    const winRate = (bets.filter(bet => bet.status === 'Won').length / totalBets) * 100;
    const avgOdds = bets.reduce((acc, bet) => acc + bet.odds, 0) / totalBets;
    const avgStake = totalStake / totalBets;
    const avgProfit = profit / totalBets;
    const balanceOverTime = useMemo(() => {
        if (bets.length === 0 || !bets[0].date) {
            return [{ value: 0, label: new Date().toISOString() }];
        }
        return calculateBalanceOverTime();
    }, [bets]);

    console.log('Balance Over Time: ', balanceOverTime);

    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                <LineChart
                    data={balanceOverTime}
                    width={300}
                    height={200}
                    color="blue"
                />

            </View>
            
            <View style={styles.statsContainer}>
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
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    chartContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    box: {
        width: '48%',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
});