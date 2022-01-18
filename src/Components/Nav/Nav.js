import {Icon} from "../IcoMoon/Icon";
import {useNavigate} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

export const Nav = (props) => {
    const navigate = useNavigate();
    const handleLogoutClick = (e) => {
        navigate('/');
        props.logOut(e);
    }
    return(
        <nav>
            <Dropdown>
                <Dropdown.Toggle variant="link" id="dropdown-basic" aria-label="Menu toggle button">
                    <Icon color='#444' size="14px" icon='menu' />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogoutClick}><Icon color='#444' size="12px" icon='log-out' /> Log out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </nav>
    );
}