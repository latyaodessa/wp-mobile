import React from 'react';
import {FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {Text} from "react-native-elements";
import Colors from '../../../constants/Colors';
import {Feather} from "@expo/vector-icons";
import CenteredLoadingIdicator from '../core/CenteredLoadingIdicator';


class UserOrderItemsList extends React.Component {


    state = {
        items: []
    };

    componentWillMount() {
        this.props.getUserOrderItems(this.props.item.id).then(() => {
            this.setState({items: this.props.orderItems.data});
            console.log(this.props);
        })
    }


    renderItem = ({item}) => {
        const {navigate} = this.props.navigation;
        return <TouchableOpacity onPress={() => navigate('SingleProductScreen', {
            item: item
        })}>
            <View
                style={{
                    padding: 5,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >

                <View
                    style={{
                        padding: 5,
                        display: "flex"
                    }}
                >
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'cover',
                        }}
                        source={{
                            uri: item.single_image[0]
                        }}
                    />

                </View>

                <View style={{
                    flex: 1,
                    flexWrap: 'wrap',
                    flexDirection: "column",
                    justifyContent: "space-between",
                    paddingLeft: 5
                }}>
                    <Text numberOfLines={5}>{item.name}</Text>
                </View>

                <View
                    style={{
                        padding: 5,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text style={styles.priceTag}>{"Количество: " + item.quantity}</Text>
                    <Text style={styles.priceTag}>{"Сумма: " + item.total}</Text>

                </View>

            </View>
        </TouchableOpacity>
    };

    render() {
        return (<View style={{flex: 1}}>

                {this.state.items.length > 0 &&
                <FlatList
                    key={this.state.items.length}
                    data={this.state.items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem}
                />
                }
                {this.state.items.length <= 0 && !this.props.orderItems.fetching && <EmptyCart/>}
                {this.props.orderItems.fetching && <CenteredLoadingIdicator/>}

            </View>


        );
    }
}

const EmptyCart = () => (
    <ScrollView>
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Feather name="shopping-cart" size={150}
                     color={Colors.tabIconDefault}
            />
            <Text>У Вас нет еще ни одного заказа</Text>
        </View>

    </ScrollView>
);

const styles = StyleSheet.create(
    {
        priceTag: {paddingTop: 7, color: Colors.neutralGrey},
    }
);


export default connect()(UserOrderItemsList);

