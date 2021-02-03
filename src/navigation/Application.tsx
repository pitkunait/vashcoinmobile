import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WalletScreen from '../screens/WalletScreen';
import MineScreen from '../screens/MineScreen';
import SendScreen from '../screens/SendScreen';
import { postTransaction } from '../api/api';
import Transaction from '../core/Transaction';
import Wallet from '../core/Wallet';
const Tab = createBottomTabNavigator();

const Application = () => {
    useEffect(() => {
        const tr = new Transaction({ amount: 123 });
        const wl = new Wallet();
        const signed = wl.signTransaction(tr);
        console.log(signed.serialize());
        postTransaction(signed)
            .then((r) => {})
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return (
        <Tab.Navigator>
            <Tab.Screen name="Chain" component={HomeScreen} />
            <Tab.Screen name="Mine" component={MineScreen} />
            <Tab.Screen name="Send" component={SendScreen} />
            <Tab.Screen name="Wallet" component={WalletScreen} />
        </Tab.Navigator>
    );
};

export default Application;
