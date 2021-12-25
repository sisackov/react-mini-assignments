import React from 'react';
import { Link } from 'react-router-dom';
import { getFromLocalStorage } from '../data/utils';

const NavBar = (props) => {
    const styleContainer = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        background: 'gray',
        borderBottom: '1px solid black',
        height: '50px',
    };
    const styleNavItem = {
        marginRight: '1rem',
    };

    const getNumberOfItemsInCart = () => {
        const cart = getFromLocalStorage('cart');
        return cart ? cart.length : 0;
    };

    return (
        <div style={styleContainer}>
            <Link style={styleNavItem} to='/'>
                Home
            </Link>
            <Link style={styleNavItem} to='/shop'>
                Shop
            </Link>
            <Link style={styleNavItem} to='/categories'>
                Categories
            </Link>
            <Link style={styleNavItem} to='/checkout'>
                Cart {getNumberOfItemsInCart()}
            </Link>
        </div>
    );
};

export default NavBar;
