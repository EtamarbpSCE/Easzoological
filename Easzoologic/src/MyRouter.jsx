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

const MyRouter = ()=>{
    const location = useLocation();
    const userData = localStorage.getItem('user_token')
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);
    const [userState, setUserState] = useState({
        role:null,
        name:''
    })
    useEffect(() => {
        const user = localStorage.getItem('user_token');
        if (!user && location.pathname !== "/login") {
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
            {(location.pathname !== "/login" && location.pathname !== "/newUser" && location.pathname !== "/forgotPassword") && <MiniDrawer userState={userState}/>}
            <Routes>
                <Route path="/login" exact element={<SignIn setUserState={setUserState}/>}></Route>
                <Route path="/" exact element={withAuth(ScanPage,[1,2,3],setUserState)()}></Route> 
                <Route path="/admin" exact element={withAuth(AdminPage,[1],setUserState)()}></Route> 
                <Route path="/unauthorized" exact element={<UnauthorizedPage/>}></Route> 
                <Route path="/newUser" exact element={<ForgotPassword/>}></Route> 
            </Routes>
        </>
    )
}

export default MyRouter
