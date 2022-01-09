import React from 'react';
import { TodoList } from './Components/Todo/TodoList';
import AuthContainer from './Components/Auth/AuthContainer';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token') || false,
            conf: {
                apiDomain: 'http://ddapi.awave.site',
                todosRoute: '/wp-json/myplugin/v1/author/1',
                authRoute: '/wp-json/jwt-auth/v1/token'
            }
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
