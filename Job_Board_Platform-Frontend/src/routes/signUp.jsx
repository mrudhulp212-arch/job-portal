import React from 'react';
import SignUpForm from '../myComponents/SignUpForm';

function SignUp(props) {
    return (
        <div>
            <h1 className='font-bold text-4xl text-center p-4'>Sign Up</h1>
            <SignUpForm />
        </div>
    );
}

export default SignUp;