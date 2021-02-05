import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WalletScreen from '../screens/WalletScreen';
import SendScreen from '../screens/SendScreen';
import Wallet from '../core/Wallet';
import { RootState } from '../store';
import { connect, ConnectedProps } from 'react-redux';

const Tab = createBottomTabNavigator();

const Application = (props: PropsFromRedux) => {
    const setWallet = () => Wallet.initWallet(props.wallet);
    useEffect(setWallet, []);

    return (
        <Tab.Navigator>
            <Tab.Screen name="Chain" component={HomeScreen} />
            <Tab.Screen name="Send" component={SendScreen} />
            <Tab.Screen name="Wallet" component={WalletScreen} />
        </Tab.Navigator>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        wallet: state.app.wallet,
    };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Application);
