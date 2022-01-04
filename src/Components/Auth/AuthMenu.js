import React from 'react';
import Nav from 'react-bootstrap/Nav';

export default function AuthMenu(props){

    const handleMenuButtonClick = (e) => {
        
        let action = e.target.getAttribute("attr-action");
        
        if(!action) return;
        if(action === props.action) return;

        props.setCurrentAction(action);
    }

    
    return(
        <Nav variant={"tabs"} defaultActiveKey="action-0">
            {Object.keys(props.actions).map((key, i) => (
            <Nav.Item key={"menu-" + i}>
                <Nav.Link eventKey={"action-"+i}
                          onClick={handleMenuButtonClick}
                          attr-action={props.actions[key].name}
                          title={props.actions[key].title}
                >{props.actions[key].title}</Nav.Link>
            </Nav.Item>
            ))}
        </Nav>
    );

}