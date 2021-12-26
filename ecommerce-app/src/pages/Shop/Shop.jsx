import React from 'react';
import { Link } from 'react-router-dom';
import { categoryItems } from '../../data/constants';
import './Shop.css';

class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: props.products,
            categories: props.categories,
            isLoading: false,
            errorMsg: '',
        };
    }

    handleClick = () => {
        this.props.history.goBack();
    };

    renderProductRow = (category) => {
        const products = this.state.products.filter(
            (product) => product.category === category
        );
        return products.slice(0, 3).map((product) => {
            return (
                <div className='col-4' key={product.id}>
                    <div className='card'>
                        <img
                            className='card-img-top'
                            src={product.image}
                            alt={product.title}
                        />
                        <div className='card-body'>
                            <h5 className='card-title'>{product.title}</h5>
                            <p className='card-text'>${product.price}</p>
                        </div>
                    </div>
                </div>
            );
        });
    };

    render() {
        return (
            this.state.categories &&
            this.state.categories.map((category) => {
                return (
                    <div className='category-section' key={category}>
                        <h3>{categoryItems[category].title}</h3>
                        <div className='product-row'>
                            {this.renderProductRow(category)}
                        </div>
                        <Link to={`/shop/${category}`}>
                            {' '}
                            See more in {category}{' '}
                        </Link>
                    </div>
                );
            })
        );
    }
}

export default Shop;
