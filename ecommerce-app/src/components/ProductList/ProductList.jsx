import React from 'react';
import { categorySearches, categoryTitles } from '../../data/constants';
import './ProductList.css';

const ProductList = (props) => {
    const { products, handleAddToCart } = props;
    const categoryTitle = categoryTitles[props.match.params.category];
    const category = categorySearches[props.match.params.category];
    const productsInCategory = products.filter(
        (product) => product.category === category
    );
    console.log('products', products);
    console.log('productsInCategory', productsInCategory);
    console.log('category', category);

    return (
        <div className='product-list-wrapper'>
            <h2>{categoryTitle}</h2>
            <div className='product-list-container'>
                {productsInCategory.map((product) => {
                    return (
                        <div className='card-container' key={product.id}>
                            <div className='card-image'>
                                <img src={product.image} alt={product.title} />
                            </div>
                            <h4>{product.title}</h4>
                            <p>{product.description}</p>
                            <p>{`Price: ${product.price}`}</p>
                            <p>{`Rating: Rate:${product.rating.rate}  Count:${product.rating.count}`}</p>
                            <button
                                className='btn btn-primary'
                                onClick={() => handleAddToCart(product)}
                            >
                                Add To Cart
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductList;
