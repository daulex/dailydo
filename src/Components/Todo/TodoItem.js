import React, {useState} from 'react';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Icon} from "../IcoMoon/Icon";
import { DeleteButton } from './DeleteButton';

export const TodoItem = (props) => {
    const [taskActionsShowing, setTaskActionsShowing] = useState(0);
    const [editTaskShowing, setEditTaskShowing] = useState(0);

    const checked = !!props.item.completed;

    const deleteItem = () => {
        props.handleTaskDelete(props.item.id);
    }
    const moveItem = (e,direction) => {
        e.preventDefault();
        props.handleTaskMove(props.item.id, direction);
    }
    const handleEditSubmit = (e) => {
        e.preventDefault();
        props.handleTaskEdit(props.item.id, e.target.elements[0].value);
        setEditTaskShowing(!editTaskShowing);
    }
    const taskActions = () => {
        const actionButtonClassList = ["icon-button", "icon-button__more"];

        if(taskActionsShowing){
            actionButtonClassList.push("open");
        }else{
            actionButtonClassList.push("closed");
        }

        return (
            <div className="task-actions-anchor">
                <button
                    onClick={() => setTaskActionsShowing(!taskActionsShowing)}
                    className={actionButtonClassList.join(" ")}
                ><Icon color={taskActionsShowing ? '#fff' : '#f00'} size="14px" icon={taskActionsShowing ? 'close' : 'more'} /></button>
                {!!taskActionsShowing && taskActionsDropdown()}
            </div>
        );
    }
    const taskActionsDropdown = () => {
        return (
            <div className="task-actions">
                <div className="task-action task-actions__edit">
                    <button
                        onClick={() => {
                            setEditTaskShowing(!editTaskShowing);
                            setTaskActionsShowing(!taskActionsShowing);
                        }}
                        className="icon-button icon-button__edit"
                    ><Icon color="#f00" size="14px" icon="edit" /></button>
                </div>
                <div className="task-action task-actions__reorder">
                    <button
                        onClick={(e) => moveItem(e, 'up')}
                        className="icon-button icon-button__move-up"
                    ><Icon color="#f00" size="14px" icon="arrow-up" /></button>
                    <button
                        onClick={(e) => moveItem(e, 'down')}
                        className="icon-button icon-button__move-down"
                    ><Icon color="#f00" size="14px" icon="arrow-down" /></button>
                </div>

            <DeleteButton deleteItem={deleteItem} />
        </div>
        );
    }
    return(
        <div className="list-item" id={"item-" + props.item.id}>
            <div className='check-wrap'>
                <input className="check" type="checkbox" onChange={() => {props.handleChange(props.item.id)}} checked={checked} />
            </div>
            {editTaskShowing ?
                <form className="edit-task" onSubmit={handleEditSubmit}>
                    <Form.Control type="text" defaultValue={props.item.text} />
                    <button
                        type="submit"
                        className="icon-button icon-button__check"
                    ><Icon color="#f00" size="14px" icon="check" /></button>
                </form>
                :
                <div className="list-item__label">{props.item.text}</div>}

            {taskActions()}



        </div>
    );
}