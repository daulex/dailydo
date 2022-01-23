import React, { useEffect, useState } from 'react';
import { key_to_date } from '../../utilities';
import {Link} from "react-router-dom";

export const PastTodos = (props) => {
    const [list, setList] = useState([]);
    useEffect(() => {
        let isMounted = true;
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
            if(data !== 404 && isMounted){
                const parsed = JSON.parse(data);
                // this.setState({todos: parsed });
                setList(parsed);
            }
        });

        return () => isMounted = false;
    });
    return(
        <div className="todos-all">
            <h1>Past todos list</h1>
            <ul>
                {list.map(todo => { 
                    return (
                        <li key={todo.meta_key}>
                            <Link to={`/todos/${todo.meta_key.split("_")[1]}`}>
                                {key_to_date(todo.meta_key)}
                            </Link>
                            
                        </li>
                        );
                })}
            </ul>
        </div>
    );
}