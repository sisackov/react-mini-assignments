import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import ProductList from './ProductList/ProductList';
import LandingPage from '../pages/LandingPage';
import Shop from '../pages/Shop';
import Categories from '../pages/Categories';
import NotFound from '../pages/NotFound';
import API from '../api/fakeStore';
import {
    getFromLocalStorage,
    isLocalStorageInitialized,
    saveToLocalStorage,
} from '../data/utils';

class App extends React.Component {
    state = {
        products: [],
        categories: [],
        cartItems: [],
        isLoading: true,
        errorMsg: '',
    };

    async componentDidMount() {
        this.setState({ isLoading: true });

        let products = [],
            categories = [],
            cartItems = [];
        if (isLocalStorageInitialized()) {
            products = JSON.parse(localStorage.getItem('products'));
            categories = JSON.parse(localStorage.getItem('categories'));
            cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        } else {
            try {
                const productsData = await API.get('products');
                const categoriesData = await API.get('products/categories');
                products = productsData.data;
                categories = categoriesData.data;

                saveToLocalStorage('products', products);
                saveToLocalStorage('categories', categories);
            } catch (e) {
                this.setState({ errorMsg: e.message });
            }
        }
        this.setState({ products, categories, cartItems, isLoading: false });
    }

    handleAddToCart = (product) => {
        const { cartItems } = this.state;
        const newItem = { productId: product.id, quantity: 1 };
        const newCart = cartItems ? [...cartItems, newItem] : [newItem];
        this.setState({ cartItems: newCart });
        saveToLocalStorage('cartItems', newCart);
    };

    //TODO - add spinner
    render() {
        const { products, categories, cartItems, isLoading } = this.state;
        console.log('cartItems', cartItems);
        return (
            <div>
                <Router>
                    <NavBar cartItemsCount={cartItems ? cartItems.length : 0} />
                    {/* switches purpose renders the first match only */}
                    <Switch>
                        <Route exact path='/' component={LandingPage} />
                        <Route exact path='/shop'>
                            <Shop products={products} categories={categories} />
                        </Route>
                        <Route exact path='/categories'>
                            <Categories categories={categories} />
                        </Route>
                        <Route
                            exact
                            path='/shop/:category'
                            render={(props) => (
                                <ProductList
                                    products={products}
                                    handleAddToCart={this.handleAddToCart}
                                    {...props}
                                />
                            )}
                        />

                        {/* <Route exact path='/checkout' component={Checkout} /> */}
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
