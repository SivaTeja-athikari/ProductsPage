import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import React, {Component} from 'react';
interface IProps {
  item: any;
  route: any;
}
interface IState {}
class ProductDescription extends Component<IProps, IState> {
  renderItem({item}: {item: any}) {
    return (
      <View>
        <Image source={{uri: `${item}`}} style={styles.tinyLogo} />
      </View>
    );
  }
  render() {
    const items = this.props.route.params;
    const image = items.images;
    console.log(this.props);
    return (
      <View style={styles.bgcontainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                margin: 10,
              }}>
              <Image style={styles.tinyLogo} source={{uri: `${image[0]}`}} />
            </View> */}
            <Carousel
              layout={'tinder'}
              data={image}
              renderItem={this.renderItem}
              sliderWidth={300}
              itemWidth={300}
            />
            <View style={{padding: 4}}>
              <View style={styles.viewcontainer}>
                <Text style={styles.view}>View in 360</Text>
                <Text style={styles.viewtext}>
                  Check how this looks from all..
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',

                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderBottomColor: '#DDDDDD',
                    borderTopColor: '#DDDDDD',
                    padding: 15,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                  }}>
                  <Text style={{color: 'black', fontSize: 14}}>
                    {' '}
                    Color:
                    <Text
                      style={{color: 'black', fontSize: 17, fontWeight: '800'}}>
                      Steel Black
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderBottomColor: '#DDDDDD',
                    borderTopColor: '#DDDDDD',
                    padding: 15,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                  }}>
                  <Text style={{color: 'black', fontSize: 14}}>
                    {' '}
                    Storage:
                    <Text
                      style={{color: 'black', fontSize: 17, fontWeight: '800'}}>
                      128 GB
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderBottomColor: '#DDDDDD',
                    borderTopColor: '#DDDDDD',
                    padding: 16,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                  }}>
                  <Text style={{color: 'black', fontSize: 14}}>
                    RAM:
                    <Text
                      style={{color: 'black', fontSize: 17, fontWeight: '800'}}>
                      8 GB
                    </Text>
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.category}>
                  Category:{' '}
                  <Text style={styles.detailCategory}>{items.category}</Text>
                </Text>
                <Text style={{fontSize: 14, color: 'black', padding: 15}}>
                  {items.brand}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '800',
                    padding: 15,
                  }}>
                  {items.title}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 12,
                  }}>
                  <Text style={{color: 'green', fontSize: 22}}>
                    {' '}
                    $ {items.price}
                  </Text>
                  <Text style={{color: 'black', fontSize: 18}}>
                    {' '}
                    Rating: <Text style={{color: 'red'}}>{items.rating}</Text>
                  </Text>
                </View>
                <View style={{padding: 15}}>
                  <Text style={{color: 'blue', fontSize: 20, padding: 12}}>
                    Product Description:
                  </Text>
                  <Text style={{color: 'black', fontSize: 17, padding: 12}}>
                    {items.description}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgcontainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    paddingTop: 3,
  },
  scrollView: {
    marginHorizontal: 10,
  },
  container: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: '100%',
    height: 500,
    alignItems: 'center',
    borderRadius: 0,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'center',
    height: '50%',
  },
  itemImage: {
    width: 400,
    height: 400,
  },
  view: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
  viewtext: {
    color: 'grey',
    fontSize: 18,
    fontWeight: '300',
  },
  viewcontainer: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'blue',
    margin: 10,
    padding: 13,
  },
  category: {
    color: 'black',
    fontSize: 18,
    padding: 15,
  },
  category1: {
    color: 'green',
    fontSize: 19,
  },
  detailCategory: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailCategory1: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default ProductDescription;
