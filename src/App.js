import React from 'react';
import { TodoList } from './Components/Todo/TodoList';
import { Nav } from './Components/Nav/Nav';
import AuthContainer from './Components/Auth/AuthContainer';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token') || false,
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

        if(!this.state.token || this.props.action === 'verify'){
            return(<AuthContainer action={this.props.action ?? 'login'} pushToken={this.pushToken} />);
        }

        return (
            <div className="App">
                <Nav logOut={this.logOut} />
                <TodoList />
            </div>
        );
    }
}
