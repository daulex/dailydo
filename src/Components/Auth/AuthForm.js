import React from 'react';

export class AuthForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            password_confirm: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = e => {

        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        console.log(form);
    }
    render(){

        return(
            <form action="#" autoComplete="off" onSubmit={this.handleSubmit}>
                <fieldset>
                    {this.props.inputList.map((fieldRef,i) => (
                        <label className="input-wrap" key={"label-"+i}>
                            <div className="input-wrap__label">{this.props.inputs[fieldRef].label}</div>
                            <input key={"input-"+i}
                                   name={this.props.inputs[fieldRef].name}
                                   type={this.props.inputs[fieldRef].type}
                                   placeholder={this.props.inputs[fieldRef].label}
                                   autoComplete="off"
                                   onChange={this.handleChange}
                                   value={this.state[fieldRef]}
                            />
                        </label>
                    ))}
                </fieldset>
                <div className="submit-wrap">
                    <input type="submit" value={this.props.submitLabel} />
                </div>
            </form>
        );
    }


}