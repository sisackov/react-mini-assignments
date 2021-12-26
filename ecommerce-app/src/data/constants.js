import capImage from '../images/cap-category.png';
import shoeImage from '../images/shoes-category.png';
import menImage from '../images/men-category.png';
import womenImage from '../images/women-category.png';

export const categoryItems = {
    electronics: { title: 'Electronics', image: capImage, link: 'electronics' },
    jewelery: { title: 'Jewelry', image: shoeImage, link: 'jewelery' },
    "men's clothing": {
        title: `Men's clothing`,
        image: menImage,
        link: 'men',
    },
    "women's clothing": {
        title: `Women's clothing`,
        image: womenImage,
        link: 'women',
    },
};

export const categoryTitles = {
    electronics: 'Electronics',
    jewelery: 'Jewelry',
    men: `Men's clothing`,
    women: `Women's clothing`,
};
