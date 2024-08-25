import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import MiniDrawer from './componenets/Navbar/Navbar';
import withAuth from './componenets/withAuth';
import ScanPage from './pages/ScanPage';
import SignIn from './pages/SignIn/SignIn';
import AdminPage from './pages/Admin/Admin';
import UnauthorizedPage from './pages/Unauthorized/Unauthorized';
import { jwtDecode } from 'jwt-decode';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import SignupForm from './componenets/RegistrationForm/RegistrationForm';
import CageForm from './componenets/CageForm/CageForm';
import UserTable from './componenets/AdminUsersTable/AdminUsersTable';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import PasswordResetConfirmation from './pages/PasswordReset/PasswordResetConfirmation';

const MyRouter = ()=>{
    const location = useLocation();
    const userData = localStorage.getItem('user_token')
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);
    const [userState, setUserState] = useState({
        role:null,
        name:''
    })
    const pathsWithoutDrawer = [
        '/login',
        '/newUser',
        '/forgotPassword',
        '/password_reset',
        '/password-reset-confirmation',
        // Add more paths if needed
    ];
    useEffect(() => {
        const user = localStorage.getItem('user_token');
        if (!user && ! pathsWithoutDrawer.includes(location.pathname)) {
            navigate('/login');
        } 
    }, [navigate]);

    useEffect(()=>{
        if(userData){
            const decodedToken = jwtDecode(userData);
            const { role } = decodedToken;
            setUserState(prev => ({
                ...prev,
                role: role
            }))
        }
    },[])



    //TODO:
    // Vets:
    // create a list with the vets open calls.
    // create a popup like in the zookeepres to update on vets visit.
    // Zookeepers: 
    // coonect the feeding and vet call to the db and server logic.
    return(
        <>
            {(!pathsWithoutDrawer.includes(location.pathname)) && <MiniDrawer userState={userState}/>}
            <Routes>
                <Route path="/login" exact element={<SignIn setUserState={setUserState}/>}></Route>
                <Route path="/password_reset" exact element={<PasswordReset setUserState={setUserState}/>}></Route>
                <Route path="/password-reset-confirmation" exact element={<PasswordResetConfirmation />}></Route>
                <Route path="/" exact element={withAuth(ScanPage,[1,2,3],userState)()}></Route> 
                <Route path="/admin" exact element={withAuth(AdminPage,[1],setUserState)()}></Route> 
                <Route path="/unauthorized" exact element={<UnauthorizedPage/>}></Route> 
                <Route path="/newUser" exact element={<ForgotPassword/>}></Route> 
                <Route path="/admin/register" exact element={<SignupForm/>}></Route> 
                <Route path="/admin/add_cage" exact element={<CageForm/>}></Route> 
                <Route path="/admin/users" exact element={<UserTable/>}></Route> 
            </Routes>
        </>
    )
}

export default MyRouter
