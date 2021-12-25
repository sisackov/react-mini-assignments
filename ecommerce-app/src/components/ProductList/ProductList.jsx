import React from 'react';
import './ProductList.css';

const ProductList = ({ products, category, handleAddToCart }) => {
    return (
        <div className='product-list-container'>
            <h2>{category}</h2>
            <div className='product-list'>
                {products.map((product) => {
                    return (
                        <div className='card-list' key={product.id}>
                            <div className='card-list-image'>
                                <img src={product.image} alt={product.title} />
                            </div>
                            <div className='card-list-content'>
                                <h4>{product.title}</h4>
                                <p>{product.description}</p>
                                <p>{`Price: ${product.price}`}</p>
                                <p>{`Rating: Rate:${product.rating.rate}  Count:${product.rating.count}`}</p>
                                <button onClick={handleAddToCart}>
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductList;
