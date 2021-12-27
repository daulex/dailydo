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
                label: "Log in"
            },
            register: {
                name: "register",
                label: "Register"
            },
            recover: {
                name: "recover",
                label: "Recover"
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

    menu(){
        return(
            <nav className="auth-wrap__nav">
                {Object.keys(this.actions).map((keyName, i) => (
                <button key={"action-"+i} onClick={this.handleMenuButtonClick} attr-action="login" className={this.makeMenuItemClass(this.actions[keyName].name)}>{this.actions[keyName].label}</button>
                ))}
            </nav>
        );
    }

    render(){
        return(
            <div className="auth-wrap">
                
                {this.menu()}
                
                <form action="#">
                    <input type="submit" />
                </form>
            </div>
        );
    }

}