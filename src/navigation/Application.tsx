import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WalletScreen from '../screens/WalletScreen';
import MineScreen from '../screens/MineScreen';
import SendScreen from '../screens/SendScreen';

const Tab = createBottomTabNavigator();

const Application = () => {
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
