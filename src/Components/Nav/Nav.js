import {Icon} from "../IcoMoon/Icon";

export const Nav = (props) => {
    return(
        <nav>
            <button
                onClick={props.destroyToken}
            ><Icon color='#444' size="12px" icon='log-out' /> Log out</button>
        </nav>
    );
}