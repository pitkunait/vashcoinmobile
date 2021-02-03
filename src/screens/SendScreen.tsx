import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Header, Input } from 'react-native-elements';
import Transaction from '../core/Transaction';
import Wallet from '../core/Wallet';
import { postTransaction } from '../api/api';

const SendScreen = () => {
    const [details, setDetails] = useState({
        recipient: '',
        amount: '0',
    });

    const onSend = () => {
        const amount = Number(details.amount);
        const transaction = new Transaction({ ...details, amount });
        const wl = new Wallet();
        const signed = wl.signTransaction(transaction);
        console.log(signed.serialize());
        postTransaction(signed)
            .then((r) => {
                console.log(r);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const onChangeRecipient = (value: string) => {
        setDetails({ ...details, recipient: value });
    };

    const onChangeAmount = (value: string) => {
        setDetails({ ...details, amount: value });
    };

    return (
        <>
            <Header
                centerComponent={{
                    text: 'VashCoin',
                    style: { color: '#fff' },
                }}
            />
            <View style={styles.container}>
                <Input
                    value={details.recipient}
                    label="recipient"
                    onChangeText={onChangeRecipient}
                />
                <Input
                    value={details.amount}
                    label="amount"
                    onChangeText={onChangeAmount}
                />
            </View>

            <Button onPress={onSend} style={styles.mineButton} title={'Send'} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 20,
    },
    mineButton: {
        marginHorizontal: 10,
    },
});

export default SendScreen;
