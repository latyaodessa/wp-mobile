import React from 'react';
import {Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {AntDesign, Ionicons} from '@expo/vector-icons';
import CenteredLoadingIdicator from '../core/CenteredLoadingIdicator';
import {ListItem, SearchBar} from 'react-native-elements'

const ITEM_WIDTH = Dimensions.get('window').width;

class SearchProductList extends React.Component {


    state = {
        data: [],
        page: 1,
        limit: 10,
        columns: 2,
        query: ''
    };

    componentDidMount() {
        this.props.getCategories().then(() => {
            console.log(this.props);
        });
    }

    fetchProducts = (limit, page, filters) => {
        this.props.getProdcuts(limit, page, filters).then(() => {
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
    };

    setFormField = (inputValue) => {
        this.setState({query: inputValue});
    };

    executeSearch = () => {
        this.setState({
            page: 1,
            limit: 10,
            data: []
        });

        const filters = {
            s: this.state.query
        };

        this.fetchProducts(10, 1, filters);
    };

    executeCategorySearch = (item) => {
        console.log(item);

        this.setState({
            page: 1,
            limit: 10,
            data: [],
            s: ''
        });

        const filters = {
            slug: item.slug
        };

        this.fetchProducts(10, 1, filters);
    };


    render() {
        return (<ScrollView onScroll={({nativeEvent}) => this.fetchMore(nativeEvent)}>
                <SearchBar
                    placeholder={"Поиск по товарам"}
                    onChangeText={inputValue => this.setFormField(inputValue)}
                    value={this.state.query}
                    showLoading={this.props.products.fetching}
                    lightTheme={true}
                    onEndEditing={this.executeSearch.bind(this)}
                    maxLength={15}
                />

                {this.props.categories.data &&
                <CategoriesList categories={this.props.categories.data}
                                executeCategorySearch={this.executeCategorySearch}/>
                }

                {this.state.data.length > 0 &&
                <View style={{flex: 1}}>
                    <ButtonBar changeColumns={(columns) => this.setState({columns: columns})}/>
                    <FlatList
                        numColumns={this.state.columns}
                        key={this.state.columns}
                        data={this.state.data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                    />
                </View>
                }


                {(this.props.products.fetching || this.props.categories.fetching) &&
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

const CategoriesList = ({categories, executeCategorySearch}) => (<View style={{flex: 1}}>
    <FlatList
        key={categories.length}
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => <RenderCategoryItem item={item} executeCategorySearch={executeCategorySearch}/>}
    />
</View>);

const RenderCategoryItem = ({item, executeCategorySearch}) => {
    return <TouchableOpacity
        onPress={() => executeCategorySearch(item.item)}
    >
        <ListItem
            key={item.item.cat_ID}
            title={item.item.name}
            badge={{value: item.item.count, textStyle: {color: '#FFF'}, containerStyle: {marginTop: 0}}}
        />

    </TouchableOpacity>
};

const styles = StyleSheet.create(
    {
        bgContainer: {flex: 1, width: null, height: null},
        buttonsBar: {flexDirection: "row", justifyContent: "space-around"},
        priceTag: {fontWeight: 'bold', padding: 2}
    }
);


export default connect()(SearchProductList);

