import React from 'react';
import {Linking, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import {Button, Input, Text} from 'react-native-elements';
import {LOGIN_PAGE} from "../../../screens/UserScreen";

class UserLoginView extends React.Component {


    constructor() {
        super();
        this.state = {
            userName: '',
            password: '',
            password_second: '',
            validate: false,
            error: null
        };
    }

    setFormField = (inputValue, key) => {
        this.setState({[key]: inputValue});
    };


    validateAndRegister = async () => {

        if (this.props.loginData.fetching) {
            return;
        }

        this.setState({error: null});


        this.setState({validate: true});
        let valid = true;

        if (!this.state.userName) {
            valid = false;
        }

        if (!this.state.password) {
            valid = false;
        }

        if (!this.state.password_second) {
            valid = false;
        }

        if (this.state.password !== this.state.password_second) {
            valid = false;
            this.setState({error: "Пароли не совпадают"})
        }


        if (valid) {
            this.props.register(this.state.userName, this.state.password).then(() => {
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
                   autoCapitalize='none'
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
                title="Войти"
                type="clear"
                onPress={() => {
                    this.props.changeActivePage(LOGIN_PAGE);
                }}
            />
        </View>
    };

    render() {
        return (<View style={{flex: 1}}>
                <View>
                    <Text style={styles.blockTitle}>Зарегистрироваться</Text>

                    {this.renderInput("userName", "Email", "Введите Email", false)}
                    {this.renderInput("password", "Пароль", "Введите пароль", true)}
                    {this.renderInput("password_second", "Повторите пароль", "Повторите пароль", true)}


                </View>


                {this.state.error &&
                <Text style={[styles.blockTitle, styles.error]}>{this.state.error}</Text>}


                {this.props.loginData.error &&
                <Text style={[styles.blockTitle, styles.error]}>Пользователь с таким Email уже существует</Text>}


                <Button
                    onPress={() => this.validateAndRegister()}
                    style={{padding: 5}}
                    title="Зарегистрироваться"
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

