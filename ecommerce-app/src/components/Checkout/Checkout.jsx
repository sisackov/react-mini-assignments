import React from 'react';
import { Link } from 'react-router-dom';
import './Checkout.css';

const Checkout = (props) => {
    const {
        products,
        cartItems,
        handleAddItem,
        handleDeductItem,
        handlePayment,
    } = props;
    const itemsInCheckout = cartItems.map((item) => {
        const prod = products.find((product) => product.id === item.productId);
        return { ...prod, quantity: item.quantity };
    });

    const checkoutItemsContainer = itemsInCheckout.map((item) => {
        return (
            <div
                className='checkout-card-container'
                key={`checkout-${item.id}`}
            >
                <div className='checkout-card'>
                    <div className='checkout-card-image'>
                        <img src={item.image} alt={item.title} />
                    </div>
                    <div className='checkout-card-details'>
                        <h4>{item.title}</h4>
                        <p>{`Price: $${item.price}`}</p>
                    </div>
                </div>
                <div className='checkout-card-buttons'>
                    <button
                        className='btn btn-primary'
                        onClick={() => handleDeductItem(item.id)}
                    >
                        -
                    </button>
                    <div className='checkout-item-count'>{item.quantity}</div>
                    <button
                        className='btn btn-primary'
                        onClick={() => handleAddItem(item.id)}
                    >
                        +
                    </button>
                </div>
            </div>
        );
    });

    const totalItems = itemsInCheckout.reduce((acc, item) => {
        return acc + item.quantity;
    }, 0);

    const totalPrice = itemsInCheckout.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    return (
        <div className='checkout-wrapper'>
            <h2>Checkout</h2>
            <div className='checkout-container'>{checkoutItemsContainer}</div>
            <div className='checkout-total'>
                <h3>Total Items: {totalItems}</h3>
                <h3>
                    Total Price: $
                    {(Math.round(totalPrice * 100) / 100).toFixed(2)}
                </h3>

                <Link to='/payment'>
                    <button
                        className='btn btn-primary'
                        onClick={() => handlePayment()}
                    >
                        Proceed to payment
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Checkout;
