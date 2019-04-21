import React from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import {getCartItems} from "../../actions/cart";
import _map from 'lodash/map'
import {Button, CheckBox, Input, Text} from 'react-native-elements';
import CenteredLoadingIdicator from '../core/CenteredLoadingIdicator';
import {emailIsValid} from "../../constants/services/Utils";
import {getUser} from "../../actions/user";

class Checkout extends React.Component {


    constructor() {
        super();
        this.state = {
            items: [],
            count: 0,
            total: 0,
            selectedShipping: '',
            selectedPayment: '',
            validate: false,
            emailErrorField: ''
        };
        this.setSelectedShipping = this.setSelectedShipping.bind(this);
        this.setSelectedPayment = this.setSelectedPayment.bind(this);
        this.redirectToUserScreen = this.redirectToUserScreen.bind(this);
    }

    componentWillMount() {
        getCartItems().then((data) => {
            this.setState({items: data.items, count: data.count, total: data.total})
        });
        this.props.getCheckoutFields().then(async () => {

            if (this.props.checkoutFields.data && this.props.checkoutFields.data.billing) {
                let billing = {};
                await _map(this.props.checkoutFields.data.billing, (value, key) => {
                    billing[key] = '';
                });
                this.setState({billing});
            }
        });
        this.props.getShippingMethods();
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

    setFormField = (inputValue, key) => {
        this.setState({billing: {...this.state.billing, [key]: inputValue}});
    };

    setSelectedShipping(id) {
        this.setState({selectedShipping: id})
    }

    setSelectedPayment(id) {
        this.setState({selectedPayment: id})
    }

    submitOrder = async () => {

        if (this.props.submit.fetching) {
            return;
        }


        this.setState({validate: true, emailErrorField: ''});
        let valid = true;
        let emailErrorField = '';

        if (!this.state.selectedPayment) {
            valid = false;
        }

        if (!this.state.selectedPayment) {
            valid = false;
        }

        await _map(this.props.checkoutFields.data.billing, (value, key) => {
            if (!this.state.billing[key]) {
                valid = false;
            }

            if (key.includes("email") && !emailIsValid(this.state.billing[key])) {
                emailErrorField = key;
            }
        });


        if (valid && !emailErrorField) {
            const request = {
                shipping: this.state.selectedShipping,
                payment: this.state.selectedPayment,
                billing: this.state.billing,
                items: this.state.items
            };


            getUser().then(user => {
                if (user) {
                    request.user = user.ID;
                }
                this.props.submitOrder(request).then(() => {
                    console.log("navifation");
                    console.log(this.props);

                    this.props.emptyCart();
                    this.redirectToUserScreen();

                });
            }).catch((err) => {
                console.log(err);
            });

        }

        this.setState({emailErrorField: emailErrorField});

    };

    redirectToUserScreen = () => {
        const {navigate} = this.props.navigation;
        navigate("UserScreen");
    };


    render() {
        return (<View style={{flex: 1}}>
                {this.props.checkoutFields.data && <ScrollView>
                    {this.state.billing && <BillingForm setFormField={this.setFormField} state={this.state}
                                                        billing={this.props.checkoutFields.data.billing}/>
                    }

                    {this.props.shippingMethods.data &&
                    <ShipmentRadioButtonGroup setSelectedShipping={this.setSelectedShipping} state={this.state}
                                              shippingMethods={this.props.shippingMethods.data}/>
                    }

                    <PaymentRadioButtonGroup setSelectedPayment={this.setSelectedPayment} state={this.state}
                                             gateways={this.props.checkoutFields.data.gateways}/>

                    <Button
                        onPress={() => this.submitOrder()}
                        style={{padding: 5}}
                        title="Оформить заказ"
                        loading={this.props.submit.fetching}
                    />
                </ScrollView>}

                {this.props.checkoutFields.fetching && <CenteredLoadingIdicator/>}

            </View>


        );
    }

}

const BillingForm = ({billing, setFormField, state}) => {
    return <View>
        <Text style={styles.blockTitle}>Контактные данные</Text>
        {_map(billing, (value, key) => {
            let errorText = state.validate && !state.billing[key] ? "Обязательное поле" : "";
            if (key === state.emailErrorField) {
                errorText = "Email указан неверно";
            }
            return <View key={key} style={styles.formContainer}>
                <Text style={styles.formLabel}>{value.label}</Text>
                <Input onChangeText={inputValue => setFormField(inputValue, key)} name={key}
                       placeholder={value.placeholder}
                       errorStyle={styles.errorText}
                       errorMessage={errorText}
                />
            </View>
        })}
    </View>
};

const ShipmentRadioButtonGroup = ({setSelectedShipping, shippingMethods, state}) => {
    const style = state.validate && !state.selectedShipping ? styles.error : null;
    return <View>
        <Text style={[styles.blockTitle, style]}>Способ доставки</Text>
        {
            shippingMethods.map(shipping => (
                <View key={shipping.id}>
                    <CheckBox
                        left
                        title={<View style={styles.shippingContainer}>
                            <Text>{shipping.label}</Text>
                            <Text>{shipping.price}</Text>
                        </View>}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        containerStyle={styles.radioButton}
                        onPress={() => setSelectedShipping(shipping.id)}
                        checked={state.selectedShipping === shipping.id}
                    />
                </View>
            ))
        }
    </View>
};

const PaymentRadioButtonGroup = ({setSelectedPayment, state, gateways}) => {
    const style = state.validate && !state.selectedPayment ? styles.error : null;
    return <View>
        <Text style={[styles.blockTitle, style]}>Способ оплаты</Text>
        {gateways.map(gtw => (
            <View key={gtw.id}>
                <CheckBox
                    left
                    title={<View style={styles.shippingContainer}>
                        <Text>{gtw.title}</Text>
                    </View>}
                    containerStyle={styles.radioButton}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    onPress={() => setSelectedPayment(gtw.id)}
                    checked={state.selectedPayment === gtw.id}
                />
            </View>
        ))}


    </View>
};


const styles = StyleSheet.create(
    {
        formContainer: {
            paddingBottom: 5
        },
        formLabel: {
            padding: 5
        },
        shippingContainer: {
            padding: 5
        },
        blockTitle: {
            padding: 10,
            fontWeight: 'bold',
            backgroundColor: '#F5F5F5'
        },
        radioButton: {
            backgroundColor: '#FFF',
            borderWidth: 0
        },
        error: {
            backgroundColor: '#b61e25',
            color: "#FFF"
        },
        errorText: {
            color: '#b61e25'
        }
    }
);


export default connect()(Checkout);

