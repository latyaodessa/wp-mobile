import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import {connect} from "react-redux";

class ProductList extends React.Component {

    state = {
        data: []
    };

    fetchProducts = () => {
        this.props.getProdcuts().then(() => {
            this.setState({data: [...this.state.data, ...this.props.data]})
        });
    };

    render() {
        return (<View style={{flexDirection: 'table', justifyContent: 'space-around'}}>

                <TextInput placeholder={"test placeholder"}
                           style={{borderWidth: 1, borderColor: 'black', height: 50, flex: 1, padding: 5}}/>

                <TouchableOpacity onPress={() => this.fetchProducts()}>
                    <View style={{height: 50}}>
                        <Text>PRESS</Text>
                    </View>

                    {this.state.data.length > 0 &&
                    this.state.data.map(prd => {
                        return <View key={prd.id}>
                            <Image
                                resizeMode='cover'
                                style={{height: 200}}
                                source={{uri: prd.single_image[0]}}
                            />
                        </View>
                    })

                    }

                </TouchableOpacity>
            </View>


        );
    }

}

const styles = StyleSheet.create(
    {bgContainer: {flex: 1, width: null, height: null}}
    );


export default connect()(ProductList);

