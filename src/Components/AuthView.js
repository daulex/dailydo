import React from 'react';
import AuthMenu from './AuthMenu';

export class AuthView extends React.Component{
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

    get renderInputs (){
        const inputList = this.actions[this.state.action].inputs;
        
        return(
            <fieldset>
            {inputList.map((key,i) => (
                <label className="input-wrap" key={"label-"+i}>
                    <div className="input-wrap__label">{this.inputs[key].label}</div>
                    <input key={"input-"+i} 
                        name={this.inputs[key].name} 
                        type={this.inputs[key].type} 
                        placeholder={this.inputs[key].label}
                        autoComplete="off"
                    />
                </label>
            ))}
            </fieldset>
        )
    }

    render(){
        const submitLabel = this.actions[this.state.action].buttonLabel;
        
        return(
            <div className="auth-wrap">
                
                <AuthMenu setCurrentAction={this.setCurrentAction} action={this.state.action} actions={this.actions} />
                
                <form action="#" autoComplete="off">
                    {this.renderInputs}
                    <div className="submit-wrap">
                        <input type="submit" value={submitLabel} />
                    </div>
                </form>
            </div>
        );
    }

}