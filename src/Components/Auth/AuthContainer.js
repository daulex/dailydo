import React from 'react';
import AuthMenu from './AuthMenu';
import {AuthForm} from './AuthForm';

export default class AuthContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            action: "login",
        };
        this.actions = {
            login: {
                name: "login",
                title: "Log in",
                buttonLabel: "Log in",
                inputs: ["email", "password"]
            },
            register: {
                name: "register",
                title: "Register",
                buttonLabel: "Register",
                inputs: ["email", "password", "password_confirm"]
            },
            recover: {
                name: "recover",
                title: "Recover",
                buttonLabel: "Request reset link",
                inputs: ["email"]
            }
        }
        this.inputs = {
            email: {
                name: "email",
                type: "email",
                label: "Email"
            },
            password: {
                name: "password",
                type: "password",
                label: "Password"
            },
            password_confirm: {
                name: "password_confirm",
                type: "password",
                label: "Confirm password"
            }
        }
        
    }

    setCurrentAction = (action) => {
        this.setState({action: action});
    }

    render(){
        const submitLabel = this.actions[this.state.action].buttonLabel;
        const inputList = this.actions[this.state.action].inputs;
        
        return(
            <div className="auth-wrap">
                
                <AuthMenu setCurrentAction={this.setCurrentAction} action={this.state.action} actions={this.actions} />
                
                <AuthForm action={this.state.action} inputs={this.inputs} inputList={inputList} submitLabel={submitLabel} />
            </div>
        );
    }

}