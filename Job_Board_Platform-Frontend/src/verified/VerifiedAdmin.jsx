import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

function VerifiedAdmin(props) {
    const navigate = useNavigate()
    const { user, isLoggedIn } = useSelector(state => state.user);

    useEffect(() => {
        if(!isLoggedIn)  navigate('/login')
        if(isLoggedIn && user?.userType !== "admin")  navigate('/')
    }, [user, isLoggedIn])
    
    return (
        <div>
            {
                isLoggedIn && (user?.userType === 'admin') && <Outlet/>
            }
        </div>
    );
}

export default VerifiedAdmin;