import React from 'react';
import {FlatList, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {Text} from "react-native-elements";
import Colors from '../../../constants/Colors';
import {Feather} from '@expo/vector-icons';
import CenteredLoadingIdicator from '../core/CenteredLoadingIdicator';
import _values from 'lodash/values';
import {getUser} from "../../actions/user";


class UserOrdersList extends React.Component {


    state = {
        items: [],
        order_id: ''
    };

    componentWillMount() {
        this.fetchOrders()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.submit.data &&
            nextProps.submit.data.order_id &&
            nextProps.submit.data.order_id !== this.state.order_id) {
            this.setState({order_id: nextProps.submit.data.order_id, items: []});
            this.fetchOrders()
        }
    }

    fetchOrders = () => {
        getUser().then(user => {
            if (user) {
                this.props.getUserOrders(user.ID).then(() => {
                    this.setState({
                        items: this.props.userOrders.data
                    })
                });
            }
        });
    };

    renderItem = ({item}) => {
        const {navigate} = this.props.navigation;
        return <TouchableOpacity onPress={() => navigate('UserOrderItemsScreen', {
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
                    <View style={{display: "flex", flexDirection: "row"}}>
                        <Text>{"Заказ от: "}</Text>
                        <Text>{this.getDate(item.date_created.date)}</Text>
                    </View>

                    <View style={{display: "flex", flexDirection: "row"}}>
                        <Text style={styles.priceTag}>{"Сумма: "}</Text>
                        <Text style={styles.priceTag}>{item.total}</Text>
                        <Text style={styles.priceTag}>{item.currency}</Text>
                    </View>

                </View>

                <View
                    style={{
                        padding: 5,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text style={styles.priceTag}>{_values(item.line_items).length}</Text>
                    <Text style={styles.priceTag}>{"единиц"}</Text>

                </View>

            </View>
        </TouchableOpacity>
    };

    getDate = (stringDate) => {
        let creationDate = new Date(stringDate);
        let date = [creationDate.getFullYear(), ("0" + (creationDate.getMonth() + 1)).slice(-2), ("0" + (creationDate.getDay())).slice(-2)].join("-");
        let time = [("0" + (creationDate.getHours())).slice(-2), ("0" + (creationDate.getMinutes())).slice(-2)].join(":");
        return date + " " + time;
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
                {this.state.items.length <= 0 && !this.props.userOrders.fetching && <EmptyCart/>}
                {this.props.userOrders.fetching && <CenteredLoadingIdicator/>}

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


export default connect()(UserOrdersList);

