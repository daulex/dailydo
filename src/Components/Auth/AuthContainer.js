import React from 'react';
import AuthMenu from './AuthMenu';
import { AuthForm } from './AuthForm';

export default class AuthContainer extends React.Component{
    constructor(props){
        super(props);

        this.state = { 
            action: this.props.action ?? "login",
            errors: [],
            success_message: false,
            processing: false
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
        this.setState({action: action, success_message: false, processing: false});
    }

    processAuth = (data, forceAction = "none") => {
        this.setState({processing: true})
        // TODO: add ajax request for reset
        if(this.state.action === "login" || forceAction === "login"){

            const authUrl = process.env.REACT_APP_API_DOMAIN + '/wp-json/jwt-auth/v1/token';
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
                        this.setState({errors: ['Something went wrong, please try again'], processing: false});
                    }
                });
        }else if(this.state.action === "recover"){

            const url = process.env.REACT_APP_API_DOMAIN + '/wp-json/ddapi/reset-password/' + data[0];

            fetch(url)
                .then(res => res.json())
                .then(() => {
                    // console.log("req sent");
                });

            this.setState({success_message: "Password reset link will be sent shortly."});

        }else if(this.state.action === "reset"){

            const authUrl = process.env.REACT_APP_API_DOMAIN + '/wp-json/ddapi/reset-password/';
            const body = {
                username: data[0],
                key: data[1],
                password: data[2],
            };
            const payload = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            };
            fetch(authUrl, payload)
                .then(res => res.json())
                .then(response => {
                    if(parseInt(response)){
                        this.processAuth([data[0], data[2]], "login");
                    }else{
                        this.setState({errors: ['Something went wrong. Please try again. ']});
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
                {this.state.success_message ? <div className="alert alert-primary my-3">{this.state.success_message}</div> :
                <AuthForm errors={this.state.errors} processAuth={this.processAuth} action={this.state.action} inputs={this.inputs} inputList={inputList} submitLabel={submitLabel} processing={this.state.processing} />
                }
            </div>
        );
    }

}