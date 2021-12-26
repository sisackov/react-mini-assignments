import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItemsCount: this.props.cartItemsCount,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cartItemsCount !== this.props.cartItemsCount) {
            this.setState({ cartItemsCount: this.props.cartItemsCount });
        }
    }

    render() {
        return (
            <div className='navbar'>
                <Link className='navbar__item' to='/'>
                    Home
                </Link>
                <Link className='navbar__item' to='/shop'>
                    Shop
                </Link>
                <Link className='navbar__item' to='/categories'>
                    Categories
                </Link>
                <Link className='navbar__item' to='/checkout'>
                    {`Cart ${this.state.cartItemsCount}`}
                </Link>
            </div>
        );
    }
}

export default NavBar;
