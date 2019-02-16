import React from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";

class ProductList extends React.Component {


    state = {
        data: [],
        page: 1,
        limit: 10
    };

    componentWillMount() {
        this.fetchProducts(this.state.limit, this.state.page);
    }

    fetchProducts = (limit, page) => {
        console.log(limit, page);
        this.props.getProdcuts(limit, page).then(() => {
            this.setState({data: [...this.state.data, ...this.props.data]})
        });
    };

    fetchMore = () => {
        let page = ++this.state.page;
        this.fetchProducts(this.state.limit, page);
        this.setState({page: page})
    };

    render() {
        return (<View style={{flexDirection: 'table', justifyContent: 'space-around'}}>

                <TextInput placeholder={"test placeholder"}
                           style={{borderWidth: 1, borderColor: 'black', height: 50, flex: 1, padding: 5}}/>

                <TouchableOpacity onPress={() => this.fetchMore()}>
                    <View style={{height: 50}}>
                        <Text>PRESS</Text>
                    </View>

                    {this.state.data.length > 0 &&
                    this.state.data.map(prd => {
                        return <View key={prd.id}>
                            <Image
                                resizeMode='cover'
                                style={{height: 300}}
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

