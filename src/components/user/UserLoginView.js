import React from 'react';
import {Linking, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import {Button, Input, Text} from 'react-native-elements';
import {LIST_PAGE, REGISTER_PAGE} from "../../../screens/UserScreen";

class UserLoginView extends React.Component {


    constructor() {
        super();
        this.state = {
            userName: '',
            password: '',
            validate: false
        };
    }

    setFormField = (inputValue, key) => {
        this.setState({[key]: inputValue});
    };


    validateAndLogin = async () => {

        if (this.props.loginData.fetching) {
            return;
        }

        this.setState({validate: true});
        let valid = true;

        if (!this.state.userName) {
            valid = false;
        }

        if (!this.state.password) {
            valid = false;
        }


        if (valid) {
            this.props.login(this.state.userName, this.state.password).then(() => {
                this.props.userLogin();
            });

        }


    };


    renderInput = (fieldName, label, placeholder, isHidden) => {
        let errorText = this.state.validate && !this.state[fieldName] ? "Обязательное поле" : "";

        return <View style={styles.formContainer}>
            <Text style={styles.formLabel}>{label}</Text>
            <Input onChangeText={inputValue => this.setFormField(inputValue, fieldName)} name={label}
                   placeholder={placeholder}
                   errorStyle={styles.errorText}
                   errorMessage={errorText}
                   secureTextEntry={isHidden}
                   autoCapitalize = 'none'
            />
        </View>
    };

    renderLinks = () => {
        return <View>
            <Button
                title="Забыли логин или пароль?"
                type="clear"
                loading={this.props.links.fetching}
                onPress={() => {
                    this.props.getLinks().then(() => {
                        Linking.openURL(this.props.links.data.lost_password)
                    });
                }
                }
            />
            <Button
                title="Регистрация"
                type="clear"
                onPress={() => {
                    this.props.changeActivePage(REGISTER_PAGE);
                }}
            />
        </View>
    };

    render() {
        return (<View style={{flex: 1}}>
                <View>
                    <Text style={styles.blockTitle}>Войти</Text>

                    {this.renderInput("userName", "Email", "Введите Email", false)}
                    {this.renderInput("password", "Пароль", "Введите пароль", true)}

                </View>


                {this.props.loginData.error &&
                <Text style={[styles.blockTitle, styles.error]}>Введен неверный логин или пароль</Text>}


                <Button
                    onPress={() => this.validateAndLogin()}
                    style={{padding: 5}}
                    title="Войти"
                    loading={this.props.loginData.fetching}
                />


                {this.renderLinks()}

            </View>


        );
    }

}


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


export default connect()(UserLoginView);

