import IcomoonReact  from "./IcomoonReact";
import iconSet from "./selection.json";

export const Icon = (props) => {
    const { className = "", color, size = "100%", icon  } = props;
    return(
        <IcomoonReact
            className={className}
            iconSet={iconSet}
            color={color}
            size={size}
            icon={icon}
        />
    );
}