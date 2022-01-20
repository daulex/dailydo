
import {Icon} from "../IcoMoon/Icon";
import {useNavigate} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import dailyDoLogo from "../../img/dailyDo.svg";

export const Nav = (props) => {
    const navigate = useNavigate();
    const handleLogoutClick = (e) => {
        navigate('/');
        
        props.logOut(e);
    }
    const handleNavClick = (e) => {
        e.preventDefault();
        navigate('/' + e.target.getAttribute('to'));
        let newAction = e.target.getAttribute('to') || 'today';
        props.setNewAction(newAction);
    }
    
    return(
        <nav className="main-nav">
            <a className="dailydo-logo" href="/">
                <img src={dailyDoLogo} alt="dailyDo" />
            </a>
            <Dropdown>
                <Dropdown.Toggle variant="link" id="dropdown-basic" aria-label="Menu toggle button">
                    <Icon color='#0d82df' size="14px" icon='menu' />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleNavClick} href="/" to=""><Icon color='#444' size="14px" icon='check' /> Today</Dropdown.Item>
                    <Dropdown.Item onClick={handleNavClick} href="/todos" to="todos"><Icon color='#444' size="14px" icon='layers' /> Past todos</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleNavClick} href="/templates" to="templates"><Icon color='#444' size="14px" icon='folder' /> Templates</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleNavClick} href="/settings" to="settings"><Icon color='#444' size="14px" icon='settings' /> Settings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogoutClick}><Icon color='#444' size="14px" icon='log-out' /> Log out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </nav>
    );
}