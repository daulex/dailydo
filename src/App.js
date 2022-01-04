import React from 'react';
import { TodoList } from './Components/TodoList';
import AuthContainer from './Components/Auth/AuthContainer';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token') || false
        }
        this.pushToken = this.pushToken.bind(this);
    }

    pushToken = (token) => {
        this.setState({token: token});
    }

    render(){

        return (
            <div className="App">
                {this.state.token ?
                    <TodoList /> :
                    <AuthContainer pushToken={this.pushToken} />}
            </div>
        );
    }
}
