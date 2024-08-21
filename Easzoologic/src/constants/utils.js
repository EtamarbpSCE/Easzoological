import { jwtDecode } from "jwt-decode";

const getUserRole = ()=>{
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken;
    return role;
}

export {getUserRole}