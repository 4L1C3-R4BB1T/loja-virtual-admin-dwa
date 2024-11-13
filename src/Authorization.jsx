import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { isAdmin } from "./authService";

const Authorization = ({ children }) => {
    if (isAdmin()) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
};

Authorization.propTypes = {    
    children: PropTypes.node.isRequired    
};

export default Authorization;