import React from 'react';
import {FlatList, Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {Button, Text} from "react-native-elements";
import {getCartItems} from "../../actions/cart";
import _values from 'lodash/values';
import Colors from '../../../constants/Colors';
import {AntDesign, Feather} from '@expo/vector-icons';


class CartItemsList extends React.Component {


    state = {
        items: [],
        count: 0,
        total: 0
    };

    componentWillMount() {
        getCartItems().then((data) => {
            this.setState({items: data.items, count: data.count, total: data.total})
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.cart.data && nextProps.cart.data.count !== this.state.count) {
            this.setState({
                items: nextProps.cart.data.items,
                count: nextProps.cart.data.count,
                total: nextProps.cart.data.total
            })
        }
    }


    renderItem = ({item}) => {
        const {navigate} = this.props.navigation.navigation;

        return <View
            style={{
                padding: 5,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
            }}
        >

            <TouchableOpacity onPress={() => navigate('SingleProductScreen', {
                item: item
            })}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'cover',
                    }}
                    source={{
                        uri: item.thumbnail
                    }}
                />
            </TouchableOpacity>

            <View style={{
                flex: 1,
                flexWrap: 'wrap',
                flexDirection: "column",
                justifyContent: "space-between",
                paddingLeft: 5
            }}>
                <TouchableOpacity onPress={() => navigate('SingleProductScreen', {
                    item: item
                })}>
                    <Text numberOfLines={2}>{item.name}</Text>
                </TouchableOpacity>

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
    };


    render() {
        return (<View style={{flex: 1}}>
                <ScrollView>
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
                {_values(this.state.items).length > 0 &&
                <BottomBar total={this.state.total} currency={_values(this.state.items)[0].currency}
                           navigation={this.props.navigation.navigation}/>}
            </View>


        );
    }

}

const BottomBar = ({total, currency, navigation}) => {
    return <View style={styles.tabBarInfoContainer}>
        <View style={{width: '100%'}}>
            <Text style={styles.tabBarInfoText}>Сумма к оплате: {total} {currency}</Text>
            <Button
                onPress={() => navigation.navigate('CheckoutScreen', {})}
                style={{padding: 5}}
                title="Перейти к оплате"
            />
        </View>
    </View>
};


const PlusMinusButton = ({item, plusOne, minusOne}) => (<View style={{display: 'flex', flexDirection: "row"}}>
    {item.count > 1 ? <TouchableOpacity onPress={() => minusOne(item.id)}>
            <AntDesign name="minuscircleo" size={20} color="grey"/>
        </TouchableOpacity> :
        <DeleteButton minusOne={minusOne} itemId={item.id}/>}

    <Text style={{paddingLeft: 5, paddingRight: 5}}>{item.count}</Text>

    <TouchableOpacity onPress={() => plusOne(item.id)}>
        <AntDesign name="pluscircleo" size={20} color="grey"/>
    </TouchableOpacity>
</View>);

const DeleteButton = ({minusOne, itemId}) => (
    <TouchableOpacity onPress={() => minusOne(itemId)}>
        <AntDesign name="minuscircleo" size={20} color={Colors.error}/>
    </TouchableOpacity>
);

const styles = StyleSheet.create(
    {
        bgContainer: {flex: 1, width: null, height: null},
        buttonsBar: {flexDirection: "row", justifyContent: "space-around"},
        priceTag: {paddingTop: 7, color: Colors.neutralGrey},
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        developmentModeText: {
            marginBottom: 20,
            color: 'rgba(0,0,0,0.4)',
            fontSize: 14,
            lineHeight: 19,
            textAlign: 'center',
        },
        contentContainer: {
            paddingTop: 30,
        },
        welcomeContainer: {
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 20,
        },
        welcomeImage: {
            width: 100,
            height: 80,
            resizeMode: 'contain',
            marginTop: 3,
            marginLeft: -10,
        },
        getStartedContainer: {
            alignItems: 'center',
            marginHorizontal: 50,
        },
        homeScreenFilename: {
            marginVertical: 7,
        },
        codeHighlightText: {
            color: 'rgba(96,100,109, 0.8)',
        },
        codeHighlightContainer: {
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderRadius: 3,
            paddingHorizontal: 4,
        },
        getStartedText: {
            fontSize: 17,
            color: 'rgba(96,100,109, 1)',
            lineHeight: 24,
            textAlign: 'center',
        },
        tabBarInfoContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            ...Platform.select({
                ios: {
                    shadowColor: 'black',
                    shadowOffset: {height: -3},
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                },
                android: {
                    elevation: 20,
                },
            }),
            alignItems: 'center',
            backgroundColor: '#fbfbfb',
            paddingVertical: 20,
        },
        tabBarInfoText: {
            fontSize: 17,
            color: 'rgba(96,100,109, 1)',
            textAlign: 'center',
        },
        navigationFilename: {
            marginTop: 5,
        },
        helpContainer: {
            marginTop: 15,
            alignItems: 'center',
        },
        helpLink: {
            paddingVertical: 15,
        },
        helpLinkText: {
            fontSize: 14,
            color: '#2e78b7',
        }
    }
);


export default connect()(CartItemsList);

