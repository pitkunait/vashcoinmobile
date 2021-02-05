import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Header, Input } from 'react-native-elements';
import Transaction from '../core/Transaction';
import { wallet } from '../core/Wallet';
import { postTransaction } from '../api/api';
import { updateEverything } from '../store/reducers/AppReducer';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store';

const SendScreen = (props: PropsFromRedux) => {
    const [details, setDetails] = useState({
        recipient: '',
        amount: '0',
    });

    const onSend = async () => {
        try {
            const amount = Number(details.amount);
            const transaction = new Transaction({
                ...details,
                sender: wallet.id,
                amount,
            });
            const signed = wallet.signTransaction(transaction);
            await postTransaction(signed);
        } catch (e) {
            console.log(e);
        }

        props.updateEverything();
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
                    text: 'BeerCoin',
                    style: { color: '#fff' },
                }}
            />
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text>Send Beercoin</Text>
                </View>
                <View style={styles.inputsContainer}>
                    <Input
                        labelStyle={styles.input}
                        style={styles.input}
                        value={details.recipient}
                        multiline
                        numberOfLines={4}
                        label="Recipient"
                        onChangeText={onChangeRecipient}
                    />
                    <Input
                        labelStyle={styles.input}
                        style={styles.input}
                        value={details.amount}
                        label="Amount"
                        onChangeText={onChangeAmount}
                    />
                </View>
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
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mineButton: {
        marginHorizontal: 10,
    },
    inputsContainer: {
        flex: 1,
    },
    input: {
        textAlign: 'center',
    },
});

const mapStateToProps = (state: RootState) => {
    return {};
};

const mapDispatchToProps = {
    updateEverything,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SendScreen);
