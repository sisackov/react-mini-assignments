import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import ProductList from './ProductList/ProductList';
import LandingPage from '../pages/LandingPage';
import Shop from '../pages/Shop';
import Categories from '../pages/Categories';
import NotFound from '../pages/NotFound';
import API from '../api/fakeStore';
import { isLocalStorageInitialized, saveToLocalStorage } from '../data/utils';

class App extends React.Component {
    state = { products: [], categories: [], isLoading: true, errorMsg: '' };

    async componentDidMount() {
        this.setState({ isLoading: true });

        let products = [],
            categories = [];
        if (isLocalStorageInitialized()) {
            products = JSON.parse(localStorage.getItem('products'));
            categories = JSON.parse(localStorage.getItem('categories'));
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
        this.setState({ products, categories, isLoading: false });
    }

    //TODO - add spinner
    render() {
        const { products, categories, isLoading } = this.state;
        return (
            <div>
                <Router>
                    <Navbar />
                    {/* switches purpose renders the first match only */}
                    <Switch>
                        <Route exact path='/' component={LandingPage} />
                        <Route exact path='/shop'>
                            <Shop products={products} categories={categories} />
                        </Route>
                        <Route exact path='/categories'>
                            <Categories categories={categories} />
                        </Route>

                        <Route exact path='/shop/:category'>
                            <ProductList products={products} ha />
                        </Route>

                        {/* <Route exact path='/checkout' component={Checkout} /> */}
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
