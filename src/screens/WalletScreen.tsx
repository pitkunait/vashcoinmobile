import React from 'react';
import { Text } from 'react-native';
import { Button, Header } from 'react-native-elements';

const WalletScreen = () => {
    return (
        <>
            <Header
                centerComponent={{
                    text: 'VashCoin',
                    style: { color: '#fff' },
                }}
            />
            <Text>Wallet</Text>
        </>
    );
};

export default WalletScreen;
