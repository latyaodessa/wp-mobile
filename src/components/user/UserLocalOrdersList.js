import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View, Text, Alert} from "react-native";
import {connect} from "react-redux";
import Colors from '../../../constants/Colors';
import {getUserLocalOrders} from "../../actions/user";
import _values from 'lodash/values';

class UserOrdersList extends React.Component {


    state = {
        items: [],
        order_id: ''
    };

    async componentWillMount() {
        await this.getLocalOrders();
    }

    getLocalOrders = async () => {
        const userLocalOrders = await getUserLocalOrders();
        this.setState({items: userLocalOrders});

    };

    async componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.submit.data &&
            nextProps.submit.data.order_id &&
            nextProps.submit.data.order_id !== this.state.order_id) {
            this.setState({order_id: nextProps.submit.data.order_id, items: []});
            await this.getLocalOrders()
        }
    }


    renderItem = ({item}) => {
        const {navigate} = this.props.navigation;
        return <TouchableOpacity
            onPress={() => Alert.alert(
                'Авторизация обязательна',
                'Для большей информации войдите в личный кабинет'
            )}
        //     onPress={() => navigate('UserOrderItemsScreen', {
        //     item: item
        // })}
        >
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
                        <Text>{"Заказ"}</Text>
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
                    <Text style={styles.priceTag}>{_values(item.items).length}</Text>
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

            </View>


        );
    }
}


const styles = StyleSheet.create(
    {
        priceTag: {paddingTop: 7, color: Colors.neutralGrey},
    }
);


export default connect()(UserOrdersList);

