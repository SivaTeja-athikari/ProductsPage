import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Products from './src/Products';
import ProductDescription from './src/ProductDescription';
const Stack = createNativeStackNavigator();

interface IProps {}
interface IState {}
export class App extends Component<IProps, IState> {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen
            name="ProductDescription"
            component={ProductDescription}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
