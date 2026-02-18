import React from 'react';
import LoginForm from '../myComponents/LoginForm';

function Login(props) {
    return (
        <div>
            <h1 className='font-bold text-4xl text-center p-4'>Login page</h1>
            <LoginForm />
        </div>
    );
}

export default Login;