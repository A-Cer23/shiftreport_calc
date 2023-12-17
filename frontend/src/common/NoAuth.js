import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";



const NoAuth = ({ children }) => {
    const currentUser = AuthService.getCurrentUser();
 
    if (currentUser) {
       return <Navigate to="/profile" replace={true} />;
    }
    return children;
 };

 export default NoAuth