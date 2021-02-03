import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Header } from 'react-native-elements';

const SendScreen = () => {
    const onSend = () => {};

    return (
        <>
            <Header
                centerComponent={{
                    text: 'VashCoin',
                    style: { color: '#fff' },
                }}
            />
            <View style={styles.container}></View>

            <Button onPress={onSend} style={styles.mineButton} title={'Send'} />
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

export default SendScreen;
