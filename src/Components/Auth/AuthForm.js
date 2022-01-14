import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {findGetParameter} from "../../utilities";

let regEmail = /.+@.+\..+/;

const resetEmail = findGetParameter('em');
const resetToken = findGetParameter('to');
const verifyKey = findGetParameter('key');

export class AuthForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            password_confirm: '',
            reset_email: resetEmail,
            reset_token: resetToken,
            verify_email: verifyKey,
            errors: this.props.errors || []
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

        setTimeout(function (){
            if(!this.state.errors.length){

                const data = this.props.inputList.map(fieldRef => {
                    return this.state[fieldRef];
                });

                this.props.processAuth(data);

            }
        }.bind(this),100);

    }
    componentDidUpdate( prevProps) {
        if (prevProps.action !== this.props.action) {
            this.setState({errors: []});
        }
        // todo: fix this, make it so login errors shows each time you submit wrong info
        if(prevProps.errors.length === 0 && this.props.errors.length === 1){
            this.setState({errors: this.props.errors});
        }
    }
    render(){
        // // TODO: rework inputs to floating labels
        return(
            <Form action="#" autoComplete="off" onSubmit={this.handleSubmit}>
                {this.state.errors && <ul className='errors'>
                    {this.state.errors.map((err,i) => (
                        <li key={i}>{err}</li>
                    ))}
                </ul> }
                {this.props.inputList.map((fieldRef, i) => (
                    <Form.Group className="mb-3" controlId={this.props.inputs[fieldRef].name} key={"field-"+i}>
                        <Form.Label>{this.props.inputs[fieldRef].label}</Form.Label>
                        <Form.Control
                            type={this.props.inputs[fieldRef].type}
                            onChange={this.handleChange}
                            onBlur={this.validate}
                            placeholder={this.props.inputs[fieldRef].placeholder}
                            value={this.state[fieldRef]}
                            name={this.props.inputs[fieldRef].name}
                            disabled={this.props.inputs[fieldRef].disabled}
                    />
                    </Form.Group>
                ))}

                <div className="submit-wrap d-grid gap-2">
                    <Button size="lg" variant="primary" type="submit" disabled={this.state.errors.length > 0 || this.state.processing}>
                        {this.props.submitLabel}
                    </Button>
                </div>
            </Form>
        );
    }


}