import React from 'react';
import Button from 'react-bootstrap/Button';
import {Icon} from "./IcoMoon/Icon";

export const TodoItem = (props) => {
    const checked = !!props.item.completed;
    const deleteItem = (e) => {
        e.preventDefault();
        props.handleTaskDelete(props.item.id)
    }
    return(
        <div className="list-item" id={"item-" + props.item.id}>
            <input type="checkbox" onChange={() => {props.handleChange(props.item.id)}} checked={checked} />
            <div className="list-item__label">
                {props.item.text}
            </div>
            <Icon color="#444" size={100} icon="star" />
            <Button onClick={deleteItem}>Delete</Button>
        </div>
    );
}