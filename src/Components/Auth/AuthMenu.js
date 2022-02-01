import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from "react-router-dom";


export default function AuthMenu(props){
    const navigate = useNavigate();
    const handleMenuButtonClick = (e) => {

        let action = e.target.getAttribute("attr-action");
        
        if(!action) return;
        if(action === props.action) return;
        navigate('/user/' + action);
        props.setCurrentAction(action);
    }

    const menuItems = props.actions;
    delete menuItems.reset;
    delete menuItems.verify;

    return(
        <Nav variant={"tabs"} defaultActiveKey={"action-" + props.action}>
            {Object.keys(menuItems).map((key) => (
            <Nav.Item key={"menu-" + props.actions[key].name}>
                <Nav.Link eventKey={"action-" + props.actions[key].name}
                          onClick={handleMenuButtonClick}
                          attr-action={props.actions[key].name}
                          title={props.actions[key].title}
                >{props.actions[key].title}</Nav.Link>
            </Nav.Item>
            ))}
        </Nav>
    );

}