import React from 'react';
import Button from 'react-bootstrap/Button';


let regEmail = /.+@.+\..+/;


export class AuthForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            password_confirm: '',
            errors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
    }
    validate = () => {
        this.setState({errors: []});
        const errors = [];
        this.props.inputList.forEach((fieldRef) => {
            const listRef = this.props.inputs[fieldRef];
            const value = this.state[listRef.name];

            if(fieldRef === 'email' && !regEmail.test(value)){
                errors.push('Please provide a valid email.');
            }
            if(fieldRef === 'password' && value.length < 8){
                errors.push('Password must be longer than 7 characters');
                return;
            }
            if(fieldRef ==='password_confirm' && value !== this.state.password){
                errors.push('Please enter the same password twice');
            }
        });
        this.setState({errors: errors});
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
        if(this.state.errors.length){
            this.validate();
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.validate();
        if(!this.state.errors.length){
            // TODO: pass data to parent component
        }
    }
    componentDidUpdate( prevProps) {
        if (prevProps.action !== this.props.action) {
            this.setState({errors: []});
        }
    }
    render(){

        return(
            <form action="#" autoComplete="off" onSubmit={this.handleSubmit}>
                {this.state.errors && <ul className='errors'>
                    {this.state.errors.map((err,i) => (
                        <li key={i}>{err}</li>
                    ))}
                </ul> }
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
                                   onBlur={this.validate}
                                   value={this.state[fieldRef]}
                            />
                        </label>
                    ))}
                </fieldset>

            <div className="submit-wrap d-grid gap-2">
                    <Button size="lg" variant="primary" type="submit" disabled={this.state.errors.length > 0}>{this.props.submitLabel}</Button>
                </div>
            </form>
        );
    }


}