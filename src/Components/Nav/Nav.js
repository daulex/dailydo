import {Icon} from "../IcoMoon/Icon";
import {useNavigate} from "react-router-dom";

export const Nav = (props) => {
    const navigate = useNavigate();
    const handleClick = (e) => {
        navigate('/');
        props.logOut(e);
    }
    return(
        <nav>
            <button
                onClick={handleClick}
            ><Icon color='#444' size="12px" icon='log-out' /> Log out</button>
        </nav>
    );
}