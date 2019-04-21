import React from 'react';
import {Dimensions, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {connect} from "react-redux";
import {AntDesign, Ionicons} from '@expo/vector-icons';
import CenteredLoadingIdicator from '../core/CenteredLoadingIdicator';

const ITEM_WIDTH = Dimensions.get('window').width;

class ProductList extends React.Component {


    state = {
        data: [],
        page: 1,
        limit: 10,
        columns: 2
    };

    componentWillMount() {
        this.fetchProducts(this.state.limit, this.state.page);
    }

    fetchProducts = (limit, page) => {
        this.props.getProdcuts(limit, page).then(() => {
            this.setState({data: [...this.state.data, ...this.props.products.data]})
        });
    };

    fetchMore = (nativeEvent) => {
        if (this.isCloseToBottom(nativeEvent) && !this.props.products.fetching && this.props.products.fetched) {
            let page = ++this.state.page;
            this.fetchProducts(this.state.limit, page);
            this.setState({page: page})
        }
    };

    isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
        return layoutMeasurement.height + contentOffset.y
            >= contentSize.height - 50;
    }


    renderItem = ({item}) => {

        const {navigate} = this.props.navigation.navigation;

        return <TouchableOpacity onPress={() => navigate('SingleProductScreen', {
            item: item
        })}>
            <View style={{width: ITEM_WIDTH / this.state.columns, padding: 5, display: "flex", flexDirection: "table"}}>
                <Image
                    resizeMode='cover'
                    style={{height: 200}}
                    source={{uri: item.single_image[0]}}
                />
                <Text numberOfLines={2}>{item.name}</Text>
                <View style={{display: "flex", flexDirection: "row"}}>
                    <Text style={styles.priceTag}>{item.price}</Text>
                    <Text style={styles.priceTag}>{item.currency}</Text>
                </View>
            </View>
        </TouchableOpacity>
    }

    render() {
        return (<ScrollView onScroll={({nativeEvent}) => this.fetchMore(nativeEvent)}>

                <ButtonBar changeColumns={(columns) => this.setState({columns: columns})}/>
                {this.state.data.length > 0 &&
                <FlatList
                    numColumns={this.state.columns}
                    key={this.state.columns}
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem}
                />
                }

                {this.props.products.fetching &&
                <CenteredLoadingIdicator/>
                }

            </ScrollView>


        );
    }

}

const ButtonBar = ({changeColumns}) => (<View style={styles.buttonsBar}>
    <TouchableOpacity onPress={() => changeColumns(2)}>
        <AntDesign name="appstore-o" size={32} color="grey"/>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => changeColumns(1)}>
        <Ionicons name="md-square-outline" size={32} color="grey"/>
    </TouchableOpacity>
</View>);

const styles = StyleSheet.create(
    {
        bgContainer: {flex: 1, width: null, height: null},
        buttonsBar: {flexDirection: "row", justifyContent: "space-around"},
        priceTag: {fontWeight: 'bold', padding: 2}
    }
);


export default connect()(ProductList);

