import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import TabBarIconCart from '../src/containers/product/TabBarIconCart'
import HomeScreen from '../screens/HomeScreen';
import SearchCatergoryScreen from '../screens/SearchCatergoryScreen';
import SingleProductScreen from '../screens/SingleProductScreen';
import UserScreen from '../screens/UserScreen';
import UserOrderItemsScreen from '../screens/UserOrderItemsScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import {Feather} from '@expo/vector-icons';
import Colors from "../constants/Colors";

const HomeStack = createStackNavigator({
    Home: {screen: HomeScreen},
    SingleProductScreen: {screen: SingleProductScreen}
});

HomeStack.navigationOptions = {
    tabBarLabel: <View/>,
    tabBarIcon: ({focused}) => (
        <View>
            <Feather name="list" size={26}
                     color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
        </View>
    ),
};


const SearchStack = createStackNavigator({
    SearchCatergoryScreen: {screen: SearchCatergoryScreen},
    SingleProductScreen: {screen: SingleProductScreen}
});

SearchStack.navigationOptions = {
    tabBarLabel: <View/>,
    tabBarIcon: ({focused}) => (
        <View>
            <Feather name="search" size={26}
                     color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
        </View>
    ),
};


const UserStack = createStackNavigator({
    UserScreen: {screen: UserScreen},
    UserOrderItemsScreen: UserOrderItemsScreen,
    SingleProductScreen: {screen: SingleProductScreen}
});

UserStack.navigationOptions = {
    tabBarLabel: <View/>,
    tabBarIcon: ({focused}) => (
        <View>
            <Feather name="user" size={26}
                     color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
        </View>
    ),
};


const CartStack = createStackNavigator({
    Settings: CartScreen,
    SingleProductScreen: {screen: SingleProductScreen},
    CheckoutScreen: {screen: CheckoutScreen}
});

CartStack.navigationOptions = {
    tabBarLabel: <View/>,
    tabBarIcon: ({focused}) => (
        <TabBarIconCart focused={focused}/>
    )
};

export default createBottomTabNavigator({
    HomeStack,
    SearchStack,
    CartStack: CartStack,
    UserStack: UserStack,
});
