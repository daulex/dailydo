import React from 'react';

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
        

        this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this);
    }

    makeMenuItemClass(value){
        let res = "nav-button";
        
        if(this.state.action === value){
            res += " active";
        }
        return res;
    }
    handleMenuButtonClick(e){
        
        let action = e.target.getAttribute("attr-action");
        
        if(!action) return;
        if(action === this.state.action) return;

        this.setState({action: action});
    }

    get renderMenu(){
        return(
            <nav className="auth-wrap__nav">
                {Object.keys(this.actions).map((key, i) => (
                <button key={"action-"+i} 
                    onClick={this.handleMenuButtonClick} 
                    attr-action={this.actions[key].name} 
                    className={this.makeMenuItemClass(this.actions[key].name)}
                    >
                    {this.actions[key].title}
                </button>
                ))}
            </nav>
        );
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
                
                {this.renderMenu}
                
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