import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Header } from 'react-native-elements';
import Miner from '../core/Miner';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store';
import { postMinedBlock } from '../api/api';

const miner = new Miner();

const MineScreen = (props: PropsFromRedux) => {
    const [isMining, setIsMining] = useState(false);

    const onMine = async () => {
        setIsMining(true);
        const block = await miner.mine(props.currentChain);
        if (block) {
            try {
                await postMinedBlock(block);
            } catch (e) {}
        }
        setIsMining(false);
    };

    return (
        <>
            <Header
                centerComponent={{
                    text: 'VashCoin',
                    style: { color: '#fff' },
                }}
            />
            <View style={styles.container}></View>
            <Button
                onPress={onMine}
                loading={isMining}
                style={styles.mineButton}
                title={'Mine'}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    mineButton: {
        marginHorizontal: 10,
    },
});

const mapStateToProps = (state: RootState) => {
    return {
        currentChain: state.app.currentChain,
    };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MineScreen);
