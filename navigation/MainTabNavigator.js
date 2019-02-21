import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import TabBarIconCart from '../src/containers/product/TabBarIconCart'
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SingleProductScreen from '../screens/SingleProductScreen';
import LinksScreen from '../screens/LinksScreen';
import CartScreen from '../screens/CartScreen';

const HomeStack = createStackNavigator({
    Home: {screen: HomeScreen},
    SingleProductScreen: {screen: SingleProductScreen}
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
};

const LinksStack = createStackNavigator({
    Links: LinksScreen,
});

LinksStack.navigationOptions = {
    tabBarLabel: 'Links',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
        />
    ),
};

const ProfileStack = createStackNavigator({
    Settings: CartScreen,
});

ProfileStack.navigationOptions = {
    tabBarLabel: 'Cart',
    tabBarIcon: ({focused}) => (
        <TabBarIconCart focused={focused}/>
    ),
};

export default createBottomTabNavigator({
    HomeStack,
    LinksStack,
    ProfileStack,
});
