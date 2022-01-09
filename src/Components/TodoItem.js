import React, {useState} from 'react';
// import Button from 'react-bootstrap/Button';
import {Icon} from "./IcoMoon/Icon";

export const TodoItem = (props) => {
    const [taskActionsShowing, setTaskActionsShowing] = useState(0);
    const [deleteConfirmShowing, setDeleteConfirmShowing] = useState(0);
    const checked = !!props.item.completed;
    const deleteItem = (e) => {
        e.preventDefault();
        props.handleTaskDelete(props.item.id);
    }
    const moveItem = (e,direction) => {
        e.preventDefault();
        props.handleTaskMove(props.item.id, direction);
    }
    const taskActions = () => {
        return (
            <div className="task-actions-anchor">
                <button
                    onClick={() => setTaskActionsShowing(!taskActionsShowing)}
                    className="icon-button icon-button__more"
                ><Icon color="#f00" size="14px" icon={taskActionsShowing ? 'close' : 'more'} /></button>
                {!!taskActionsShowing && taskActionsDropdown()}
            </div>
        );
    }
    const taskActionsDropdown = () => {
        return (
            <div className="task-actions">
                <div className="task-action task-actions__edit">
                    <button
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

            {deleteConfirmShowing
                ?
                <div className="task-action task-actions__delete-confirmation">
                    <button
                        onClick={deleteItem}
                        className="icon-button icon-button__check"
                    ><Icon color="#f00" size="14px" icon="check" /></button>
                    <button
                        onClick={() => setDeleteConfirmShowing(!deleteConfirmShowing)}
                        className="icon-button icon-button__close"
                    ><Icon color="#444" size="14px" icon="close" /></button>
                </div>
                :
                <div className="task-action task-actions__delete">
                    <button
                        onClick={() => setDeleteConfirmShowing(!deleteConfirmShowing)}
                        className="icon-button icon-button__bin"
                    ><Icon color="#333" size="14px" icon="bin" /></button>
                </div>
            }
        </div>
        );
    }
    return(
        <div className="list-item" id={"item-" + props.item.id}>
            <input type="checkbox" onChange={() => {props.handleChange(props.item.id)}} checked={checked} />
            <div className="list-item__label">
                {props.item.text}
            </div>
            {taskActions()}



        </div>
    );
}