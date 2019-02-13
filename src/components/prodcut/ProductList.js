import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";

class ProductList extends React.Component {

    fetchProducts = () => {
        this.props.getProdcuts();
    };

    render() {
        return (<View style={{flexDirection: 'row', justifyContent: 'space-around'}}>

                <TextInput placeholder={"test placeholder"}
                           style={{borderWidth: 1, borderColor: 'black', height: 50, flex: 1, padding: 5}}/>

                <TouchableOpacity onPress={() => this.fetchProducts()}>
                    <View style={{height: 50}}>
                        <Text>PRESS</Text>
                    </View>

                </TouchableOpacity>
            </View>


        );
    }

}


export default connect()(ProductList);

