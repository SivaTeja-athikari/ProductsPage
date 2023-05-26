import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {Component} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
interface IProps {
  navigation: any;
  Products: any;
}
interface IState {
  data: any[];
  isLoaded: boolean;
  inputValue: string;
  text: any;
}
const data = [
  {label: 'Sort by Category A-Z', value: 'categoryAZ'},
  {label: 'Sort by Category Z-A', value: 'categoryZA'},
  {label: 'Sort by Name A-Z', value: 'titleAsc'},
  {label: 'Sort by Name Z-A', value: 'Desc'},
  {label: 'Sort by Lowest price', value: 'priceLw'},
  {label: 'Sort by Highest price', value: 'priceHs'},
];
export class Products extends Component<IProps, IState> {
  state = {
    data: [],
    isLoaded: false,
    inputValue: '',
    text: '',
  };

  componentDidMount = () => {
    fetch(`https://dummyjson.com/products`)
      .then(resp => resp.json())
      .then(resp => {
        this.setState({data: resp.products, isLoaded: true});
      });
  };
  onChangeText = (text: any) => {
    this.setState({inputValue: text});
  };
  displayProducts = () => {
    const filteredProducts = this.state.data.filter((each: any) => {
      if (
        each.title.toLowerCase().includes(this.state.inputValue.toLowerCase())
      ) {
        return each;
      }
    });
    if (filteredProducts) {
      return filteredProducts;
      // console.log(filteredProducts);
    } else {
      return [];
    }
  };
  handleDropdown = (val: any) => {
    let filtervalue = val.value;

    this.setState({text: filtervalue});
  };
  render() {
    const {isLoaded} = this.state;
    const displayProducts = this.displayProducts();

    let result = null;

    switch (this.state.text) {
      case 'priceLw':
        result = displayProducts.sort((a: any, b: any) => {
          if (a.price < b.price) {
            return -1;
          } else if (a.price > b.price) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case 'priceHs':
        result = displayProducts.sort((a: any, b: any) => {
          if (a.price > b.price) {
            return -1;
          } else if (a.price < b.price) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case 'titleAsc':
        result = displayProducts.sort((a: any, b: any) => {
          if (a.title.toUpperCase() < b.title.toUpperCase()) {
            return -1;
          } else if (a.title.toUpperCase() > b.title.toUpperCase()) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case 'Desc':
        result = displayProducts.sort((a: any, b: any) => {
          if (a.title.toUpperCase() > b.title.toUpperCase()) {
            return -1;
          } else if (a.title.toUpperCase() < b.title.toUpperCase()) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case 'categoryAZ':
        result = displayProducts.sort((a: any, b: any) => {
          if (a.category.toUpperCase() < b.category.toUpperCase()) {
            return -1;
          } else if (a.category.toUpperCase() > b.category.toUpperCase()) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case 'categoryZA':
        result = displayProducts.sort((a: any, b: any) => {
          if (a.category.toUpperCase() > b.category.toUpperCase()) {
            return -1;
          } else if (a.category.toUpperCase() < b.category.toUpperCase()) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
    }
    return (
      <View>
        <View>
          <Text style={styles.mainheading}>Products</Text>
        </View>
        <View>
          <TextInput
            placeholder="Search here"
            placeholderTextColor={'black'}
            style={{
              borderColor: 'black',
              borderWidth: 2,
              padding: 6,
              margin: 15,
              borderRadius: 12,
              color: 'black',
            }}
            onChangeText={text => this.onChangeText(text)}
          />

          <View>
            <Dropdown
              style={[styles.dropdown]}
              placeholder="Filter"
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={styles.dropdownText}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              onChange={val => this.handleDropdown(val)}
            />
          </View>
        </View>
        {isLoaded ? (
          <FlatList
            data={displayProducts}
            renderItem={({item}: {item: any}) => {
              return (
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      this.props.navigation.navigate('ProductDescription', {
                        ...item,
                      })
                    }>
                    <View style={styles.cardContainer}>
                      <View style={styles.imagecontainer}>
                        <Image
                          style={{width: 50, height: 100}}
                          source={{uri: `${item.images[0]}`}}
                        />
                      </View>
                      <View style={styles.detailscontainer}>
                        <Text style={styles.productheading}>{item.title}</Text>
                        <Text style={styles.productrating}>
                          Rating: {item.rating}
                        </Text>
                        {/* <Text style={styles.productprice}>₹ {item.price}</Text> */}
                        <Text
                          style={{
                            color: 'green',
                            fontWeight: '800',
                            fontSize: 18,
                          }}>
                          {item.discountPercentage} %off
                          <Text> </Text>
                          <Text
                            style={{
                              color: 'grey',
                              textDecorationLine: 'line-through',
                            }}>
                            {item.price}
                          </Text>
                          <Text style={{color: 'black', padding: 13}}>
                            {' ' +
                              Math.ceil(
                                parseInt(item.price) -
                                  (parseInt(item.price) *
                                    parseInt(item.discountPercentage)) /
                                    100,
                              )}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={item => item.id}
          />
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 15,
    borderWidth: 1,
    borderBottomColor: '#D3D3D3',
    borderTopColor: '#D3D3D3',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  mainheading: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    marginLeft: 15,
    marginTop: 30,
    marginBottom: 30,
  },
  productheading: {
    fontSize: 18,
    color: 'black',
    padding: 6,
  },
  productrating: {
    fontSize: 18,
    color: 'black',
    padding: 6,
  },
  productprice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    padding: 6,
  },
  imagecontainer: {
    width: '30%',
  },
  detailscontainer: {
    width: '70%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
  },
  dropdown: {
    margin: 16,
    height: 50,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    // shadowColor: 'grey',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    // elevation: 2,
  },
  icon: {
    marginRight: 5,
    color: 'black',
  },
  item: {
    padding: 17,
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },

  label: {
    position: 'absolute',
    backgroundColor: 'grey',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'black',
  },
  dropdownText: {
    color: 'black',
  },
});

export default Products;
