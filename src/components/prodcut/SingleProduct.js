import React from 'react';
import {Dimensions, ScrollView, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {connect} from "react-redux";
import ImageSlider from 'react-native-image-slider';
import {Feather} from '@expo/vector-icons';
import CenteredLoadingIdicator from '../core/CenteredLoadingIdicator';


const ITEM_WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').height;


class SingleProduct extends React.Component {

    state = {
        item: '',
        images: [],
        fetching: false
    };

    componentWillMount() {
        this.fetchProduct(this.props.item);
    }


    fetchProduct = (item) => {

        if (!item) {
            return;
        }

        if (item.id &&
            item.single_image && item.name && item.description &&
            item.price && item.currency) {
            this.fetchImages();
            this.setState({item: item, images: [...this.state.images, item.single_image[0]]})
        } else {
            console.log("FETCING");
            this.setState({fetching: true});
            this.props.getSingleProdcut(item.id).then(() => {
                console.log(this.props.singleProduct);
                this.setState({
                    fetching: false,
                    item: this.props.singleProduct.data,
                    images: [this.props.singleProduct.data.single_image[0], ...this.props.singleProduct.images]
                })
            }).catch(e => {
                console.log(e);
            });
        }
    };

    fetchImages = () => {
        if (this.props.item && this.props.item.gallery_image_ids) {
            this.props.getImagesByIds(this.props.item.gallery_image_ids).then(() => {
                this.setState({images: [...this.state.images, ...this.props.images.data]})
            });
        }
    };

    addItemToCart = (item) => {
        this.props.addToCart(item);
        this.props.showAddToCartMessage();
    };


    renderText = () => {
        const regex = /(<([^>]+)>)/ig;
        const translate_re = /&(nbsp|amp|quot|lt|gt);/g;
        const translate = {
            "nbsp": " ",
            "amp": "&",
            "quot": "\"",
            "lt": "<",
            "gt": ">"
        };
        return <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{this.state.item.description
                .replace(regex, "")
                .replace(translate_re, (match, entity) => (translate[entity])
                )}</Text>
        </View>
    };

    render() {
        return (!this.state.fetching && this.state.item ? <ScrollView>

                    <View style={{height: ITEM_HEIGHT / 2, width: ITEM_WIDTH}}>
                        <ImageSlider images={this.state.images}/>
                    </View>

                    <View style={{
                        display: 'flex',
                        flexDirection: "row",
                        justifyContent: 'space-around'
                    }}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.title}>{this.state.item.name}</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.addItemToCart(this.state.item)}>

                            <View style={styles.cartPriceContainer}>
                                <View style={styles.cartIconContainer}>
                                    <Feather style={styles.cartIcon} name="shopping-cart" size={25}/>
                                </View>
                                <View>
                                    <Text style={styles.price}>{this.state.item.price}</Text>
                                    <Text style={styles.priceTag}>{this.state.item.currency}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {this.renderText()}
                </ScrollView>
                : <CenteredLoadingIdicator/>


        );
    }

}


const styles = StyleSheet.create(
    {
        title: {
            fontSize: 16,
            fontWeight: 'bold',
            padding: 5
        },
        price: {
            fontSize: 20,
            fontWeight: 'bold'
        },
        headerContainer: {flex: 0.9, flexWrap: 'wrap'},
        priceTag: {fontWeight: 'bold', padding: 2},
        description: {marginTop: 10},
        cartIconContainer: {
            width: 50,
            height: 50,
            borderRadius: 100 / 2,
            backgroundColor: '#009688',
            justifyContent: 'center',
            alignItems: 'center'
        },
        cartIcon: {
            color: '#FFF'
        },
        cartPriceContainer: {
            display: 'flex',
            top: -30,
            justifyContent: 'center',
            alignItems: 'center'
        },
        descriptionContainer: {},
        descriptionText: {
            padding: 5
        }
    }
);


export default connect()(SingleProduct);

