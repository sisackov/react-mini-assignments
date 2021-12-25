import React from 'react';
import { Link } from 'react-router-dom';
import { categoryItems } from '../data/constants';

const Categories = ({ categories }) => {
    // const handleClick = () => {
    //     this.props.history.goBack();
    // };

    // <div>
    //     <button onClick={this.handleClick}>back</button>
    // </div>

    return categories.map((category) => {
        const categoryItem = categoryItems[category];
        return (
            <Link
                key={category}
                className='category-card'
                to={`/shop/${categoryItem.link}`}
            >
                <h3>{categoryItem.title}</h3>
                <img src={categoryItem.image} alt={categoryItem.title} />
            </Link>
        );
    });
};

export default Categories;
