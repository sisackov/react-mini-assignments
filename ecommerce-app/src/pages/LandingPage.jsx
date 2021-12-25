import React from 'react';

class LandingPage extends React.Component {
    state = { products: [], categories: [], isLoading: false, errorMsg: '' };

    render() {
        return (
            <div>
                {this.state.isLoading ? (
                    <h1>Loading Data</h1>
                ) : (
                    <h1>
                        This is my beautiful landing page Not sure that I need
                        it
                    </h1>
                )}
            </div>
        );
    }
}

export default LandingPage;
