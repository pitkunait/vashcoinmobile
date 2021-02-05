import React from 'react';
import { BlockType } from '../types/BlockType';
import { View, Text, StyleSheet } from 'react-native';

const BlockComponent = (props: { block: BlockType }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Block #{props.block.index}</Text>
                <Text>
                    {new Date(props.block.timestamp * 1000).toLocaleString(
                        'et',
                    )}
                </Text>
            </View>

            <Text>Transactions: {props.block.transactions.length}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: '#eee',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#aaa',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default BlockComponent;
