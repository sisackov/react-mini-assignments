import React from 'react';
import './CardList.css';
import SHOE_LOGO_IMG from '../../images/shoe-logo.jpg';

const CardList = ({ data, handleDelete, handleEdit }) => {
    return (
        <div className='card-list-container'>
            {data.map((item) => (
                <div key={item.id} className='card-container'>
                    <div className='card-image'>
                        <img src={SHOE_LOGO_IMG} alt='shoe logo' />
                    </div>
                    <div className='card-content'>
                        <div className='card-header'>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>{`Price:  ${item.price}`}</p>
                        </div>
                        <div className='card-footer'>
                            <button onClick={() => handleEdit(item)}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(item)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardList;
