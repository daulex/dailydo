import React, { useEffect } from 'react';

export const PastTodos = (props) => {
    useEffect(() => {
        const authUrl = process.env.REACT_APP_API_DOMAIN + '/wp-json/ddapi/todo/get/000';
        const token = localStorage.getItem('token');
                
        fetch(authUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data !== 404){
                const parsed = JSON.parse(data);
                // this.setState({todos: parsed });
                console.log(parsed);
            }
        });
    });
    return(
        <h1>Past todos list</h1>
    );
}