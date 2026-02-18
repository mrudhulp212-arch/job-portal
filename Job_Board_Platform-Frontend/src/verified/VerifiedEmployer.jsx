import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

function VerifiedEmployer(props) {
    const navigate = useNavigate()
    const { user, isLoggedIn } = useSelector(state => state.user);

    useEffect(() => {
        if (!isLoggedIn) navigate('/login')
        if (isLoggedIn && user?.userType !== "employer") navigate('/')
    }, [isLoggedIn]);

    return (
        <div>
            {
                isLoggedIn && (user?.userType === 'employer') && <Outlet />
            }
        </div>
    );
}

export default VerifiedEmployer;