import React from 'react';
import {Dimensions, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {Text} from "react-native-elements";
import {getCartItems} from "../../actions/cart";
import _values from 'lodash/values';
import Colors from '../../../constants/Colors';
import {AntDesign, Entypo, Feather} from '@expo/vector-icons';


const ITEM_WIDTH = Dimensions.get('window').width;

class CartItemsList extends React.Component {


    state = {
        items: [],
        count: 0
    };

    componentWillMount() {
        getCartItems().then((data) => {
            this.setState({items: data.items, count: data.count})
        });

    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps);
        console.log(nextContext);
        if (nextProps.cart.data && nextProps.cart.data.count !== this.state.count) {
            this.setState({items: nextProps.cart.data.items, count: nextProps.cart.data.count})
        }
    }

    renderItem = ({item}) => {


        const {navigate} = this.props.navigation.navigation;

        return <TouchableOpacity onPress={() => navigate('SingleProductScreen', {
            item: item
        })}>
            <View
                style={{
                    padding: 5,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <TouchableOpacity onPress={() => this.props.deleteItem(item.id)}>
                    <Entypo name="cross" size={20} color={Colors.error}/>
                </TouchableOpacity>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'cover',
                        // cache: 'only-if-cached'
                    }}
                    source={{
                        uri: item.thumbnail
                    }}
                />

                <View style={{
                    flex: 1,
                    flexWrap: 'wrap',
                    flexDirection: "column",
                    justifyContent: "space-between",
                    paddingLeft: 5
                }}>
                    <Text numberOfLines={2}>{item.name}</Text>

                    <View style={{display: "flex", flexDirection: "row"}}>
                        <Text style={styles.priceTag}>{item.price}</Text>
                        <Text style={styles.priceTag}>{item.currency}</Text>
                    </View>
                    <PlusMinusButton item={item} plusOne={this.props.plusOne} minusOne={this.props.minusOne}/>
                </View>

                <View style={{display: "flex", flexDirection: "row"}}>
                    <Text style={styles.priceTag}>{item.total}</Text>
                    <Text style={styles.priceTag}>{item.currency}</Text>
                </View>

            </View>
        </TouchableOpacity>
    };


    render() {
        console.log(this.state);
        return (<ScrollView>
                {this.state.count > 0 ?
                    <FlatList
                        key={this.state.count}
                        data={_values(this.state.items)}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                    /> :
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Feather name="shopping-cart" size={150}
                                 color={Colors.tabIconDefault}
                        />
                        <Text>Корозина паста</Text>
                    </View>
                }

            </ScrollView>


        );
    }

}


const PlusMinusButton = ({item, plusOne, minusOne}) => (<View style={{display: 'flex', flexDirection: "row"}}>
    <TouchableOpacity
        onPress={() => minusOne(item.id)}
    >
        <AntDesign name="minuscircleo" size={20} color="grey"/>
    </TouchableOpacity>
    <Text style={{paddingLeft: 5, paddingRight: 5}}>{item.count}</Text>
    <TouchableOpacity
        onPress={() => plusOne(item.id)}
    >
        <AntDesign name="pluscircleo" size={20} color="grey"/>
    </TouchableOpacity>
</View>);

const styles = StyleSheet.create(
    {
        bgContainer: {flex: 1, width: null, height: null},
        buttonsBar: {flexDirection: "row", justifyContent: "space-around"},
        priceTag: {paddingTop: 7, color: Colors.neutralGrey}
    }
);


export default connect()(CartItemsList);

