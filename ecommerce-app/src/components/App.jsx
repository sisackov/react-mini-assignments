import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import ProductList from './ProductList/ProductList';
import Checkout from './Checkout/Checkout';
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
            products = getFromLocalStorage('products');
            categories = getFromLocalStorage('categories');
            cartItems = getFromLocalStorage('cartItems') || [];
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

    handleAddRemoveItem = (productId, quantity) => {
        const { cartItems } = this.state;
        const newCart = cartItems
            .map((item) => {
                if (item.productId === productId) {
                    return { ...item, quantity: item.quantity + quantity };
                }
                return item;
            })
            .filter((item) => item.quantity > 0);
        this.setState({ cartItems: newCart });
        saveToLocalStorage('cartItems', newCart);
    };

    handleAddItem = (productId) => {
        this.handleAddRemoveItem(productId, 1);
    };

    handleDeductItem = (productId) => {
        this.handleAddRemoveItem(productId, -1);
    };

    //TODO - add spinner
    render() {
        const { products, categories, cartItems, isLoading } = this.state;
        return (
            <div>
                <Router>
                    <NavBar cartItemsCount={cartItems.length} />
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
                        <Route exact path='/checkout'>
                            <Checkout
                                products={products}
                                cartItems={cartItems}
                                handleAddItem={this.handleAddItem}
                                handleDeductItem={this.handleDeductItem}
                            />
                        </Route>
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
