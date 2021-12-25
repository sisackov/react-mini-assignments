import React from 'react';
import FormComponent from './FormComponent/FormComponent';
import API from '../api/mockApi';
import CardList from './CardList/CardList';
import Modal from './Modal/Modal';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedItem: { title: '' },
            showModal: false,
            isLoading: false,
            errorMsg: '',
        };
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        try {
            const { data } = await API.get('shoes');
            this.setState({ data, isLoading: false });
        } catch (e) {
            this.setState({ errorMsg: e.message });
        }
    }

    openNewItemForm = () => {
        this.setState({
            showModal: true,
            selectedItem: { name: '' },
        });
    };

    handleSave = (item, isNew) => {
        if (isNew) {
            this.handleCreate(item);
        } else {
            this.handleUpdate(item);
        }
    };

    handleEditClick = (item) => {
        console.log('handleEditClick: ', item);
        this.setState({
            showModal: true,
            selectedItem: item,
        });
    };

    handleCreate = async (newItem) => {
        try {
            const { data } = await API.post('/shoes/', newItem);
            this.setState((state) => {
                return { data: [...state.data, data], showModal: false };
            });
        } catch (e) {
            this.setState({ errorMsg: e.message, showModal: false });
        }
    };

    handleUpdate = async (updatedItem) => {
        try {
            const { data } = await API.put(
                `/shoes/${updatedItem.id}`,
                updatedItem
            );
            const newItems = data.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
            );
            this.setState({ data: newItems, showModal: false });
        } catch (e) {
            this.setState({ errorMsg: e.message, showModal: false });
        }
    };

    handleDelete = async (item) => {
        try {
            await API.delete(`/shoes/${item.id}`);
            this.setState({
                data: this.state.data.filter((i) => i.id !== item.id),
            });
        } catch (e) {
            this.setState({ errorMsg: e.message });
        }
    };

    render() {
        const { data, selectedItem, showModal, errorMsg } = this.state;
        return (
            <div>
                <div className='header'>
                    <h1>Shoes Catalog</h1>
                    <button onClick={this.openNewItemForm}>New Shoe</button>
                    <p>{errorMsg || '____'}</p>
                    {/* TODO:proper error message */}
                </div>
                <CardList
                    data={data}
                    handleEdit={this.handleEditClick}
                    handleDelete={this.handleDelete}
                />
                <Modal
                    show={showModal}
                    handleClose={() => this.setState({ showModal: false })}
                >
                    <FormComponent
                        item={selectedItem}
                        handleSave={this.handleSave}
                        handleCancel={() => this.setState({ showModal: false })}
                    />
                </Modal>
                {/*  */}
            </div>
        );
    }
}

export default App;
