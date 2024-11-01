import React, { useContext, useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { BetsContext } from '../context/BetsContexts';
import { LineChart } from 'react-native-gifted-charts';

export default function HomeScreen() {

    const { bets, betsAsc } = useContext(BetsContext);
    const [isBets, setIsBets] = useState(false);
    const [balanceOverTime, setBalanceOverTime] = useState([]);
    const [maxBalance, setMaxBalance] = useState(0);

    const profit = useMemo(() => {
        return bets.reduce((acc, bet) => {
            if (bet.status === 'Won') {
                return acc + (bet.stake * (bet.odds - 1));
            } else if (bet.status === 'Lost') {
                return acc - bet.stake;
            } else if (bet.status === 'Half Won') {
                return acc + ((bet.stake / 2) * (bet.odds - 1));
            } else if (bet.status === 'Half Lost') {
                return acc - (bet.stake / 2);
            }
            return acc;
        }, 0);
    }, [bets]);

    const calculateBalanceOverTime = () => {
        let localMaxBalance = 0;
        const result = betsAsc.reduce((acc, bet) => {
            let newValue;
            if (bet.status === 'Won') {
                newValue = acc[acc.length - 1].value + (bet.stake * (bet.odds - 1));
            } else if (bet.status === 'Lost') {
                newValue = acc[acc.length - 1].value - bet.stake;
            } else if (bet.status === 'Half Won') {
                newValue = acc[acc.length - 1].value + ((bet.stake / 2) * (bet.odds - 1));
            } else if (bet.status === 'Half Lost') {
                newValue = acc[acc.length - 1].value - (bet.stake / 2);
            } else {
                newValue = acc[acc.length - 1].value;
            }

            const lastDate = new Date(acc[acc.length - 1].date);
            const currentDate = new Date(bet.date);
            const isSameDay =
                currentDate.getDate() === lastDate.getDate() &&
                currentDate.getMonth() === lastDate.getMonth() &&
                currentDate.getFullYear() === lastDate.getFullYear();

            if (isSameDay) {
                acc.push({ value: newValue, date: bet.date.toISOString() });
            } else {
                const formattedDate = currentDate.toLocaleDateString('fi-FI', { day: '2-digit', month: '2-digit' });
                acc.push({ value: newValue, date: bet.date.toISOString(), label: formattedDate });
            }

            if (newValue > localMaxBalance) {
                localMaxBalance = newValue;
            }

            return acc;
        }, [{ value: 0, date: betsAsc[0].date.toISOString(), label: new Date(betsAsc[0].date).toLocaleDateString('fi-FI', { day: '2-digit', month: '2-digit' }) }]);
        setMaxBalance(localMaxBalance);
        return result;
    }

    useEffect(() => {
        if (betsAsc.length === 0 || !betsAsc[0].date) {
            console.log('Ei betsejä');
            setIsBets(false);
            setBalanceOverTime([]);
            return;
        }

        console.log('Lasketaan balance over time');
        const calculatedBalance = calculateBalanceOverTime();
        setBalanceOverTime(calculatedBalance);
        setIsBets(true);
    }, [betsAsc]);

    const totalBets = bets.length;
    const totalStake = bets.reduce((acc, bet) => acc + bet.stake, 0);
    const roi = (profit / totalStake) * 100;
    const winRate = (bets.filter(bet => bet.status === 'Won').length / totalBets) * 100;
    const avgOdds = bets.reduce((acc, bet) => acc + bet.odds, 0) / totalBets;
    const avgStake = totalStake / totalBets;
    const avgProfit = profit / totalBets;
    const pendingBets = bets.filter(bet => bet.status === 'Pending');
    const pendingStake = pendingBets.reduce((acc, bet) => acc + bet.stake, 0);

    console.log('Balance Over Time: ', balanceOverTime);
    console.log('Max Balance: ', maxBalance);

    return (
        <View style={styles.container}>
            {isBets && (
                <View style={styles.chartContainer}>
                    <LineChart
                        initialSpacing={5}
                        data={balanceOverTime}
                        rotateLabel
                        noOfSections={5}
                        maxValue={maxBalance}
                        hideDataPoints
                        highlightedRange={{
                            from: 0,
                            to: maxBalance,
                            color: 'green'
                        }}

                        yAxisColor="black"
                        xAxisColor="black"
                        yAxisThickness={1}
                        yAxisTextStyle={{ color: 'gray' }}
                        height={150}
                        thickness={1.5}
                        color="red"
                        rulesColor="gray"
                        pointerConfig={{
                            pointerStripHeight: 160,
                            pointerStripColor: 'lightgray',
                            pointerStripWidth: 2,
                            pointerColor: 'lightgray',
                            radius: 6,
                            pointerLabelWidth: 100,
                            pointerLabelHeight: 90,
                            activatePointersOnLongPress: true,
                            activatePointersDelay: 500,
                            autoAdjustPointerLabelPosition: true,
                            pointerLabelComponent: items => {
                                console.log('Full item data:', items[0]);
                                return (
                                    <View style={styles.pointerView} >
                                        <Text style={styles.pointerLabel}>
                                            {new Date(items[0].date).toLocaleDateString('fi-FI')}
                                        </Text>

                                        <View style={styles.pointerBox}>
                                            <Text style={styles.pointerValue}>
                                                {items[0].value.toFixed(2)}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            },
                        }}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title='7 Days' />
                        <Button title='30 Days' />
                        <Button title='90 Days' />
                        <Button title='365 Days' />
                        <Button title='YTD' />
                        <Button title='All Time' />
                    </View>
                </View>
            )}
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
                <View style={styles.box}>
                    <Text>Pending Bets: {pendingBets.length}</Text>
                </View>
                <View style={styles.box}>
                    <Text>Pending Stake: {pendingStake}</Text>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    pointerView: {
        height: 90,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pointerLabel: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
    },
    pointerBox: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: 'lightgrey',
    },
    pointerValue: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});