import React, { useEffect, useState } from 'react';
import { key_to_date } from '../../utilities';
import {Link} from "react-router-dom";
import { DeleteButton } from './DeleteButton';

export const PastTodos = (props) => {
    const [list, setList] = useState([]);
    const deleteItem = (meta_key = false) => {
        if(!meta_key){return;}
        setList(list.filter(todo => {
            return todo.meta_key !== meta_key;
        }));

        
        const deleteUrl = process.env.REACT_APP_API_DOMAIN + '/wp-json/ddapi/todo/delete/' + meta_key.split("_")[1];

                
        fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
    }
    
    useEffect(() => {
        
        let isMounted = true;
        const getUrl = process.env.REACT_APP_API_DOMAIN + '/wp-json/ddapi/todo/get/000';
        const token = localStorage.getItem('token');
                
        fetch(getUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data !== 404 && isMounted){
                setList(JSON.parse(data));
            }
        });

        return () => isMounted = false;
    }, []);

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
                            <DeleteButton metaKey={todo.meta_key} deleteItem={deleteItem} />
                        </li>
                        );
                })}
            </ul>
        </div>
    );
}