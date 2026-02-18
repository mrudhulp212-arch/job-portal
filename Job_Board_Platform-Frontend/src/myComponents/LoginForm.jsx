import React from 'react';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from './SignUpErrorMessage';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { authenticatUser, unAuthenticatUser } from '@/redux/slices/userSlice';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/hooks/use-toast';

function LoginForm(props) {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            if (data.userType === 'employee') {
                delete data.userType
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/auth/login`, data, { withCredentials: true })
                // console.log("print 1:", user)
                // console.log(response);

                dispatch(authenticatUser(response?.data?.data))
            }
            if (data.userType === 'employer') {
                delete data.userType
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/employer/auth/login`, data, { withCredentials: true })
                dispatch(authenticatUser(response?.data?.data))
                // console.log("print 1:", user)
                // console.log(response);
            }

            toast({
                description: "Your login successfull",
                style: {
                    backgroundColor: '#90ee90',
                    color: 'black'
                }
            })
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        } catch (error) {
            dispatch(unAuthenticatUser())
            console.error('Error sending data:', error);
            toast({
                description: error.response.data.message,
                style: {
                    backgroundColor: '#ff5151',
                    color: 'black'
                }
            })
        }
    }
    return (
        <div className='px-3'>
            <Toaster />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='border-2 flex flex-col gap-2 sm:w-full md:w-2/4 mx-auto rounded-md pt-10' >

                <div className="w-11/12 mx-auto m-1 flex flex-col">
                    <input className='p-1 px-3 rounded-sm bg-slate-200 border-0 text-black' type='email' placeholder='email' {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })} />
                    {errors.email && <ErrorMessage error={errors.email} fieldName="email" />}

                </div>
                <div className="w-11/12 mx-auto m-1 flex flex-col">
                    <input className=' p-1 px-3 rounded-sm bg-slate-200 border-0 text-black' type='password' placeholder='password' {...register("password", {
                        required: true,
                        pattern: {
                            value: /^.{4,}$/,
                            message: "Password must be at least 8 characters, with at least one uppercase letter, one lowercase letter, and one number"
                        }
                    })} />
                    {errors.password && <ErrorMessage error={errors.password} fieldName="password" />}

                </div>

                <div className='w-11/12 mx-auto text-blue-600 flex flex-col gap-5'>
                    {/* <Link className='pl-3' to={'/changePassword'}>forget your password!</Link> */}
                    <Link className='pl-3' to={'/sign_up'}>don't have an account?</Link>
                </div>


                <hr className='w-11/12 mx-auto h-px bg-gray-300' />
                <div className="w-11/12 mx-auto flex flex-col gap-5">
                    <h4>You were signed up to </h4>
                    <div>
                        <label>
                            <input
                                {...register("userType", { required: true })}
                                type="radio"
                                value="employee"
                            />
                            find a Job
                        </label>

                        <label className='pl-4'>
                            <input
                                {...register("userType", { required: true })}
                                type="radio"
                                value="employer"
                            />
                            find an Employee to work with.
                        </label>
                    </div>
                    <ErrorMessage error={errors.userType} fieldName="userType" />
                </div>
                <div className=" m-1 mt-2 mb-10 flex flex-col items-center justify-center">
                    <input className="border-2 m-2 bg-indigo-600  p-1 w-1/2 rounded-md" type="submit" />
                </div>
            </form>
        </div>
    );
}

export default LoginForm;