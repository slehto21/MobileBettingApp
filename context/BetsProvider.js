import React, { useState, useEffect } from "react";
import { deleteDoc, doc, collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig";
import { BetsContext } from "./BetsContexts";

export const BetsProvider = ({ children }) => {
    const [bets, setBets] = useState([]);
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

    const deleteBet = async (betId) => {
        try {
            await deleteDoc(doc(db, 'bets', betId));
        } catch (e) {
            console.error('Error deleting document: ', e);
        }
    };

    return (
        <BetsContext.Provider value={{ bets, sports, bookmakers, statuses, deleteBet }}>
            {children}
        </BetsContext.Provider>
    );
}