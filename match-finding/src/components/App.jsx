import React from 'react';
import ButtonComponent from './ButtonComponent';
import CounterComponent from './CounterComponent';
import './styles/App.css';


const MAX_COUNT = 10;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            approved: 0,
            rejected: 0,
            imageUrl: '',
            isDone: false,
            isError: false,
        };
    }

    componentDidMount() {
        this.setState({
            imageUrl: this.getImageUrl(this.state.currentIndex),
        });
    }

    getImageUrl = (index) => {
        return `https://picsum.photos/500/500?random=${index}`;
    }

    setImageAndIndex = (index) => {
        this.setState({
            currentIndex: index,
            imageUrl: this.getImageUrl(index),
            isDone: index >= MAX_COUNT,
        });
    }

    handleApproveClick = () => {
        let { currentIndex, approved } = this.state;
        approved++;
        currentIndex++;
        this.setState({
            approved: approved,
        });
        this.setImageAndIndex(currentIndex);
    }

    handleRejectClick = () => {
        let { currentIndex, rejected } = this.state;
        currentIndex++;
        rejected++;
        this.setState({
            rejected: rejected,
        });
        this.setImageAndIndex(currentIndex);
    }

    renderDone = () => {
        const { approved, rejected } = this.state;
        return (
            <div className='app-container'>
                {approved > rejected ? 'You must really like this' : 'You really dont like this'}
            </div>
        );
    }

    render() {
        const { approved, rejected, imageUrl, isDone } = this.state;
        if (isDone) {
            return this.renderDone();
        } else {
            return (
                <div className='app-container'>
                    <div className='button-row'>
                        <CounterComponent counter={rejected} label='rejected' color='red' />
                        <CounterComponent counter={approved} label='approved' color='green' />
                    </div>
                    <img
                        alt='Random Picsum'
                        src={imageUrl}
                    />
                    <div className='button-row'>
                        <ButtonComponent label='dislike' parentClickHandler={this.handleRejectClick} />
                        <ButtonComponent label='like' parentClickHandler={this.handleApproveClick} />
                    </div>
                </div>
            );
        }
    }
}

export default App;
