import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SingleProduct from './../src/containers/product/SingleProduct';
import TabBarIcon from '../components/TabBarIcon';

export default class SingleProductScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        tabBarIcon:  <TabBarIcon
            name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
        />
    });


    render() {
        const {navigation} = this.props;
        const item = navigation.getParam('item', null);
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.setParams({title: "test"})}>
                    <Text>test</Text>
                </TouchableOpacity>
                <SingleProduct item={item} navigation={navigation}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
