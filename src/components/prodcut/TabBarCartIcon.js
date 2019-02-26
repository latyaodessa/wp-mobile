import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {getCartItems} from "../../actions/cart";
import {connect} from "react-redux";
import {Feather} from '@expo/vector-icons';
import Colors from "../../../constants/Colors";

class TabBarIcon extends React.Component {

    state = {
        itemsInCart: 0
    };

    componentDidMount() {
        getCartItems().then((cartItems) => {
            this.setState({itemsInCart: cartItems.count});
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.data.count !== this.state.count) {
            this.setState({itemsInCart: nextProps.data.count})
        }
    }


    render() {
        return (
            <View>
                <Feather name="shopping-cart" size={26}
                         color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                />
                <View style={styles.iconCart}>
                    <Text style={styles.iconNumber}>{this.state.itemsInCart}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        iconCart: {
            position: 'absolute',
            right: -30,
            top: 3,
            width: 28,
            height: 15,
            borderRadius: 100 / 2,
            backgroundColor: Colors.tintColor,
            justifyContent: 'center',
            alignItems: 'center'
        },
        iconNumber: {
            color: "#FFF",
            fontSize: 13
        }

    }
);

export default connect()(TabBarIcon);
