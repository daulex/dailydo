// "use strict";
let __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (let s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (let p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
let __rest = (this && this.__rest) || function (s, e) {
    let t = {};
    for (let p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (let i = 0, r = Object.getOwnPropertySymbols(s); i < r.length; i++) {
            if (e.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, r[i]))
                t[r[i]] = s[r[i]];
        }
    return t;
};
let __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcomoonReact = exports.iconList = void 0;
let react_1 = __importDefault(require("react"));
exports.iconList = function (iconSet) {
    let list = [];
    iconSet.icons.forEach(function (icon) {
        list.push(icon.properties.name.split(", ")[0]);
    });
    return list;
};
function getSvg(icon, iconSet, styles, size, className, rest) {
    let find = function (iconEl) { return iconEl.properties.name.split(", ").includes(icon); };
    let currentIcon = iconSet.icons.find(find);
    let renderPath = function (iconObj) { return function (path, index) {
        let attrs = (typeof iconObj.attrs && iconObj.attrs[index]) || {};
        return react_1.default.createElement("path", __assign({ style: styles.path, key: index, d: path }, attrs));
    }; };
    if (currentIcon) {
        return (react_1.default.createElement("svg", __assign({ className: className, style: styles.svg, width: size, height: size, viewBox: "0 0 " + (currentIcon.icon.width || "1024") + " 1024", xmlns: "http://www.w3.org/2000/svg" }, rest), currentIcon.icon.paths.map(renderPath(currentIcon.icon))));
    }
    console.warn("icon " + icon + " does not exist.");
    return null;
}
exports.IcomoonReact = function (props) {
    let color = props.color, _a = props.size, size = _a === void 0 ? "100%" : _a, icon = props.icon, iconSet = props.iconSet, _b = props.className, className = _b === void 0 ? "" : _b, _c = props.style, style = _c === void 0 ? {} : _c, rest = __rest(props, ["color", "size", "icon", "iconSet", "className", "style"]);
    let styles = {
        svg: __assign({ display: "inline-block", verticalAlign: "middle" }, style),
        path: {
            fill: color
        }
    };
    return getSvg(icon, iconSet, styles, size, className, rest);
};
exports.IcomoonReact.displayName = "IcomoonReact";
exports.default = exports.IcomoonReact;
