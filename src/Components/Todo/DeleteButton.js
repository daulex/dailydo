import React, {useState} from 'react';
import {Icon} from "../IcoMoon/Icon";

export const DeleteButton = (props) => {
    
    const [deleteConfirmShowing, setDeleteConfirmShowing] = useState(0);

    const deleteItem = (e) => {
        e.preventDefault();
        props.deleteItem();
    }

    if(deleteConfirmShowing){
        return(
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
        );
    }
    return(
        <div className="task-action task-actions__delete">
            <button
                onClick={() => setDeleteConfirmShowing(!deleteConfirmShowing)}
                className="icon-button icon-button__bin"
            ><Icon color="#333" size="14px" icon="bin" /></button>
        </div>
    );
}