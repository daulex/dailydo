import React from 'react';
import AuthMenu from './AuthMenu';
import { AuthForm } from './AuthForm';

export default class AuthContainer extends React.Component{
    constructor(props){
        super(props);

        this.state = { 
            action: this.props.action ?? "login",
            errors: []
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
            },
            reset: {
                name: "reset",
                title: "Reset",
                buttonLabel: "Reset password",
                inputs: ["reset_email", "reset_token", "password", "password_confirm"]
            }
        }

        this.inputs = {
            email: {
                name: "email",
                type: "email",
                label: "Email",
                placeholder: "name@example.com"
            },
            reset_email: {
                name: "reset_email",
                type: "text",
                label: "Reset email",
                disabled: "disabled"
            },
            reset_token: {
                name: "key",
                type: "key",
                label: "Key",
                disabled: "disabled"
            },
            password: {
                name: "password",
                type: "password",
                label: "Password",
                placeholder: "Password"
            },
            password_confirm: {
                name: "password_confirm",
                type: "password",
                label: "Confirm password",
                placeholder: "Confirm password"
            }
        }

        this.processAuth = this.processAuth.bind(this);
    }

    setCurrentAction = (action) => {
        this.setState({action: action});
    }

    processAuth = (data) => {
        // TODO: add ajax request for reset
        if(this.state.action === "login"){

            const authUrl = 'https://api.dailydo.lv/wp-json/jwt-auth/v1/token';
            const postBody = {
                username: data[0],
                password: data[1]
            };
            const requestMetadata = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postBody)
            };

            fetch(authUrl, requestMetadata)
                .then(res => res.json())
                .then(response => {
                    if(typeof response.token !== 'undefined'){
                        localStorage.setItem('token', response.token);
                        this.props.pushToken(response.token);
                    }else{
                        this.setState({errors: ['Something went wrong, please try again']});
                    }
                });
        }
    }

    render(){
        const submitLabel = this.actions[this.state.action].buttonLabel;
        const inputList = this.actions[this.state.action].inputs;

        return(
            <div className="auth-wrap">
                {this.state.action !== 'reset' &&
                <AuthMenu setCurrentAction={this.setCurrentAction} action={this.state.action} actions={this.actions} />
                }
                <AuthForm errors={this.state.errors} processAuth={this.processAuth} action={this.state.action} inputs={this.inputs} inputList={inputList} submitLabel={submitLabel} />
            </div>
        );
    }

}