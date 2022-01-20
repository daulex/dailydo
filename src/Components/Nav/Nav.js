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
                    <Dropdown.Item href="/">Today</Dropdown.Item>
                    <Dropdown.Item href="#/action-1">Past todos</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogoutClick}><Icon color='#444' size="12px" icon='log-out' /> Log out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </nav>
    );
}