import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

function VerifiedUser(props) {
    const navigate = useNavigate()
    const { user, isLoggedIn } = useSelector(state => state.user);

    useEffect(() => {
        if (!isLoggedIn) navigate('/login')
        if (isLoggedIn && user.userType !== "employee") navigate('/')
    }, [user, isLoggedIn]);

    return (
        <div>
            {
                isLoggedIn && (user.userType === 'employee') && <Outlet />
            }
        </div>
    );
}

export default VerifiedUser;