import React from 'react';
import './styles/ButtonComponent.css';
import { ButtonImageMap } from './Constants';

class ButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        const label = this.props.label;
        this.state = {
            btnLabel: label,
            btnImage: ButtonImageMap[label],
        };
    }

    render() {
        return (
            <button
                className='button-container'
                onClick={(e) => {
                    console.log(`${this.state.btnLabel} button clicked`);
                    this.props.parentClickHandler(e);
                }}
            >
                <img
                    className={`button-image--small`}
                    src={this.state.btnImage}
                    alt={this.state.btnLabel}
                />
            </button>
        );
    }
}

export default ButtonComponent;
