import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {getCartItems} from "../../actions/cart";

const ITEM_WIDTH = Dimensions.get('window').width;

class CartItemsList extends React.Component {


    state = {
        items: []
    };

    componentWillMount() {
        getCartItems().then((items) => {
            this.setState({items: items})
        });

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.data.length !== this.state.length) {
            this.setState({items: nextProps.data})
        }
    }


    render() {
        return (<ScrollView>

                <View>
                    <Text>{this.state.items.length}</Text>
                </View>
            </ScrollView>


        );
    }

}

const styles = StyleSheet.create(
    {}
);


export default connect()(CartItemsList);

