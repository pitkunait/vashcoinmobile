import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Application from './src/navigation/Application';
import { Provider } from 'react-redux';
import store from './src/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Transaction from './src/core/Transaction';

const App = () => {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Application />
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
};

export default App;
