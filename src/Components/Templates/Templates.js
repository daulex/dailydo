import React, { useEffect, useState } from 'react';
// import { key_to_date } from '../../utilities';
import {Link} from "react-router-dom";
// import { DeleteButton } from './DeleteButton';

export const Templates = (props) => {
    const [list, setList] = useState([
        {
            title: 'My first template',
            id: '53621788132',
            todos: [
                'Walk the dog',
                'Buy flowers',
                'Kiss wife',
                'Hug son'
            ]
        }
    ]);
    
    
    useEffect(() => {
        
        console.log('effect tick');
    }, []);

    return(
        <div className="templates-all">
            <h1>Templates list</h1>
            <ul>
                {list.map(template => { 
                    return (
                        <li key={template.id}>
                            <Link to={`/templates/${template.id.split("_")[1]}`}>
                                {template.title}
                            </Link>
                        </li>
                        );
                })}
            </ul>
        </div>
    );
}