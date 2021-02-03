import React, { useEffect } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { fetchBlockChain } from '../store/reducers/AppReducer';
import { RootState } from '../store';
import { Header } from 'react-native-elements';
import BlockComponent from '../components/BlockComponent';

const ChainScreen = (props: PropsFromRedux) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const { loadBlocks } = props;

    useEffect(() => {
        loadBlocks();
    }, [loadBlocks]);

    const onRefresh = () => {
        setRefreshing(true);
        loadBlocks();
        setRefreshing(false);
    };

    return (
        <>
            <Header
                centerComponent={{
                    text: 'VashCoin',
                    style: { color: '#fff' },
                }}
            />
            <ScrollView
                style={styles.content}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                {props.currentChain.map((item, index) => (
                    <BlockComponent block={item} key={index} />
                ))}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
});

const mapStateToProps = (state: RootState) => {
    return {
        currentChain: state.app.currentChain,
    };
};

const mapDispatchToProps = {
    loadBlocks: fetchBlockChain,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ChainScreen);
