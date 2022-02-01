import React from 'react';

export const TodoItem = (props) => {
    const checked = props.item.completed ? true : false;
    return(
        <div className="list-item" id={props.item.id}>
            <input type="checkbox" onChange={() => {props.handleChange(props.item.id)}} checked={checked} />
            <div className="list-item__label">
                {props.item.text}
            </div>
        </div>
    );

}