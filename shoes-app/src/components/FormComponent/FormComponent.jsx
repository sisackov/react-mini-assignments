import React, { Fragment } from 'react';
import InputText from '../InputText/InputText';
import InputTextArea from '../InputTextArea/InputTextArea';

class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            isNew: true,
            name: '',
            description: '',
            price: '',
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.item.name !== this.props.item.name) {
            const { name, description, price } = this.props.item;
            this.setState({
                item: this.props.item,
                isNew: !name,
                name: name,
                description: description || '',
                price: price || '',
            });
        }
    }

    handleInputUpdate = (fieldName, text) => {
        this.setState({
            [fieldName]: text,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { item, isNew, name, description, price } = this.state;
        if (name && description && price) {
            item.name = name;
            item.description = description;
            item.price = price;
            this.props.handleSave(item, isNew);
        } //TODO validate or show error
    };

    render() {
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                    <h1>{`${
                        this.state.isNew ? 'New' : 'Update'
                    } Product Form`}</h1>
                    <InputText
                        inputName='name'
                        label='Shoe Name'
                        inputValue={this.state.name}
                        inputValidator={(text) => {
                            return text.length > 0;
                        }}
                        inputFocusOut={this.handleInputUpdate}
                    />
                    <InputTextArea
                        inputName='description'
                        label='Description'
                        inputValue={this.state.description}
                        inputValidator={(text) => {
                            return text.length > 0;
                        }}
                        inputFocusOut={this.handleInputUpdate}
                    />
                    <InputText
                        inputName='price'
                        label='Price'
                        inputValue={this.state.price}
                        inputFocusOut={this.handleInputUpdate}
                    />
                    <div className='field'>
                        <button
                            type='button'
                            className='field-button'
                            onClick={this.handleSubmit}
                        >
                            Save
                        </button>
                        <button
                            type='button'
                            className='field-button'
                            onClick={this.props.handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Fragment>
        );
    }
}

export default FormComponent;
