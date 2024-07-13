import { BrowserRouter as Router, Routes, Route, Link, useLocation, redirect, useNavigate  } from 'react-router-dom';
import { useState, useEffect } from 'react'
import AdminPage from './pages/AdminPage/AdminPage'
import MiniDrawer from './componenets/Navbar/Navbar'
import SignIn from './pages/SignIn/SignIn';


const MyRouter = ()=>{
    const location = useLocation();
    const userData = localStorage.getItem('user')
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user && location.pathname !== "/login") {
            navigate('/login');
        } 
    }, [navigate]);



    return(
        <>
            {location.pathname !== "/login" && <MiniDrawer />}
            <Routes>
                {/* <Route path="/login" exact element={<SignIn/>}></Route>
                <Route path="/" exact element={<ScanPage/>}></Route>  */}
                <Route path="/" exact element={<AdminPage/>}></Route> 
            </Routes>
        </>
    )
}

export default MyRouter
