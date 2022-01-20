import React from 'react';
import { TodoList } from './Components/Todo/TodoList';
import { Nav } from './Components/Nav/Nav';
import AuthContainer from './Components/Auth/AuthContainer';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token') || false,
            action: this.props.action || 'today'
        }
        this.pushToken = this.pushToken.bind(this);
        this.logOut = this.logOut.bind(this);
        this.setNewAction = this.setNewAction.bind(this);
    }
    
    pushToken = (token) => {
        this.setState({token: token});
    }
    logOut = (e) => {
        e.preventDefault();
        this.setState({token: false});
        localStorage.removeItem('token');
    }
    setNewAction = (action) => {
        this.setState({action: action});
    }
    
    
    
    render(){
        
        if(!this.state.token || this.props.action === 'verify'){
            return(<AuthContainer action={this.props.action ?? 'login'} pushToken={this.pushToken} />);
        }

        let res;
        switch (this.state.action) {
            case 'today':
                res = <TodoList />;
            break;
            case 'todos':
                res = <h1>todos</h1>;
            break;
            default:
                res = <h1>404</h1>;
        }
        
        return (
            <div className="App">
                <Nav setNewAction={this.setNewAction} logOut={this.logOut} />
                {res}
            </div>
            );
        }
    }
