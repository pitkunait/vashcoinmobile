import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Header } from 'react-native-elements';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store';
import { fetchBalance, updateEverything } from '../store/reducers/AppReducer';
import { postMinedBlock } from '../api/api';
import Miner from '../core/Miner';
import Clipboard from '@react-native-community/clipboard';

const WalletScreen = (props: PropsFromRedux) => {
    const fetchBalanceInner = props.fetchBalance;
    useEffect(() => {
        fetchBalanceInner();
    }, [fetchBalanceInner]);
    const onRefresh = async () => props.fetchBalance();
    const [isMining, setIsMining] = useState(false);

    const onMine = async () => {
        setIsMining(true);
        const block = await Miner.mine(props.currentChain);
        if (block) {
            try {
                await postMinedBlock(block);
            } catch (e) {}
        }
        setIsMining(false);
        props.updateEverything();
    };

    const copyWaletId = () => {
        Clipboard.setString(props.wallet.id);
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
                <View style={styles.details}>
                    <Text style={styles.title}>Balance:</Text>
                    <Text style={styles.balance}>{props.balance}</Text>
                    <Text></Text>
                    <Text style={styles.title}>Your wallet ID:</Text>
                    <TouchableOpacity onPress={copyWaletId}>
                        <Text>{props.wallet.id}</Text>
                    </TouchableOpacity>

                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <Text>{props.wallet.key.pk}</Text>
                    <Text></Text>
                    <Text>{props.wallet.key.sk}</Text>
                </View>
            </View>
            <View>
                <Button
                    style={styles.button}
                    onPress={onMine}
                    loading={isMining}
                    title={'Mine'}
                />
                <Button
                    style={styles.button}
                    title="Update"
                    onPress={onRefresh}
                />

                {/*<Button style={styles.button} title="Save wallet details" />*/}
                {/*<Button style={styles.button} title="Load wallet details" />*/}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    details: {
        marginHorizontal: 20,
    },
    balance: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
    title: {
        textAlign: 'center',
    },
    button: {
        marginHorizontal: 10,
        marginVertical: 5,
    },
});

const mapStateToProps = (state: RootState) => {
    return {
        wallet: state.app.wallet,
        currentChain: state.app.currentChain,
        balance: state.app.balance,
    };
};

const mapDispatchToProps = {
    fetchBalance,
    updateEverything,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(WalletScreen);
