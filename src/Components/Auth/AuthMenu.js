import React from 'react';

export default function AuthMenu(props){
    const makeMenuItemClass = (value) => {
        let res = "nav-button";
        
        if(props.action === value){
            res += " active";
        }
        return res;
    }
    const handleMenuButtonClick = (e) => {
        
        let action = e.target.getAttribute("attr-action");
        
        if(!action) return;
        if(action === props.action) return;

        props.setCurrentAction(action);
    }

    
    return(
        <nav className="auth-wrap__nav">
            {Object.keys(props.actions).map((key, i) => (
            <button key={"action-"+i} 
                onClick={handleMenuButtonClick} 
                attr-action={props.actions[key].name} 
                className={makeMenuItemClass(props.actions[key].name)}
                >
                {props.actions[key].title}
            </button>
            ))}
        </nav>
    );

}