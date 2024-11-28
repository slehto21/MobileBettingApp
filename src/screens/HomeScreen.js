import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { BetsContext } from '../context/BetsContexts';
import { LineChart } from 'react-native-gifted-charts';

export default function HomeScreen() {

    const { betsAsc, sevenDayBets, thirtyDayBets, ninetyDayBets, yearBets, YTDBets } = useContext(BetsContext);
    const [isBets, setIsBets] = useState(false);
    const [balanceOverTime, setBalanceOverTime] = useState([]);
    const [minBalance, setMinBalance] = useState(0);
    const [maxBalance, setMaxBalance] = useState(0);
    const [dateRange, setDateRange] = useState('All Time');
    const [stats, setStats] = useState({
        totalBets: 0,
        totalStake: 0,
        profit: 0,
        roi: 0,
        winRate: 0,
        avgOdds: 0,
        avgStake: 0,
        avgProfit: 0,
        pendingBets: 0,
        pendingStake: 0,
    });

    const calculateBalanceOverTime = (bets, dateRange) => {
        if (bets.length === 0) {
            setBalanceOverTime([]);
            return;
        }
        let localMaxBalance = 0;
        let localMinBalance = 0;
        const result = bets.reduce((acc, bet) => {
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
            if (newValue < localMinBalance) {
                localMinBalance = newValue;
            }

            return acc;
        }, [{ value: 0, date: bets[0].date.toISOString(), label: new Date(bets[0].date).toLocaleDateString('fi-FI', { day: '2-digit', month: '2-digit' }) }]);
        setMaxBalance(localMaxBalance);
        setMinBalance(localMinBalance);
        setBalanceOverTime(result);
        setDateRange(dateRange);
    }

    const statsOverTime = (bets) => {
        if (bets.length === 0) {
            setStats({
                totalBets: 0,
                totalStake: 0,
                profit: 0,
                roi: 0,
                winRate: 0,
                avgOdds: 0,
                avgStake: 0,
                avgProfit: 0,
                pendingBets: 0,
                pendingStake: 0,
            });
            return;
        }
        const totalBets = bets.length;
        const totalStake = bets.reduce((acc, bet) => acc + bet.stake, 0);
        const profit = bets.reduce((acc, bet) => {
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
        const roi = (profit / totalStake) * 100;
        const winRate = (bets.filter(bet => bet.status === 'Won').length / totalBets) * 100;
        const avgOdds = bets.reduce((acc, bet) => acc + bet.odds, 0) / totalBets;
        const avgStake = totalStake / totalBets;
        const avgProfit = profit / totalBets;
        const pendingBets = bets.filter(bet => bet.status === 'Pending');
        const pendingStake = pendingBets.reduce((acc, bet) => acc + bet.stake, 0);

        setStats({
            totalBets,
            totalStake,
            profit,
            roi,
            winRate,
            avgOdds,
            avgStake,
            avgProfit,
            pendingBets: pendingBets.length,
            pendingStake,
        });
    }

    const callOverTime = (bets, dateRange) => {
        calculateBalanceOverTime(bets, dateRange);
        statsOverTime(bets);
    }


    useEffect(() => {
        if (betsAsc.length === 0 || !betsAsc[0].date) {
            setIsBets(false);
            setBalanceOverTime([]);
            return;
        }
        callOverTime(betsAsc, "All Time");
        setIsBets(true);
    }, [betsAsc]);

    return (
        <View style={styles.container}>
            {isBets && (
                <View style={styles.chartContainer}>
                    <LineChart
                        initialSpacing={5}
                        data={balanceOverTime}
                        rotateLabel
                        noOfSections={5}
                        noOfSectionsBelowXAxis={5}
                        maxValue={maxBalance > -minBalance ? maxBalance : -minBalance}
                        stepValue={maxBalance > -minBalance ? maxBalance / 5 : -minBalance / 5}
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
                        height={125}
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
                        <View style={styles.buttonRow}>
                            <View
                                style={[
                                    styles.buttonWrapper,
                                    dateRange === "7 Days" && styles.activeButton,
                                ]}
                            >
                                <Button
                                    title="7 Days"
                                    onPress={() => callOverTime(sevenDayBets, "7 Days")}
                                />
                            </View>
                            <View
                                style={[
                                    styles.buttonWrapper,
                                    dateRange === "30 Days" && styles.activeButton,
                                ]}
                            >
                                <Button
                                    title="30 Days"
                                    onPress={() => callOverTime(thirtyDayBets, "30 Days")}
                                />
                            </View>
                            <View
                                style={[
                                    styles.buttonWrapper,
                                    dateRange === "90 Days" && styles.activeButton,
                                ]}
                            >
                                <Button
                                    title="90 Days"
                                    onPress={() => callOverTime(ninetyDayBets, "90 Days")}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonRow}>
                            <View
                                style={[
                                    styles.buttonWrapper,
                                    dateRange === "365 Days" && styles.activeButton,
                                ]}
                            >
                                <Button
                                    title="365 Days"
                                    onPress={() => callOverTime(yearBets, "365 Days")}
                                />
                            </View>
                            <View
                                style={[
                                    styles.buttonWrapper,
                                    dateRange === "YTD" && styles.activeButton,
                                ]}
                            >
                                <Button
                                    title="YTD"
                                    onPress={() => callOverTime(YTDBets, "YTD")}
                                />
                            </View>
                            <View
                                style={[
                                    styles.buttonWrapper,
                                    dateRange === "All Time" && styles.activeButton,
                                ]}
                            >
                                <Button
                                    title="All Time"
                                    onPress={() => callOverTime(betsAsc, "All Time")}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            )}
            <View style={styles.statsContainer}>
                <View style={styles.box}>
                    <Text>Total Bets: {stats.totalBets}</Text>
                </View>
                <View style={styles.box}>
                    <Text>Total Stake: {stats.totalStake}</Text>
                </View>
                <View style={styles.box}>
                    <Text>Profit: {stats.profit.toFixed(2)}</Text>
                </View>
                <View style={styles.box}>
                    <Text>ROI: {stats.roi.toFixed(2)}%</Text>
                </View>
                <View style={styles.box}>
                    <Text>Win Rate: {stats.winRate.toFixed(2)}%</Text>
                </View>
                <View style={styles.box}>
                    <Text>Avg Odds: {stats.avgOdds.toFixed(2)}</Text>
                </View>
                <View style={styles.box}>
                    <Text>Avg Stake: {stats.avgStake.toFixed(2)}</Text>
                </View>
                <View style={styles.box}>
                    <Text>Avg Profit: {stats.avgProfit.toFixed(2)}</Text>
                </View>
                <View style={styles.box}>
                    <Text>Pending Bets: {stats.pendingBets}</Text>
                </View>
                <View style={styles.box}>
                    <Text>Pending Stake: {stats.pendingStake}</Text>
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
        padding: 7,
        marginVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between",
        padding: 2,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    buttonWrapper: {
        margin: 3,
        borderRadius: 5,
        overflow: "hidden",
    },
    activeButton: {
        borderWidth: 2,
        borderColor: "blue",
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