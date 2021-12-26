import React from 'react';
import './Spinner.css';

class Spinner extends React.Component {
    renderSpinner1() {
        return <div className='spinner-1' />;
    }

    renderSpinner2() {
        return <div className='spinner-2' />;
    }

    renderSpinner3() {
        return (
            <div className='spinner-3'>
                <div className='dot-1' />
                <div className='dot-2' />
                <div className='dot-3' />
            </div>
        );
    }

    render() {
        return (
            <div className='background-spinner'>{this.renderSpinner2()}</div>
        );
    }
}

Spinner.defaultProps = {
    message: 'Loading...',
};

export default Spinner;
