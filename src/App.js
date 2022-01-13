import React from 'react';
import { TodoList } from './Components/Todo/TodoList';
import { Nav } from './Components/Nav/Nav';
import AuthContainer from './Components/Auth/AuthContainer';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token') || false,
            conf: {
                apiDomain: process.env.REACT_APP_API_DOMAIN,
                todosRoute: '/wp-json/myplugin/v1/author/1',
                authRoute: '/wp-json/jwt-auth/v1/token'
            }
        }
        this.pushToken = this.pushToken.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    pushToken = (token) => {
        this.setState({token: token});
    }
    logOut = (e) => {
        e.preventDefault();
        this.setState({token: false});
        localStorage.removeItem('token');
    }

    render(){
        return (
            <div className="App">
                {this.state.token ?
                    <div><Nav logOut={this.logOut} /><TodoList /></div> :
                    <AuthContainer action={this.props.action ?? 'login'} pushToken={this.pushToken} />}
            </div>
        );
    }
}
