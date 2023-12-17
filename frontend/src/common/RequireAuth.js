import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";



const RequireAuth = ({ children }) => {
    const currentUser = AuthService.getCurrentUser();
 
    if (!currentUser) {
       return <Navigate to="/login" replace={true} />;
    }
    return children;
 };

 export default RequireAuth