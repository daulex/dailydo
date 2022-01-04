import React from 'react';
import AuthMenu from './AuthMenu';
import { AuthForm } from './AuthForm';

export default class AuthContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            action: "login",
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
            }
        }
        this.inputs = {
            email: {
                name: "email",
                type: "email",
                label: "Email",
                placeholder: "name@example.com"
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

        if(this.state.action === "login"){
            const authUrl = 'http://ddapi.awave.site/wp-json/jwt-auth/v1/token';
            // const authUrl = 'https://ddapi.codekip.com/wp-json/jwt-auth/v1/token';
            const postBody = {
                username: 'kirillgalenko@gmail.com',
                password: 'BfgNOH9Bv0SAgbIUU8'
                // username: data[0],
                // password: data[1]
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
                    // this.setState({ recipes });
                    console.log(response);

                    if(typeof response.token !== 'undefined'){
                        console.log("logging token");
                        localStorage.setItem('token', response.token);
                        this.props.pushToken(response.token);
                    }else{
                        console.log("setting state");
                        this.setState({errors: ['Something went wrong, please try again']});
                        console.log(this.state);
                    }

                });
        }
    }

    render(){
        const submitLabel = this.actions[this.state.action].buttonLabel;
        const inputList = this.actions[this.state.action].inputs;
        console.log('re-render in progress');
        return(
            <div className="auth-wrap">
                
                <AuthMenu setCurrentAction={this.setCurrentAction} action={this.state.action} actions={this.actions} />
                
                <AuthForm errors={this.state.errors} processAuth={this.processAuth} action={this.state.action} inputs={this.inputs} inputList={inputList} submitLabel={submitLabel} />
            </div>
        );
    }

}