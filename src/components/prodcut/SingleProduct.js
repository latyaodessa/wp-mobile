import React from 'react';
import {Dimensions, ScrollView, StyleSheet, TouchableOpacity, View, Button} from "react-native";
import {connect} from "react-redux";
import ImageSlider from 'react-native-image-slider';
import {Text} from "react-native-elements";
import {Feather} from '@expo/vector-icons';


const ITEM_WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').height;


class SingleProduct extends React.Component {

    state = {
        item: '',
        images: []
    };

    componentWillMount() {
        this.fetchProduct();
        this.fetchImages();
    }

    fetchProduct = () => {
        this.setState({item: this.props.item, images: [...this.state.images, this.props.item.single_image[0]]})
    };

    fetchImages = () => {
        this.props.getImagesByIds(this.props.item.gallery_image_ids).then(() => {
            this.setState({images: [...this.state.images, ...this.props.images.data]})
        });
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
            <Text style={styles.descriptionText}>{this.props.item.description
                .replace(regex, "")
                .replace(translate_re, (match, entity) => (translate[entity])
                )}</Text>
        </View>
    };

    render() {
        console.log(this.props);
        return (<ScrollView>
                <View style={{height: ITEM_HEIGHT / 2, width: ITEM_WIDTH}}>
                    <ImageSlider images={this.state.images}/>
                </View>

                <View style={{
                    display: 'flex',
                    flexDirection: "row",
                    justifyContent: 'space-around'
                }}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>{this.props.item.name}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.addItemToCart(this.props.item)}>

                        <View style={styles.cartPriceContainer}>
                            <View style={styles.cartIconContainer}>
                                <Feather style={styles.cartIcon} name="shopping-cart" size={25}/>
                            </View>
                            <View>
                                <Text style={styles.price}>{this.props.item.price}</Text>
                                <Text style={styles.priceTag}>{this.props.item.currency}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                {this.renderText()}
            </ScrollView>


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

