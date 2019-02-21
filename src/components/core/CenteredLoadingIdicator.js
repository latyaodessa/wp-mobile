import React from 'react';
import {ActivityIndicator, StyleSheet, View} from "react-native";

const CenteredLoadingIdicator = () => (
    <View style={[styles.container]}>
        <ActivityIndicator animating/>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 15
    }
});

export default CenteredLoadingIdicator;
